'use client';

import { useEffect, useRef, useState } from 'react';

// Shader source code - WebGL1 compatible
const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 vUv;

void main() {
    vUv = 0.5 * (a_position + 1.0);
    gl_Position = vec4(a_position, 0.0, 1.0);
}` as const;

const liquidFragSource = `
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;

uniform sampler2D u_image_texture;
uniform float u_time;
uniform float u_ratio;
uniform float u_img_ratio;
uniform float u_patternScale;
uniform float u_refraction;
uniform float u_edge;
uniform float u_patternBlur;
uniform float u_liquid;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 permute(vec3 x) { return mod289(((x*34.)+1.)*x); }
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);
    m = m*m;
    m = m*m;
    vec3 x = 2. * fract(p * C.www) - 1.;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130. * dot(m, g);
}

vec2 get_img_uv() {
    vec2 img_uv = vUv;
    img_uv -= .5;
    if (u_ratio > u_img_ratio) {
        img_uv.x = img_uv.x * u_ratio / u_img_ratio;
    } else {
        img_uv.y = img_uv.y * u_img_ratio / u_ratio;
    }
    float scale_factor = 1.;
    img_uv *= scale_factor;
    img_uv += .5;

    img_uv.y = 1. - img_uv.y;

    return img_uv;
}
vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
float get_color_channel(float c1, float c2, float stripe_p, vec3 w, float extra_blur, float b) {
    float ch = c2;
    float border = 0.;
    float blur = u_patternBlur + extra_blur;

    ch = mix(ch, c1, smoothstep(.0, blur, stripe_p));

    border = w[0];
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));

    b = smoothstep(.2, .8, b);
    border = w[0] + .4 * (1. - b) * w[1];
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));

    border = w[0] + .5 * (1. - b) * w[1];
    ch = mix(ch, c2, smoothstep(border - blur, border + blur, stripe_p));

    border = w[0] + w[1];
    ch = mix(ch, c1, smoothstep(border - blur, border + blur, stripe_p));

    float gradient_t = (stripe_p - w[0] - w[1]) / w[2];
    float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));
    ch = mix(ch, gradient, smoothstep(border - blur, border + blur, stripe_p));

    return ch;
}

float get_img_frame_alpha(vec2 uv, float img_frame_width) {
    float img_frame_alpha = smoothstep(0., img_frame_width, uv.x) * smoothstep(1., 1. - img_frame_width, uv.x);
    img_frame_alpha *= smoothstep(0., img_frame_width, uv.y) * smoothstep(1., 1. - img_frame_width, uv.y);
    return img_frame_alpha;
}

