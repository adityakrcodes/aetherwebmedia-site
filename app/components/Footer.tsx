import { LineShadowText } from "@/components/ui/line-shadow-text"



export default function Footer() {


  return (
    <footer className="relative min-h-screen flex flex-col">
      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-32 min-h-[80vh]">
        {/* Call to Action Section */}
        <div className="text-center relative z-20">
          {/* Globe Icon */}
          <div className="mb-8 mx-auto flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="88" height="61" fill="none"><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.179" d="M44 1v59m43-29.5C87 46.794 67.748 60 44 60S1 46.794 1 30.5C1 14.21 20.252 1 44 1s43 13.21 43 29.5Z" /><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.179" d="M75.758 30.5C75.758 46.794 61.54 60 44 60c-17.536 0-31.755-13.206-31.755-29.5C12.245 14.21 26.465 1 44 1c17.54 0 31.758 13.21 31.758 29.5Z" /><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.179" d="M62.987 30.5C62.987 46.794 54.488 60 44 60c-10.484 0-18.987-13.206-18.987-29.5C25.013 14.21 33.516 1 44 1c10.488 0 18.987 13.21 18.987 29.5ZM1 30.5h86" /><path fill="#fff" d="M62.987 30.5a.609.609 0 0 1-.612.616c-9.805 0-17.756 7.95-17.756 17.76 0 .344-.28.613-.611.613a.608.608 0 0 1-.616-.613c0-9.81-7.947-17.76-17.752-17.76h-.011a.619.619 0 0 1-.616-.616c0-.332.284-.616.616-.616h.01c9.806 0 17.753-7.95 17.753-17.76 0-.344.272-.616.615-.616.333 0 .612.272.612.616 0 9.81 7.951 17.76 17.756 17.76.344 0 .612.284.612.616Z" /></svg>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl lg:text-[11rem] font-extrabold text-white uppercase tracking-wider mb-6 font-poppins">
            READY TO <LineShadowText className="italic" shadowColor="#fff">
              SHIP
            </LineShadowText> ?
          </h2>

          {/* Subtext */}
          <div className="text-white text-lg md:text-xl mb-8 space-y-2">
            <p>Have a project in mind?</p>
            <p>Let's create something extraordinary together</p>
          </div>

          {/* Contact Button */}
          <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-medium">
            CONTACT NOW
          </button>
        </div>

        {/* Logo Video */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center items-end overflow-hidden" style={{ height: '60vh' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] object-contain"
            style={{
              transform: 'translateY(25%)',
              maxHeight: '100%',
              filter: 'blur(2px)',
              opacity: 1,
            }}
          >
            <source src="/logo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className=" border-white/10 px-4 py-8 mt-auto relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-white text-sm space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="order-2 md:order-1 font-poppins">
            ©2025 Aether Web Media
          </div>

          {/* Social Links */}
          {/* <div className="order-1 md:order-2 space-x-6">
            <span className="hover:text-gray-300 cursor-pointer font-poppins">DRIBBLE</span>
            <span className="hover:text-gray-300 cursor-pointer font-poppins">IG</span>
            <span className="hover:text-gray-300 cursor-pointer font-poppins">X</span>
            <span className="hover:text-gray-300 cursor-pointer font-poppins">BE</span>
            <span className="hover:text-gray-300 cursor-pointer font-poppins">IN</span>
          </div> */}

          {/* Back to Top */}
          <button
            className="order-3 uppercase hover:underline transition-colors duration-200 font-poppins"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            BACK TO TOP
          </button>
        </div>
      </div>
    </footer>
  );
}