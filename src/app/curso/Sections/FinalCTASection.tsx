import React from "react";
import {
  ButtonVSL,
  ContainerSections,
  SocialProof,
  Subtitle,
  Title,
} from "../components";
import { Product } from "@/app/Elements";

interface Props {
  product?: Product;
}

export const FinalCTASection: React.FC<Props> = ({ product }) => {
  return (
    <ContainerSections>
      <div className="w-full max-w-7xl flex flex-col justify-start items-center gap-5 ">
        <Title text={product?.finalCTA?.title || ""} />
        <Subtitle text={product?.finalCTA?.description || ""} />
        {product && product.payButtons && (
          <div className="flex gap-5 w-full max-w-2xl justify-center items-center">
            <ButtonVSL
              value={product?.payButtons[0].text}
              redirect={product?.payButtons[0].link}
            />
            <ButtonVSL
              value={product?.payButtons[1].text}
              variant="secondary"
              redirect={product?.payButtons[1].link}
            />
          </div>
        )}
        <SocialProof text={product?.finalCTA?.startRate || ""} />
        <Subtitle text="Se privado, Se libre, Se ingobernable..." />
      </div>
    </ContainerSections>
  );
};
