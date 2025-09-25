import DotGrid from "@/components/DotGrid";
import { CometCard } from "@/components/ui/comet-card";



export default function Pricing() {
  return (
    <div className="w-full h-[126rem] md:h-screen relative">

      <DotGrid

        dotSize={5}

        gap={12}

        baseColor="#060405"

        activeColor="#79757A"

        proximity={170}

        shockRadius={200}

        shockStrength={5}

        resistance={750}

        returnDuration={1.5}

      />
      <h1 className="text-7xl font-bold absolute md:top-[20%] top-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2">Pricing</h1>
      <div className="flex items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col md:flex-row items-center justify-center gap-32 w-full relative z-10 md:mt-0 mt-20">
          <CometCard className="max-w-[300px] h-[400px]">
            <button
              type="button"
              className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 md:my-20 md:p-4 z-10"
              aria-label="View invite F7RA"
              style={{
                transformStyle: "preserve-3d",
                transform: "none",
                opacity: 1,
              }}
            >
              <div className="mx-2 flex-1">
                <div className="relative mt-2 aspect-[3/4] w-full">
                  <img
                    loading="lazy"
                    className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75"
                    alt="Invite background"
                    src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                      opacity: 1,
                    }}
                  />
                </div>
              </div>
              <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
                <div className="text-xs">Comet Invitation</div>
                <div className="text-xs text-gray-300 opacity-50">#F7RA</div>
              </div>
            </button>
          </CometCard>
          <CometCard className="max-w-[300px] h-[400px] scale-130">
            <button
              type="button"
              className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 md:my-20 md:p-4 z-10"
              aria-label="View invite F7RA"
              style={{
                transformStyle: "preserve-3d",
                transform: "none",
                opacity: 1,
              }}
            >
              <div className="mx-2 flex-1">
                <div className="relative mt-2 aspect-[3/4] w-full">
                  <img
                    loading="lazy"
                    className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75"
                    alt="Invite background"
                    src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                      opacity: 1,
                    }}
                  />
                </div>
              </div>
              <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
                <div className="text-xs">Comet Invitation</div>
                <div className="text-xs text-gray-300 opacity-50">#F7RA</div>
              </div>
            </button>
          </CometCard>
          <CometCard className="max-w-[300px] h-[400px]">
            <button
              type="button"
              className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 md:my-20 md:p-4 z-10"
              aria-label="View invite F7RA"
              style={{
                transformStyle: "preserve-3d",
                transform: "none",
                opacity: 1,
              }}
            >
              <div className="mx-2 flex-1">
                <div className="relative mt-2 aspect-[3/4] w-full">
                  <img
                    loading="lazy"
                    className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75"
                    alt="Invite background"
                    src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                      opacity: 1,
                    }}
                  />
                </div>
              </div>
              <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
                <div className="text-xs">Comet Invitation</div>
                <div className="text-xs text-gray-300 opacity-50">#F7RA</div>
              </div>
            </button>
          </CometCard>
        </div>
      </div>
    </div>
  )
}