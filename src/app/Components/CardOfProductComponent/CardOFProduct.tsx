"use client";
import React, { useEffect, useState } from "react";
import { RenderVideo } from "../../Components";
import { useIsMobile } from "@/app/Elements/hooks";
import { useBuyMode } from "@/app/Elements/hooks/globalHooks/BuyModeContext";
import { GoAlert, GoCheckCircleFill } from "react-icons/go";

interface CardOFProductProps {
  title: string;
  price: number;
  currency: string;
  Bg: string;
  video?: string;
  description: string;
  before?: number | boolean;
  order: number;
  poster?: string;
  cardPay: string;
  proximamente?: boolean;
  points?: string[];
}

export const CardOFProduct: React.FC<CardOFProductProps> = ({
  title,
  price,
  currency,
  Bg,
  video,
  description,
  before,
  order,
  poster,
  cardPay,
  proximamente,
  points,
}) => {
  const { setActive, setUrlCard } = useBuyMode();
  const [firstPlay, setFirstPlay] = useState(false); // Estado elevado
  const [opacityFoContent, setOpacityFoContent] = useState(false);
  const [playOrpause, setPlayOrpause] = useState(false);
  const isMobile = useIsMobile();
  const normalizeText =
    " text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl";
  const normalizeTitles =
    "text-3xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl";

  useState(false);

  useEffect(() => {
    // Controlar la opacidad del contenido basado en playOrpause
    if (playOrpause) {
      setOpacityFoContent(true); // Mostrar contenido
    } else {
      setOpacityFoContent(false); // Ocultar contenido
    }
  }, [playOrpause]);

  const handleAdquirirButton = () => {
    setActive(true);
    setUrlCard(cardPay || "");
  };

  return (
    <div
      className={`w-full h-full flex flex-col ${order === 1 ? "md:flex-row" : "md:flex-row-reverse"}`}
      style={{ background: `radial-gradient(at top, #000, #203adf30 )` }}
    >
      {/* Imagen o Video */}
      <div
        className={`w-full md:w-1/2 h-[40%] md:h-full ${video ? "" : "relative"}`}
      >
        {video && poster ? (
          <RenderVideo
            video={video}
            poster={poster}
            firstPlay={firstPlay}
            setFirstPlay={setFirstPlay}
            setPlayOrpause={setPlayOrpause}
          />
        ) : (
          <>
            <img
              src={Bg}
              alt={title}
              className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-[40%] md:-translate-y-[50%] "
            />
            <div
              className="w-full h-full absolute top-0 left-0"
              style={{
                background: `linear-gradient(to bottom, transparent 80%, rgba(0,0,0,0.85) 100%)`,
              }}
            ></div>
          </>
        )}
      </div>

      {/* Contenido */}
      <div
        className={`${
          video ? "absolute" : ""
        } ${video ? "left-0" : ""} ${video ? "md:bg-transparent" : ""} w-full md:w-1/2 h-[60%] md:h-full flex flex-col items-start justify-start md:py-40 px-4 md:px-10 gap-2 md:gap-8 z-50 bg-black transition-all duration-700  bottom-0 md:bottom-auto md:top-0 md:right-0 ${video ? "md:bg-custom-gradient-left" : ""}`}
        style={{
          opacity: !isMobile ? (opacityFoContent ? 0 : 1) : 1,
          pointerEvents: video ? "none" : "auto",
          transform: opacityFoContent ? "translateY(20px)" : "translateY(0)",
        }}
      >
        <h1
          className={`font-extrabold text-white leading-tight ${normalizeTitles}`}
        >
          {title}
        </h1>
        <h2 className={` text-gray-300 leading-relaxed ${normalizeText}`}>
          {description}
        </h2>

        {points && (
          <ul className="flex flex-col gap-2">
            {points.map((point, index) => (
              <li
                key={index}
                className={`flex justify-start items-center gap-2 text-white ${normalizeText}`}
              >
                {point.includes("SE NECESITA DE MÓVIL GOOGLE PIXEL") ? (
                  <>
                    <GoAlert className="fill-yellow-400 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    <p className="text-yellow-400 font-bold">{point}</p>
                  </>
                ) : (
                  <>
                    <GoCheckCircleFill className="fill-primary w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                    <p className="text-white">{point}</p>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {video ? (
          <div className="w-full">
            <button className="mt-2 md:mt-6  py-4 px-10 text-black">
              Adquirir
            </button>
          </div>
        ) : (
          <div
            className={`flex  w-full items-center gap-5 ${proximamente ? "pt-0" : "pt-5"} `}
          >
            <button
              className={`${proximamente ? "bg-transparent" : "bg-yellow-500"} hover:bg-yellow-400 ${proximamente ? "text-white" : "text-black"} font-bold py-4 ${proximamente ? "px-0" : "px-10"} md:py-4  ${proximamente ? "md:px-0" : "md:px-10"}  rounded-xl    transition-all duration-300 ease-in-out ${proximamente ? "shadow-none" : "shadow-[0_0_10px_5px_rgb(202_138_4)]"} hover:shadow-[0_0_20px_10px_rgb(250_204_21)] ${proximamente ? "text-left" : "text-center"} ${normalizeText}`}
              onClick={handleAdquirirButton}
            >
              {proximamente
                ? "Este producto estara disponible proximamente..."
                : "Adquirir"}
            </button>

            {!proximamente && (
              <h2 className={`font-bold text-green-500 ${normalizeTitles}`}>
                <s className={`text-gray-500 ${normalizeText}`}>
                  {before && currency + before}
                </s>{" "}
                {currency}
                {price}
              </h2>
            )}
          </div>
        )}
      </div>

      {/* Botón absolutamente posicionado */}
      {video && (
        <button
          className={`${proximamente ? "bg-transparent" : "bg-yellow-500"} hover:bg-yellow-400 text-black font-bold py-4 px-10 rounded-xl md:text-xl transition-all duration-[1s] ease-in-out ${proximamente ? "shadow-none" : "shadow-[0_0_10px_5px_rgb(202_138_4)]"} hover:shadow-[0_0_20px_10px_rgb(250_204_21)] absolute bottom-32  left-12`}
          style={{ zIndex: 99 }}
          onClick={handleAdquirirButton}
        >
          {proximamente
            ? "Este producto estara disponible proximamente..."
            : "Adquirir"}
        </button>
      )}

      {proximamente && (
        <div
          className="absolute top-0 left-0 w-full h-full z-[99]"
          style={{ backdropFilter: " grayscale(100%)" }}
        ></div>
      )}
    </div>
  );
};
