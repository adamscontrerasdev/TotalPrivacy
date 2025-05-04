"use client";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  video: string;
  poster?: string; // Ruta completa o relativa del poster (ej. /poster.png)
}

export const RenderVideoProduct: React.FC<Props> = ({ video, poster }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full aspect-video max-w-2xl rounded-2xl overflow-hidden"
    >
      {isVisible && video ? (
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            src={`https://iframe.mediadelivery.net/embed/411945/${video}?autoplay=false&loop=false&muted=false&preload=false&responsive=true`}
            loading="lazy"
            style={{
              border: "0",
              position: "absolute",
              top: "0",
              left: "0",
              height: "100%",
              width: "100%",
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>
      ) : poster ? (
        <img
          src={poster}
          alt="Cargando video..."
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-neutral-800 animate-pulse" />
      )}
    </div>
  );
};
