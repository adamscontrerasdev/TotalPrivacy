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
  const btcPay = product?.payButtons?.find(button => button.type === "Bitcoin")?.link || "";
  const cardPay = product?.payButtons?.find(button => button.type === "tarjeta")?.link || "";


  return (
    <ContainerSections>
      <div className="w-full max-w-7xl flex flex-col justify-start items-center gap-5 ">
        <Title text={product?.finalCTA?.title || ""} />
        <Subtitle text={product?.finalCTA?.description || ""} />
        {product && product.payButtons && (
          <div className="flex gap-5 w-full max-w-2xl justify-center items-center">
            <ButtonVSL
              PayButton={cardPay}
              variant={"primary"}
              value={"Obtener"}
            />
            <ButtonVSL
              PayButton={btcPay}
              value="Bitcoin"
              variant="secondary"
              ico
              className="shadow-[0_0_10px_-2px_#F7931A] hover:shadow-[0_0_20px_-3px_#F7931A]"
              blank
            />
          </div>
        )}
        <SocialProof text={product?.finalCTA?.startRate || ""} />
        <Subtitle text="Se privado, Se libre, Se ingobernable..." />
      </div>
    </ContainerSections>
  );
};