void main() {
    vec2 uv = vUv;
    uv.y = 1. - uv.y;
    uv.x *= u_ratio;

    float diagonal = uv.x - uv.y;

    float t = .001 * u_time;

    vec2 img_uv = get_img_uv();
    vec4 img = texture2D(u_image_texture, img_uv);

    vec3 color = vec3(0.);
    float opacity = 1.;

    vec3 color1 = vec3(1.0, 1.0, 1.0);  // Bright metallic highlights
    vec3 color2 = vec3(0.2, 0.2, 0.3 + 0.2 * smoothstep(.7, 1.3, uv.x + uv.y));  // Enhanced depth

    float edge = img.r;

    vec2 grad_uv = uv;
    grad_uv -= .5;

    float dist = length(grad_uv + vec2(0., .2 * diagonal));

    grad_uv = rotate(grad_uv, (.25 - .2 * diagonal) * PI);

    float bulge = pow(1.8 * dist, 1.2);
    bulge = 1. - bulge;
    bulge *= pow(uv.y, .3);

    float cycle_width = u_patternScale;
    float thin_strip_1_ratio = .12 / cycle_width * (1. - .4 * bulge);
    float thin_strip_2_ratio = .07 / cycle_width * (1. + .4 * bulge);
    float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);

    float thin_strip_1_width = cycle_width * thin_strip_1_ratio;
    float thin_strip_2_width = cycle_width * thin_strip_2_ratio;

    opacity = 1. - smoothstep(.9 - .5 * u_edge, 1. - .5 * u_edge, edge);
    opacity *= get_img_frame_alpha(img_uv, 0.01);

    float noise = snoise(uv - t);

    edge += (1. - edge) * u_liquid * noise;

    float refr = 0.;
    refr += (1. - bulge);
    refr = clamp(refr, 0., 1.);

    float dir = grad_uv.x;

    dir += diagonal;

    dir -= 2. * noise * diagonal * (smoothstep(0., 1., edge) * smoothstep(1., 0., edge));

    bulge *= clamp(pow(uv.y, .1), .3, 1.);
    dir *= (.1 + (1.1 - edge) * bulge);

    dir *= smoothstep(1., .7, edge);

    dir += .18 * (smoothstep(.1, .2, uv.y) * smoothstep(.4, .2, uv.y));
    dir += .03 * (smoothstep(.1, .2, 1. - uv.y) * smoothstep(.4, .2, 1. - uv.y));

    dir *= (.5 + .5 * pow(uv.y, 2.));

    dir *= cycle_width;

    dir -= t;

    float refr_r = refr;
    refr_r += .03 * bulge * noise;
    float refr_b = 1.3 * refr;

    refr_r += 5. * (smoothstep(-.1, .2, uv.y) * smoothstep(.5, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(1., .4, bulge));
    refr_r -= diagonal;

    refr_b += (smoothstep(0., .4, uv.y) * smoothstep(.8, .1, uv.y)) * (smoothstep(.4, .6, bulge) * smoothstep(.8, .4, bulge));
    refr_b -= .2 * edge;

    refr_r *= u_refraction;
    refr_b *= u_refraction;

    vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);
    w[1] -= .02 * smoothstep(.0, 1., edge + bulge);
    float stripe_r = mod(dir + refr_r, 1.);
    float r = get_color_channel(color1.r, color2.r, stripe_r, w, 0.02 + .03 * u_refraction * bulge, bulge);
    float stripe_g = mod(dir, 1.);
    float g = get_color_channel(color1.g, color2.g, stripe_g, w, 0.01 / (1. - diagonal), bulge);
    float stripe_b = mod(dir - refr_b, 1.);
    float b = get_color_channel(color1.b, color2.b, stripe_b, w, .01, bulge);

    color = vec3(r, g, b);

    color *= opacity;

    gl_FragColor = vec4(color, opacity);
}`;

// Image processing function
function parseLogoImage(file: File | string | { src: string }): Promise<{ imageData: ImageData; pngBlob: Blob }> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  return new Promise((resolve, reject) => {
    if (!file || !ctx) {
      reject(new Error('Invalid file or context'));
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      // Force SVG to load at a high fidelity size if it's an SVG
      if (typeof file === 'string' ? file.endsWith('.svg') : 
          (file instanceof File && file.type === 'image/svg+xml')) {
        img.width = 1000;
        img.height = 1000;
      }

      const MAX_SIZE = 1000;
      const MIN_SIZE = 500;
      let width = img.naturalWidth;
      let height = img.naturalHeight;

      // Calculate new dimensions if image is too large or too small
      if (width > MAX_SIZE || height > MAX_SIZE || width < MIN_SIZE || height < MIN_SIZE) {
        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else if (width < MIN_SIZE) {
            height = Math.round((height * MIN_SIZE) / width);
            width = MIN_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          } else if (height < MIN_SIZE) {
            width = Math.round((width * MIN_SIZE) / height);
            height = MIN_SIZE;
          }
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw the user image on an offscreen canvas.
      const shapeCanvas = document.createElement('canvas');
      shapeCanvas.width = width;
      shapeCanvas.height = height;
      const shapeCtx = shapeCanvas.getContext('2d')!;
      shapeCtx.drawImage(img, 0, 0, width, height);

      // 1) Create a shape mask by thresholding the image
      const shapeMask = new Uint8Array(width * height);
      const boundaryMask = new Uint8Array(width * height);
      const shapeData = shapeCtx.getImageData(0, 0, width, height);

      for (let i = 0; i < width * height; i++) {
        const r = shapeData.data[i * 4];
        const g = shapeData.data[i * 4 + 1];
        const b = shapeData.data[i * 4 + 2];
        const a = shapeData.data[i * 4 + 3];

        // Consider a pixel part of the shape if it's not white/transparent
        const isShape = a > 128 && (r < 200 || g < 200 || b < 200);
        shapeMask[i] = isShape ? 1 : 0;

        // Mark boundary pixels
        const x = i % width;
        const y = Math.floor(i / width);
        if (isShape) {
          // Check if any neighbor is not part of the shape
          const neighbors = [
            x > 0 ? shapeMask[(y * width) + (x - 1)] : 0,
            x < width - 1 ? shapeMask[(y * width) + (x + 1)] : 0,
            y > 0 ? shapeMask[((y - 1) * width) + x] : 0,
            y < height - 1 ? shapeMask[((y + 1) * width) + x] : 0,
          ];
          const hasNonShapeNeighbor = neighbors.some(n => n === 0);
          boundaryMask[i] = hasNonShapeNeighbor ? 1 : 0;
        }
      }

      // 2) Solve Laplace's equation with Dirichlet boundary conditions
      const u = new Float32Array(width * height);
      const newU = new Float32Array(width * height);
      const C = 1.0; // Constant for the Laplace equation

      // Initialize with boundary conditions
      for (let i = 0; i < width * height; i++) {
        if (boundaryMask[i]) {
          u[i] = C;
        }
      }

      var ITERATIONS = 300;

      function getU(x: number, y: number, arr: Float32Array) {
        if (x < 0 || x >= width || y < 0 || y >= height) return 0;
        if (!shapeMask[y * width + x]) return 0;
        return arr[y * width + x];
      }

      for (var iter = 0; iter < ITERATIONS; iter++) {
        for (var y = 0; y < height; y++) {
          for (var x = 0; x < width; x++) {
            var idx = y * width + x;
            if (!shapeMask[idx] || boundaryMask[idx]) {
              newU[idx] = 0;
              continue;
            }
            var sumN = getU(x + 1, y, u) + getU(x - 1, y, u) + getU(x, y + 1, u) + getU(x, y - 1, u);
            newU[idx] = (C + sumN) / 4;
          }
        }
        // Swap u with newU
        for (var i = 0; i < width * height; i++) {
          u[i] = newU[i];
        }
      }

      // 4) Normalize the solution and apply a nonlinear remap.
      var maxVal = 0;
      for (var i = 0; i < width * height; i++) {
        if (u[i] > maxVal) maxVal = u[i];
      }
      const alpha = 2.0; // Adjust for contrast.
      const outImg = ctx.createImageData(width, height);

      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var idx = y * width + x;
          var px = idx * 4;
          if (!shapeMask[idx]) {
            outImg.data[px] = 255;
            outImg.data[px + 1] = 255;
            outImg.data[px + 2] = 255;
            outImg.data[px + 3] = 255;
          } else {
            const raw = u[idx] / maxVal;
            const remapped = Math.pow(raw, alpha);
            const gray = 255 * (1 - remapped);
            outImg.data[px] = gray;
            outImg.data[px + 1] = gray;
            outImg.data[px + 2] = gray;
            outImg.data[px + 3] = 255;
          }
        }
      }
      ctx.putImageData(outImg, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve({ imageData: outImg, pngBlob: blob });
        } else {
          reject(new Error('Failed to create blob'));
        }
      }, 'image/png');
    };

    // Handle different input types
    if (typeof file === 'string') {
      img.src = file;
    } else if (file && typeof file === 'object' && 'src' in file) {
      // Handle imported asset objects like { src: '/path/to/file.svg' }
      img.src = file.src;
    } else if (file instanceof File) {
      img.src = URL.createObjectURL(file);
    } else {
      reject(new Error('Invalid file type provided'));
      return;
    }
  });
}

export type ShaderParams = {
  patternScale: number;
  refraction: number;
  edge: number;
  patternBlur: number;
  liquid: number;
  speed: number;
};

export interface MetallicLiquidLogoProps {
  /** SVG file path, URL, File object, or imported asset */
  svgSource: string | File | { src: string };
  /** Shader parameters for customization */
  params?: Partial<ShaderParams>;
  /** CSS class name for the canvas */
  className?: string;
  /** Background style for the container */
  background?: string;
  /** Width and height of the canvas */
  size?: number;
}

const defaultParams: ShaderParams = {
  patternScale: 2,
  refraction: 0.015,
  edge: 0.4,
  patternBlur: 0.005,
  liquid: 0.07,
  speed: 0.3,
};

export function MetallicLiquidLogo({
  svgSource,
  params = {},
  className = "block h-full w-full object-contain",
  background = "transparent",
  size = 400,
}: MetallicLiquidLogoProps) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [gl, setGl] = useState<WebGLRenderingContext | WebGL2RenderingContext | null>(null);
  const [uniforms, setUniforms] = useState<Record<string, WebGLUniformLocation>>({});
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [processing, setProcessing] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const totalAnimationTime = useRef(0);
  const lastRenderTime = useRef(0);

  const shaderParams = { ...defaultParams, ...params };

  // Process the SVG source
  useEffect(() => {
    setProcessing(true);
    setError(null);
    
    parseLogoImage(svgSource)
      .then(({ imageData }) => {
        setImageData(imageData);
        setProcessing(false);
      })
      .catch((err) => {
        setError(err.message);
        setProcessing(false);
      });
  }, [svgSource]);

  function updateUniforms() {
    if (!gl || !uniforms) return;
    gl.uniform1f(uniforms.u_edge, shaderParams.edge);
    gl.uniform1f(uniforms.u_patternBlur, shaderParams.patternBlur);
    gl.uniform1f(uniforms.u_time, 0);
    gl.uniform1f(uniforms.u_patternScale, shaderParams.patternScale);
    gl.uniform1f(uniforms.u_refraction, shaderParams.refraction);
    gl.uniform1f(uniforms.u_liquid, shaderParams.liquid);
  }

  // Initialize WebGL
  useEffect(() => {
    if (!isClient || !canvas) return;
    
    function initShader() {
      console.log('Canvas from state:', canvas);
      if (!canvas) {
        setError('Canvas not found - please refresh the page');
        return;
      }

      // Try WebGL2 first, fallback to WebGL1
      let gl = canvas.getContext('webgl2', {
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
      }) as WebGL2RenderingContext | null;

      if (!gl) {
        console.warn('WebGL2 not supported, falling back to WebGL1');
        gl = canvas.getContext('webgl', {
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
          preserveDrawingBuffer: false,
        }) as WebGL2RenderingContext | null;
      }

      if (!gl) {
        setError('WebGL not supported in this browser. Please enable WebGL or try a different browser.');
        return;
      }

      // Enable transparency
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0); // Clear to transparent

      function createShader(gl: WebGLRenderingContext | WebGL2RenderingContext, sourceCode: string, type: number) {
        const shader = gl.createShader(type);
        if (!shader) {
          setError('Failed to create shader');
          return null;
        }

        gl.shaderSource(shader, sourceCode);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          const error = gl.getShaderInfoLog(shader);
          console.error('Shader compilation error:', error);
          console.error('Shader source:', sourceCode);
          setError('Shader compilation failed: ' + error);
          gl.deleteShader(shader);
          return null;
        }

        return shader;
      }

      const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
      const fragmentShader = createShader(gl, liquidFragSource, gl.FRAGMENT_SHADER);
      
      if (!vertexShader || !fragmentShader) {
        setError('Failed to create shaders - check console for details');
        return;
      }
      
      const program = gl.createProgram();
      if (!program) {
        setError('Failed to create shader program');
        return;
      }

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const error = gl.getProgramInfoLog(program);
        console.error('Program linking error:', error);
        setError('Shader program linking failed: ' + error);
        return null;
      }

      function getUniforms(program: WebGLProgram, gl: WebGLRenderingContext | WebGL2RenderingContext) {
        let uniforms: Record<string, WebGLUniformLocation> = {};
        let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
          let uniformName = gl.getActiveUniform(program, i)?.name;
          if (!uniformName) continue;
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName) as WebGLUniformLocation;
        }
        return uniforms;
      }
      const uniforms = getUniforms(program, gl);
      setUniforms(uniforms);

      // Vertex position
      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      gl.useProgram(program);

      const positionLocation = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(positionLocation);

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      setGl(gl);
    }

    initShader();
    updateUniforms();
  }, [isClient, canvas]);

  // Keep uniforms updated
  useEffect(() => {
    if (!gl || !uniforms) return;
    updateUniforms();
  }, [gl, shaderParams, uniforms]);

  // Render every frame
  useEffect(() => {
    if (!gl || !uniforms) return;

    let renderId: number;

    function render(currentTime: number) {
      const deltaTime = currentTime - lastRenderTime.current;
      lastRenderTime.current = currentTime;

      // Clear to transparent
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);

      // Update the total animation time and time uniform
      totalAnimationTime.current += deltaTime * shaderParams.speed;
      gl!.uniform1f(uniforms.u_time, totalAnimationTime.current);
      // Draw!
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      // rAF
      renderId = requestAnimationFrame(render);
    }

    // Kick off the render loop
    lastRenderTime.current = performance.now();
    renderId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(renderId);
    };
  }, [gl, shaderParams.speed]);

  // Handle canvas resize and image data
  useEffect(() => {
    if (!canvas || !gl || !uniforms || !imageData) return;

    function resizeCanvas() {
      if (!canvas || !gl || !uniforms || !imageData) return;
      const imgRatio = imageData.width / imageData.height;
      gl.uniform1f(uniforms.u_img_ratio, imgRatio);

      const side = size;
      canvas.width = side * devicePixelRatio;
      canvas.height = side * devicePixelRatio;
      gl.viewport(0, 0, canvas.height, canvas.height);
      gl.uniform1f(uniforms.u_ratio, 1);
      gl.uniform1f(uniforms.u_img_ratio, imgRatio);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvas, gl, uniforms, imageData, size]);

  // Upload texture
  useEffect(() => {
    if (!gl || !uniforms || !imageData) return;

    // Delete any existing texture first
    const existingTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);
    if (existingTexture) {
      gl.deleteTexture(existingTexture);
    }

    const imageTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, imageTexture);

    // Set texture parameters before uploading the data
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Ensure power-of-two dimensions or use appropriate texture parameters
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

    try {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        imageData.width,
        imageData.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        imageData.data
      );

      gl.uniform1i(uniforms.u_image_texture, 0);
    } catch (e) {
      console.error('Error uploading texture:', e);
      setError('Failed to upload image texture');
    }

    return () => {
      // Cleanup texture when component unmounts or imageData changes
      if (imageTexture) {
        gl.deleteTexture(imageTexture);
      }
    };
  }, [gl, uniforms, imageData]);

  // Client-side only rendering to prevent hydration issues
  if (!isClient) {
    return (
      <div 
        className="flex items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-4"
        style={{ width: size, height: size }}
        suppressHydrationWarning
      >
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="flex items-center justify-center rounded-lg border border-red-300 bg-red-50 p-4"
        style={{ width: size, height: size }}
      >
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (processing) {
    return (
      <div 
        className="flex items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-4"
        style={{ width: size, height: size }}
      >
        <p className="text-gray-600 text-sm">Processing...</p>
      </div>
    );
  }

  console.log('Rendering canvas, isClient:', isClient, 'canvas state:', canvas);

  const canvasRef = (element: HTMLCanvasElement | null) => {
    if (element) {
      console.log('Canvas ref callback called with:', element);
      setCanvas(element);
    }
  };

  return (
    <div 
      className="flex items-center justify-center rounded-lg group"
      style={{ 
        background,
        width: size, 
        height: size,
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4)) drop-shadow(0 10px 20px rgba(0,0,0,0.3)) drop-shadow(0 5px 10px rgba(0,0,0,0.2)) drop-shadow(0 0 60px rgba(255,255,255,0.1))',
        transform: 'perspective(1000px) rotateX(8deg) rotateY(-8deg) translateZ(0px)',
        transformStyle: 'preserve-3d',
        transition: 'all 0.3s ease-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(-5deg) translateZ(20px)';
        e.currentTarget.style.filter = 'drop-shadow(0 30px 60px rgba(0,0,0,0.5)) drop-shadow(0 15px 30px rgba(0,0,0,0.4)) drop-shadow(0 8px 15px rgba(0,0,0,0.3)) drop-shadow(0 0 80px rgba(255,255,255,0.2))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(8deg) rotateY(-8deg) translateZ(0px)';
        e.currentTarget.style.filter = 'drop-shadow(0 20px 40px rgba(0,0,0,0.4)) drop-shadow(0 10px 20px rgba(0,0,0,0.3)) drop-shadow(0 5px 10px rgba(0,0,0,0.2)) drop-shadow(0 0 60px rgba(255,255,255,0.1))';
      }}
    >
      <canvas 
        ref={canvasRef} 
        className={className}
        style={{ 
          width: size, 
          height: size,
          filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1)) drop-shadow(0 0 40px rgba(255,255,255,0.05))',
          transform: 'translateZ(20px)'
        }}
      />
    </div>
  );
}

// Example usage:
/*
import { MetallicLiquidLogo } from './MetallicLiquidLogo';

function App() {
  return (
    <div>
      <h1>Metallic Liquid Logo</h1>
      
      // Using an SVG file path
      <MetallicLiquidLogo 
        svgSource="/path/to/logo.svg"
        size={300}
        params={{
          liquid: 0.1,
          speed: 0.5,
          edge: 0.3
        }}
      />
      
      // Using a File object from input
      <input 
        type="file" 
        accept=".svg,image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            // Use the file directly
          }
        }}
      />
    </div>
  );
}
*/
