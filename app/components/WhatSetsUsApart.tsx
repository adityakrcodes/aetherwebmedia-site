import Image from "next/image";

export default function WhatSetsUsApart() {
  return (
    <section className="relative bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            What Sets Us Apart
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
            Experience the Lumina difference through our proven approach, exceptional results, and unwavering commitment to your success.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Large Block - Strategic Design Thinking */}
          <div className="lg:col-span-7">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900">
              <Image 
                src="https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/96c13718-35ec-4c6b-ac05-efa6e994dc3f_800w.jpg" 
                alt="Strategic design thinking visualization" 
                width={800} 
                height={500} 
                className="h-full w-full object-cover" 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-semibold mb-1">
                  Design with <span className="text-blue-400">Purpose</span>
                </h3>
                <p className="text-sm text-neutral-300 mb-4">
                  ••• Every pixel has intention.
                </p>
                <a href="#process" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-blue-400 transition-colors">
                  Discover our approach
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7"></path>
                    <path d="M7 7h10v10"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Proven Results - Top Right */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-white font-medium mb-3">Proven Results:</h3>
              <div className="text-2xl font-bold text-white mb-4">
                <span className="text-blue-400">3x</span> faster project delivery, <span className="text-blue-400">2x</span> higher engagement
              </div>
              <div>
                <h4 className="text-sm font-medium text-neutral-300 mb-2">Our Methodology:</h4>
                <ul className="space-y-1 text-sm text-neutral-400">
                  <li>• Strategic Discovery & Research</li>
                  <li>• Collaborative Design Process</li>
                  <li>• Data-Driven Optimization</li>
                </ul>
              </div>
            </div>

            {/* Testimonial - Middle Right */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm text-neutral-300 mb-4 italic">
                "Lumina doesn't just create designs—they craft experiences. Their strategic thinking elevated our entire brand presence."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
                  MT
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Michael Torres</div>
                  <div className="text-xs text-neutral-400">CEO, Innovation Labs</div>
                </div>
              </div>
            </div>

            {/* 100% Satisfaction - Bottom Right */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">100% Satisfaction</h3>
              <p className="text-xs text-neutral-300">
                Guaranteed results or we'll make it right. Your success is our mission.
              </p>
            </div>

            {/* Metrics and Services - Bottom Right */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-400">150+</div>
                  <div className="text-xs text-neutral-400">Projects delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-400">48h</div>
                  <div className="text-xs text-neutral-400">Average start time</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                {[
                  { service: "Brand Strategy", level: "Expert" },
                  { service: "Visual Design", level: "Expert" },
                  { service: "Digital Marketing", level: "Expert" }
                ].map((item) => (
                  <div key={item.service} className="flex items-center justify-between">
                    <span className="text-xs text-neutral-300">{item.service}</span>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">{item.level}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
                <span>Lumina Certified Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
