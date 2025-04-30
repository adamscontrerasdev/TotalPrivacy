import { CarruselProof } from "@/app/curso/components/common/CarruselProof";
import { Testimonio } from "@/app/Elements";
import React from "react";

const testimonialData: Testimonio[] = [];

export const SocialProofMainComponent = () => {
  return (
    <div id="socialProof" className="pt-20">
      <CarruselProof
        testimonios={testimonialData.length > 0 ? testimonialData : undefined}
      />
    </div>
  );
};
