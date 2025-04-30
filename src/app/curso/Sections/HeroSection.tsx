import { Product } from "@/app/Elements";
import React from "react";
import {
  Subtitle,
  Title,
  ButtonVSL,
  SocialProof,
  RenderVideoProduct,
  ContainerSections,
} from "../components";

interface Props {
  product: Product;
  socialText: string;
}

export const HeroSection: React.FC<Props> = ({ product, socialText }) => {
  if (
    !product ||
    !product.title ||
    !product.description ||
    !product.video ||
    socialText
  )
    return null;

  return (
    <ContainerSections>
      <div className="w-full max-w-80 sm:max-w-2xl lg:max-w-4xl flex flex-col items-center gap-3 ">
        <Title text={product.title}></Title>
        <Subtitle text={product.description}></Subtitle>
      </div>
      <div className="w-full max-w-80 sm:max-w-2xl flex flex-col items-center gap-3 text-white">
        <ButtonVSL
          value={"Obtener"}
          variant="primary"
          redirect={product.payButtons?.[0].link}
        />
        {socialText && socialText !== "" && (
          <div className="">
            <div className="md:hidden">
              <SocialProof text={socialText} avatarsView={2} />
            </div>
            <div className="hidden md:block">
              <SocialProof text={socialText} avatarsView={4} />
            </div>
          </div>
        )}
      </div>
      <RenderVideoProduct video={product.video} />
    </ContainerSections>
  );
};
