"use client";
import React from "react";
import { FaBtc } from "react-icons/fa";

interface Props {
  value?: string;
  BuyButton?: boolean;
  PayButton?: string;
  variant?: "primary" | "secondary" | "tertiary";
  onclick?: () => void;
  className?: string;
  ico?: boolean;
  blank?: boolean;
}

export const ButtonVSL: React.FC<Props> = ({
  value = "Obtener",
  BuyButton,
  PayButton,
  variant = "primary",
  onclick,
  className,
  ico,
  blank,
}) => {
  const primaryGradient = "linear-gradient(to right, #00b4ff, #0083ff)";
  const secondaryGradient =
    "linear-gradient(135deg, #000 0%, #222 50%, #000 100%)";
  // const other = "linear-gradient(135deg, #F7931A 0%, #F7931A 50%, #000 100%)";
  const tertiaryGradient =
    "linear-gradient(135deg, #fff6 0%, #fff 50%, #000 100%)";

  const handleClick = () => {
    if (onclick) {
      onclick(); // Ejecutar función personalizada si existe
      return;
    }

    if (BuyButton) {
      const section = document.querySelector("#pricing");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else if (PayButton) {
      if (blank) {
        window.open(PayButton, "_blank");
      } else {
        window.location.href = PayButton;
      }
    }
  };

  return (
    <button
      className={`p-2 rounded-xl w-full ${
        variant === "secondary"
          ? "text-white"
          : variant === "tertiary"
          ? "text-black"
          : "text-white"
      } md:text-lg lg:text-xl max-w-52 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out active:scale-95 ${className} font-bold ${
        ico
          ? "flex items-center gap-2 justify-center border-[1px] border-[#F7931A]"
          : ""
      }`}
      style={{
        background:
          variant === "secondary"
            ? secondaryGradient
            : variant === "tertiary"
            ? tertiaryGradient
            : primaryGradient,
      }}
      onClick={handleClick}
    >
      {ico && (
        <span className="p-1 bg-[#F7931A] rounded-full">
          <FaBtc />
        </span>
      )}
      {value}
    </button>
  );
};
