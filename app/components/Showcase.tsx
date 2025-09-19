import Image from "next/image";

export default function Showcase() {
  const cards = [
    "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/96c13718-35ec-4c6b-ac05-efa6e994dc3f_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/a055708e-5727-4345-b339-0737966db630_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/daf06670-0e8c-4034-90f7-e7d01518f845_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0c06f722-2305-476f-be4d-558159f7c9f5_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/10dd46c9-2ab8-44be-8554-48514ed069b9_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/ceb2a15c-6187-4832-8043-366078f0757a_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/20653000-43d0-4885-98f3-9ceb76370106_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/2a986d88-6602-4f79-ab2e-80e0c247940e_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/f85fdb1e-b236-4eff-aef0-5365055289c3_800w.jpg",
  ];
  return (
    <section id="work" className="relative">
      <div className="max-w-8xl md:px-12 mr-auto ml-auto pt-12 pr-8 pb-32 pl-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl tracking-tight text-white font-manrope font-medium">Selected Work</h2>
          <p className="mt-4 text-base md:text-lg text-neutral-300 font-sans">
            Strategy-led direction and tasteful execution across identity, web, and motion.
          </p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] mt-10">
          {cards.map((src, idx) => (
            <a key={idx} href="#" className="portfolio-card masonry-item group relative block overflow-hidden ring-1 ring-white/10 hover:ring-white/20 transition bg-neutral-900/50 rounded-lg mb-6">
              <Image src={src} alt="portfolio item" width={1200} height={900} className="w-full h-auto object-cover" loading="lazy" />
              <div className="pointer-events-none absolute inset-x-3 bottom-3">
                <div className="view-button w-full rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur px-4 py-2 text-xs md:text-sm text-white font-sans flex items-center justify-center gap-2">
                  View Casestudy
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


