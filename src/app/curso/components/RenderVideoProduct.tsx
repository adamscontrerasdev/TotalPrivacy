"use client";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  video: string;
  poster?: string;
}

export const RenderVideoProduct: React.FC<Props> = ({ video, poster }) => {
  const [isReady, setIsReady] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Detecta cuando el componente entra al viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReady(true);
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
      className="w-full aspect-video max-w-2xl rounded-2xl overflow-hidden relative"
    >
      {/* Mostrar poster mientras el iframe no está listo */}
      {!iframeLoaded && poster && (
        <img
          src={poster}
          alt="Vista previa del video"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Cargar el iframe solo cuando esté en viewport y renderizarlo cuando se cargue */}
      {isReady && video && (
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            onLoad={() => setIframeLoaded(true)}
            src={`https://iframe.mediadelivery.net/embed/411945/${video}?autoplay=false&loop=false&muted=false&preload=false&responsive=true`}
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
