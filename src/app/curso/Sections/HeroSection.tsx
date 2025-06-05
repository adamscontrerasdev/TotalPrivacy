"use client";
import { Product } from "@/app/Elements";
import React from "react";
import {
  Subtitle,
  Title,
  ButtonVSL,
  RenderVideoProduct,
  ContainerSections,
} from "../components";
import { SystemLine } from "../components/SystemLine";

interface Props {
  product: Product;
  socialText: string;
}

export const HeroSection: React.FC<Props> = ({ product }) => {
  // Early return durante el renderizado del servidor o si faltan props
  if (!product || !product.title || !product.description || !product.video) {
    return null;
  } else {
    return (
      <ContainerSections>
        <div className="w-full max-w-80 sm:max-w-2xl lg:max-w-4xl flex flex-col items-center gap-3">
          <Title text={product?.title || ""}></Title>
          <Subtitle text={product?.description || ""}></Subtitle>
        </div>
        {/* Minimal version for SSR */}
        <div className="w-full max-w-80 sm:max-w-2xl flex flex-col items-center gap-3 text-white">
          {product?.payButtons?.[0]?.link && (
            <ButtonVSL BuyButton value="Ver Planes" />

          )}
        </div>
        {product?.video && (
          <RenderVideoProduct video={product.video} poster={product.poster} />
        )}
        <SystemLine />
      </ContainerSections>
    );
  }
};
