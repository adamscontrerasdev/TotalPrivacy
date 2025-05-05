"use client";

import React from "react";
import { ContainerSections } from "../components";
import { Points, Product } from "@/app/Elements";
import { Line } from "../components/common/Line";

interface Props {
  product: Product;
}

const parseBoldText = (text: string) => {
  const regex = /\*(.*?)\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <strong key={`bold-${match.index}`} className="font-bold text-white">
        {match[1]}
      </strong>,
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

const PointItem: React.FC<{ point: Points }> = ({ point }) => {
  const parsedText = parseBoldText(point.point || "");

  return (
    <div className="md:w-52  aspect-square rounded-3xl flex flex-col items-center justify-center transition-all duration-300 ease-in-out gap-2">
      <img
        src={point.icon}
        alt="icon"
        className="w-full h-full rounded-2xl"
        style={{
          boxShadow: "0px 0px 50px #0083ff33",
        }}
      />
      <p className="text-[10px] md:text-base text-white text-center">
        {parsedText}
      </p>
    </div>
  );
};

const BulletsPointsSection: React.FC<Props> = ({ product }) => {
  const points: Points[] = product.points ?? [];

  return (
    <ContainerSections>
      <div className="grid grid-cols-3 gap-4 place-items-start md:place-items-center  p-4 w-full max-w-5xl bg-g">
        {points.map((point, index) => (
          <PointItem key={index} point={point} />
        ))}
      </div>
      <Line color="#0083ff" />
    </ContainerSections>
  );
};

export default BulletsPointsSection;