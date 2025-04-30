import React from "react";
import { Product } from "@/app/Elements";
import { CarruselProof } from "../components/common/CarruselProof";

// Datos de ejemplo para los testimonios

interface Testimonial {
  product: Product;
}

export const SocialProofSection: React.FC<Testimonial> = ({ product }) => {
  const testimonialData = product.testimonios;

  if (
    !testimonialData ||
    testimonialData.length === 0 ||
    testimonialData === null ||
    testimonialData[0] === undefined ||
    testimonialData[0] === null ||
    testimonialData[0].name === undefined ||
    testimonialData[0].name === null ||
    testimonialData[0].name === "" ||
    testimonialData[0].testimonio === ""
  ) {
    return null;
  } else {
    return <CarruselProof testimonios={testimonialData} />;
  }
};
