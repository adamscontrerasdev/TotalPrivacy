"use client";
import React, { useState } from "react";
import { useBuyMode } from "@/app/Elements/hooks/globalHooks/BuyModeContext";
import { GoAlert, GoCheckCircleFill } from "react-icons/go";
import { Product } from "./../../Elements/types/index";

interface Props {
  product: Product;
}

export const CardOFProduct: React.FC<Props> = ({ product }) => {
  const { setActive, setUrlCard } = useBuyMode();

  const normalizeText =
    " text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl";
  const normalizeTitles =
    "text-3xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl";

  useState(false);

  const handleAdquirirButton = () => {
    setActive(true);
    setUrlCard(product.cardPay || "");
  };

  const handleDetailsBotton = () => {
    location.href = `/details/${product.key}`;
  };

  return (
    <div
      className={`w-full h-full flex flex-col ${product.order === 1 ? "md:flex-row" : "md:flex-row-reverse"}`}
      style={{ background: `radial-gradient(at top, #000, #203adf30 )` }}
    >
      {/* Imagen o Video */}
      <div className={`w-full md:w-1/2 h-[40%] md:h-full  relative`}>
        <>
          <img
            src={product.Bg}
            alt={product.title}
            className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-[40%] md:-translate-y-[50%] "
          />
          <div
            className="w-full h-full absolute top-0 left-0"
            style={{
              background: `linear-gradient(to bottom, transparent 80%, rgba(0,0,0,0.85) 100%)`,
            }}
          ></div>
        </>
      </div>

      {/* Contenido */}
      <div
        className={` w-full md:w-1/2 h-[60%] md:h-full flex flex-col items-start justify-start md:py-40 px-4 md:px-10 gap-2 md:gap-8 z-50 bg-black transition-all duration-700  bottom-0 md:bottom-auto md:top-0 md:right-0`}
        style={{
          opacity: 1,
          pointerEvents: "auto",
        }}
      >
        <h1
          className={`font-extrabold text-white leading-tight ${normalizeTitles}`}
        >
          {product.title}
        </h1>
        <h2 className={` text-gray-300 leading-relaxed ${normalizeText}`}>
          {product.description}
        </h2>

        {product.points && (
          <ul className="flex flex-col gap-2">
            {product.points.map((point, index) => (
              <li
                key={index}
                className={`flex justify-start items-center gap-2 text-white ${normalizeText}`}
              >
                {point.point?.includes("SE NECESITA DE MÓVIL GOOGLE PIXEL") ? (
                  <>
                    <GoAlert className="fill-yellow-400 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    <p className="text-yellow-400 font-bold">{point.point}</p>
                  </>
                ) : (
                  <>
                    <GoCheckCircleFill className="fill-primary w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                    <p className="text-white">{point.point}</p>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        <div
          className={`flex  w-full items-center gap-5 ${product.proximamente ? "pt-0" : "pt-5"} `}
        >
          <button
            className={`${product.proximamente ? "bg-transparent" : "bg-yellow-500"} hover:bg-yellow-400 ${product.proximamente ? "text-white" : "text-black"} font-bold py-4 ${product.proximamente ? "px-0" : "px-10"} md:py-4  ${product.proximamente ? "md:px-0" : "md:px-10"}  rounded-xl    transition-all duration-300 ease-in-out ${product.proximamente ? "shadow-none" : "shadow-[0_0_10px_5px_rgb(202_138_4)]"} hover:shadow-[0_0_20px_10px_rgb(250_204_21)] ${product.proximamente ? "text-left" : "text-center"} ${normalizeText}`}
            onClick={handleAdquirirButton}
          >
            {product.proximamente
              ? "Este producto estara disponible product.proximamente..."
              : "Adquirir"}
          </button>
          {product.details && (
            <button
              className={`${product.proximamente ? "bg-transparent" : "bg-neutral-900"} hover:bg-neutral-950 ${product.proximamente ? "text-white" : "text-white"} font-bold py-4 ${product.proximamente ? "px-0" : "px-10"} md:py-4  ${product.proximamente ? "md:px-0" : "md:px-10"}  rounded-xl    transition-all duration-300 ease-in-out 
              ${product.proximamente ? "text-left" : "text-center"} ${normalizeText}`}
              onClick={handleDetailsBotton}
            >
              {product.proximamente
                ? "Este producto estara disponible product.proximamente..."
                : "Ver Detalles"}
            </button>
          )}

          {!product.proximamente && (
            <h2 className={`font-bold text-green-500 ${normalizeTitles}`}>
              <s className={`text-gray-500 ${normalizeText}`}>
                {product.before &&
                  product.currency &&
                  product.currency + product.before}
              </s>{" "}
              {product.currency}
              {product.price}
            </h2>
          )}
        </div>
      </div>

      {product.proximamente && (
        <div
          className="absolute top-0 left-0 w-full h-full z-[99]"
          style={{ backdropFilter: " grayscale(100%)" }}
        ></div>
      )}
    </div>
  );
};
