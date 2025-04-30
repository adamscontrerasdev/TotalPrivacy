"use client";
import React, { useEffect, useRef, useState } from "react";
import { ContainerSections } from "./ContainerSections";
import { Subtitle } from "./Subtitle";
import { motion } from "framer-motion";
import { SuccessCases } from "./TestimoniCard";
import { Testimonio } from "@/app/Elements";

interface Props {
  testimonios?: Testimonio[];
}

export const CarruselProof: React.FC<Props> = ({ testimonios }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);

  const testimonialData = testimonios || [
    {
      name: "Juan",
      testimonio:
        "esto es un testimonio de prueba para que veas como se organiza el texto",
      img: "",
    },
  ];

  useEffect(() => {
    const updateDragConstraints = () => {
      if (!carouselRef.current || !innerRef.current) return;
      const containerWidth = carouselRef.current.offsetWidth;
      const contentWidth = innerRef.current.scrollWidth;
      const max = contentWidth - containerWidth;
      setMaxDrag(max > 0 ? max : 0);
    };

    updateDragConstraints();
    window.addEventListener("resize", updateDragConstraints);
    return () => window.removeEventListener("resize", updateDragConstraints);
  }, []);
  return (
    <ContainerSections>
      <div
        className="w-full max-w-5xl overflow-hidden relative "
        ref={carouselRef}
      >
        <div className="w-full flex items-start pl-3 mb-3">
          <Subtitle text="Nuestros alumnos dicen :" />
        </div>
        <motion.div
          role="Button"
          className="flex  gap-3 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          ref={innerRef}
        >
          {testimonialData.map((item, index) => (
            <SuccessCases
              description={item.testimonio || ""}
              img=""
              title={item.name || ""}
              key={index}
            />
          ))}
        </motion.div>
        <div
          className="w-full h-full absolute top-0 left-0  pointer-events-none"
          style={{
            background: "linear-gradient(to right, #000, transparent 3%)",
          }}
        ></div>
        <div
          className="w-full h-full absolute top-0 left-0  pointer-events-none"
          style={{
            background: "linear-gradient(to left, #000, transparent 3%)",
          }}
        ></div>
      </div>
    </ContainerSections>
  );
};
