"use client";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  video: string;
  poster?: string;
}

export const RenderVideoProduct: React.FC<Props> = ({ video, poster }) => {
  const [isReady, setIsReady] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Detectar cuando entra en viewport
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

  // Cuando el iframe se carga, reenviamos el "play" si ya hubo clic
  useEffect(() => {
    if (iframeLoaded && shouldPlay) {
      // Se recarga el iframe con autoplay=true
      if (iframeRef.current) {
        const src = new URL(iframeRef.current.src);
        src.searchParams.set("autoplay", "true");
        iframeRef.current.src = src.toString();
      }
      setShouldPlay(false); // Reseteamos el intento
    }
  }, [iframeLoaded, shouldPlay]);

  const handleUserClick = () => {
    setHasInteracted(true);
    if (!iframeLoaded) {
      setShouldPlay(true); // Guardamos intención
    } else {
      // Recargamos el iframe con autoplay=true si ya está cargado
      if (iframeRef.current) {
        const src = new URL(iframeRef.current.src);
        src.searchParams.set("autoplay", "true");
        iframeRef.current.src = src.toString();
      }
    }
  };

  return (
    <div
      ref={ref}
      className="w-full aspect-video max-w-2xl rounded-2xl overflow-hidden relative cursor-pointer"
      onClick={handleUserClick}
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
            ref={iframeRef}
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
              pointerEvents: hasInteracted ? "auto" : "none", // Solo deja interactuar tras el primer clic
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};
