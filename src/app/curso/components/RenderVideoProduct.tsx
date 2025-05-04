"use client";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  video: string;
  poster?: string;
}

export const RenderVideoProduct: React.FC<Props> = ({ video, poster }) => {
  const [isReady, setIsReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReady(true); // Comenzamos a cargar
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div
      ref={ref}
      className="w-full aspect-video max-w-2xl rounded-2xl overflow-hidden relative"
    >
      {!iframeLoaded && poster && (
        <img
          src={poster}
          alt="Cargando video..."
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
      )}

      {isReady && video && (
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            onLoad={() => setIframeLoaded(true)}
            src={`https://iframe.mediadelivery.net/embed/411945/${video}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`}
            loading="lazy"
            style={{
              border: "0",
              position: "absolute",
              top: "0",
              left: "0",
              height: "100%",
              width: "100%",
              zIndex: 1,
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};
