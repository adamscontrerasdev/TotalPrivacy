"use client";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  value?: string;
  sm?: boolean;
  variant?: "primary" | "secondary";
  redirect?: string;
  openModal?: { tarjeta?: string; bitcoin?: string };
}

export const ButtonVSL: React.FC<Props> = ({
  value,
  sm,
  variant,
  redirect,
  openModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openModal || !buttonRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsOpen(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(buttonRef.current);

    return () => observer.disconnect();
  }, [openModal]);

  const primaryGradient = "linear-gradient(to right, #00b4ff, #0083ff)";
  const secondaryGradient =
    "linear-gradient(135deg, #f7931a 0%, #ffcc00 50%, #ffffff 100%)";

  return (
    <>
      {!openModal ? (
        <button
          className={`p-2 rounded-xl w-full  ${variant ? (variant === "primary" ? "text-white" : "text-black") : "text-white"} ${sm ? "max-w-32" : "md:text-lg lg:text-xl max-w-52"}`}
          style={{
            background: variant
              ? variant === "primary"
                ? primaryGradient
                : secondaryGradient
              : "linear-gradient(to right, #00b4ff, #0083ff)",
          }}
          onClick={() => {
            if (redirect) {
              window.location.href = redirect;
            } else if (openModal) {
              setIsOpen(!isOpen);
            }
          }}
        >
          {value || "Boton"}
        </button>
      ) : (
        <div
          className={`p-2 rounded-xl relative w-full  ${variant ? (variant === "primary" ? "!text-white" : "text-black") : "text-white"} ${sm ? "max-w-32" : "md:text-lg lg:text-xl max-w-52"}  
          transition-all duration-300 ease-in-out ${isOpen ? "h-12" : " active:scale-95 h-12"} overflow-hidden flex items-center justify-center`}
          style={{
            background: variant
              ? variant === "primary"
                ? primaryGradient
                : secondaryGradient
              : "linear-gradient(to right, #00b4ff, #0083ff)",
          }}
          role="button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          ref={buttonRef}
        >
          <p className={`text-white ${isOpen ? "opacity-0" : ""}`}>{value}</p>
          <div
            className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`h-full w-full text-xl text-white active:scale-95 transition-all duration-300 ease-in-out`}
              style={{
                background: primaryGradient,
              }}
              onClick={() => {
                if (openModal?.tarjeta) {
                  window.location.href = openModal.tarjeta;
                }
              }}
            >
              Tarjeta
            </button>
            <button
              className={`h-full w-full text-black text-xl`}
              style={{
                background: secondaryGradient,
              }}
              onClick={() => {
                if (openModal?.bitcoin) {
                  window.location.href = openModal.bitcoin;
                }
              }}
            >
              Bitcoin
            </button>
          </div>
        </div>
      )}
    </>
  );
};
