import { PlayCircle, X } from "lucide-react";

import { useEffect, useState } from "react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  poster?: string;
}

const videos: VideoItem[] = [
  {
    id: "video-1",
    title: "Welcome to Nidan Diagnostic Centre",
    description:
      "Know more about Nidan Diagnostic Centre, our specialists and diagnostic services.",
    videoUrl: "/videos/nidan-services-video.mp4",
    poster: "/images/video-poster-1.jpg",
  },
  {
    id: "video-2",
    title: "Our Diagnostic Services",
    description:
      "Explore our advanced diagnostic services and patient-focused healthcare facilities.",
    videoUrl: "/videos/diagnostic-services.mp4",
    poster: "/images/video-poster-2.jpg",
  },
  {
    id: "video-3",
    title: "Why Choose Nidan?",
    description:
      "Learn why patients trust Nidan for accurate, reliable and timely diagnostic services.",
    videoUrl: "/videos/why-choose-nidan.mp4",
    poster: "/images/video-poster-3.jpg",
  },
  {
    id: "video-4",
    title: "Home Sample Collection",
    description: "See how our convenient home sample collection service works.",
    videoUrl: "/videos/home-sample-collection.mp4",
    poster: "/images/video-poster-4.jpg",
  },
  {
    id: "video-5",
    title: "Advanced Diagnostic Technology",
    description:
      "Take a look at the technology and equipment used at our diagnostic centre.",
    videoUrl: "/videos/advanced-technology.mp4",
    poster: "/images/video-poster-5.jpg",
  },
  {
    id: "video-6",
    title: "Patient Care at Nidan",
    description:
      "Our team is committed to providing a comfortable and patient-friendly experience.",
    videoUrl: "/videos/patient-care.mp4",
    poster: "/images/video-poster-6.jpg",
  },
];

export function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Close popup with Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = selectedVideo ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  return (
    <>
      <section className="bg-gray-50 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <PlayCircle size={16} />
              Know More About Us
            </span>

            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Discover Nidan Diagnostic Centre
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
              Watch our videos to learn more about our services, technology,
              facilities and commitment to quality diagnostic care.
            </p>
          </div>

          {/* Video Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => setSelectedVideo(video)}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {/* =================================================
                    ACTUAL VIDEO PREVIEW
                   ================================================= */}
                <div className="relative aspect-video overflow-hidden bg-gray-900">
                  <video
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={video.videoUrl}
                    poster={video.poster}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                  />

                  {/* Overlay */}
                  <div className="relative aspect-video overflow-hidden bg-gray-900">
                    <video
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={video.videoUrl}
                      poster={video.poster}
                      muted
                      autoPlay
                      loop
                      playsInline
                      preload="metadata"
                    />

                    {/* Subtle hover overlay only */}
                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
                  </div>

                  {/* Bottom gradient */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <PlayCircle size={20} />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {video.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          VIDEO POPUP
         ===================================================== */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Popup */}
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-white hover:text-gray-900"
            >
              <X size={22} />
            </button>

            {/* Video */}
            <div className="aspect-video w-full bg-black">
              <video
                key={selectedVideo.videoUrl}
                className="h-full w-full object-contain"
                controls
                autoPlay
                playsInline
                poster={selectedVideo.poster}
              >
                <source src={selectedVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Information */}
            <div className="bg-white p-5 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                {selectedVideo.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
