"use client";
import React, { useRef, useEffect, useState } from "react";

const RenderVideo: React.FC = () => {
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const mainVideo = mainVideoRef.current;
    const backgroundVideo = backgroundVideoRef.current;

    if (!mainVideo || !backgroundVideo) return;

    // Sincronizar el tiempo del video de fondo con el principal
    const handleTimeUpdate = () => {
      if (mainVideo.currentTime !== backgroundVideo.currentTime) {
        backgroundVideo.currentTime = mainVideo.currentTime;
      }
    };

    // Sincronizar la reproducción/pausa
    const handlePlay = async () => {
      try {
        await backgroundVideo.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error al reproducir video de fondo:", error);
      }
    };

    const handlePause = () => {
      backgroundVideo.pause();
      setIsPlaying(false);
    };

    // Sincronizar el estado de carga
    const handleLoadedMetadata = () => {
      backgroundVideo.currentTime = mainVideo.currentTime;
    };

    mainVideo.addEventListener("timeupdate", handleTimeUpdate);
    mainVideo.addEventListener("play", handlePlay);
    mainVideo.addEventListener("pause", handlePause);
    mainVideo.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      mainVideo.removeEventListener("timeupdate", handleTimeUpdate);
      mainVideo.removeEventListener("play", handlePlay);
      mainVideo.removeEventListener("pause", handlePause);
      mainVideo.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div className="flex justify-center items-center relative">
      {/* Video de fondo */}
      <video
        ref={backgroundVideoRef}
        className="absolute top-0 left-0 z-10 w-full h-full object-cover"
        src="https://cgom8p4d6wbs6axv.public.blob.vercel-storage.com/Anuncio%20Partners%20Editado%20%281%29-wy3eXsP0OrTfqNHDIZ33FxYIXEDC9Z.mp4"
        style={{
          filter: "blur(70px)",
          opacity: 0.7,
        }}
        muted
        loop={false}
        playsInline
        aria-hidden="true"
      />

      {/* Video principal */}
      <video
        ref={mainVideoRef}
        className={`w-[90%] rounded-2xl z-20 relative aspect-video ${isPlaying ? "" : "p-[1px] bg-gradient-to-br from-neutral-300 via-transparent to-neutral-300"}`}
        style={{
          boxShadow: isPlaying ? "" : "0px 0px 10px #fff9",
          transition: "all .2s",
        }}
        controls
        autoPlay={false}
        loop={false}
        muted={false}
        controlsList="nodownload"
        playsInline
        poster="/img/Partners/Portada.png"
      >
        <source
          src="https://cgom8p4d6wbs6axv.public.blob.vercel-storage.com/Anuncio%20Partners%20Editado%20%281%29-wy3eXsP0OrTfqNHDIZ33FxYIXEDC9Z.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default RenderVideo;
