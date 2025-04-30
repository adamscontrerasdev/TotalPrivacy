"use client";
import React, { useEffect, useState } from "react";
import data from "./dataInicio.json";
import { Subtitle } from "@/app/curso/components";
import { IoIosArrowDown } from "react-icons/io";
export const HeroComponent = () => {
  const [scale, setScale] = useState(1);
  const [roundedPx, setRoundedPx] = useState(0);
  const { eslogan, parrafo } = data;

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 200;
      const minScale = 0.7;
      const maxRadius = 50;

      const scrollY = window.scrollY;
      const newScale = Math.max(minScale, 1 - scrollY / maxScroll / 4);

      const progress = 1 - (newScale - minScale) / (1 - minScale);
      const newRadius = Math.round(progress * maxRadius);

      setScale(newScale);
      setRoundedPx(newRadius);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`relative w-screen h-[100dvh]  flex flex-col items-center justify-center z-0 `}
      style={{
        background:
          "radial-gradient(circle at center, #203adf30 10%, black 50%)",
        transform: `scale(${scale})`,
        borderRadius: `${roundedPx}px`,
      }}
    >
      <h1
        className={`font-bold text-6xl sm:text-8xl md:text-8xl 2xl:text-[12rem] text-foreground z-[9999] relative  w-screen text-center`}
        style={{
          textShadow: "var(--textShadow-glow)",
        }}
      >
        Total Privacy
      </h1>
      <div className="text-center  flex flex-col items-center justify-center">
        <Subtitle text={parrafo} />
        <img src="/img/Finales/FirmaRave.png" alt="" className="h-14" />
      </div>
      <div className=" w-full flex items-center justify-center z-50 h-20 absolute bottom-0 left-0 ">
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => {
            location.href = "#Cursos";
          }}
        >
          <h2>{eslogan}</h2>
          <IoIosArrowDown className="text-white text-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};
