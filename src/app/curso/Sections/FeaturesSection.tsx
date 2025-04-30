import React from "react";
import { ButtonVSL, ContainerSections } from "../components";
import { Product, Features, PayButton } from "@/app/Elements";

interface Props {
  product?: Product;
}

interface FeaturesCardProps {
  feature: Features;
  payButtons?: PayButton[];
}

const FeaturesCard: React.FC<FeaturesCardProps> = ({ feature, payButtons }) => {
  const { title, content, button, order } = feature;

  if (!title || !content || order === undefined) return null;

  return (
    <div
      className={`w-full flex flex-col-reverse md:h-80 ${
        order === 1 ? "md:flex-row" : "md:flex-row-reverse"
      } gap-10`}
    >
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-4">
        <h2 className="text-xl md:text-4xl text-white font-bold text-left">
          {title}
        </h2>
        <p className="text-xs md:text-base text-neutral-300 text-left max-w-xl">
          {content}
        </p>
        {button && button !== "" && (
          <ButtonVSL
            value={button}
            sm={false}
            variant="primary"
            redirect={payButtons && payButtons[0].link}
          />
        )}
      </div>
      <div
        className={`w-full md:w-1/2 aspect-video rounded-2xl ${feature.img ? "overflow-hidden" : "bg-neutral-800 animate-pulse"}`}
      >
        {feature.img && feature.img !== "" && (
          <img
            src={feature.img}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export const FeaturesSection: React.FC<Props> = ({ product }) => {
  const features = product?.features ?? [];

  if (
    features.length === 0 ||
    features[0].title === "" ||
    features[0].content === ""
  )
    return null;

  return (
    <ContainerSections>
      <div className="w-full max-w-6xl 2xl:max-w-7xl flex flex-col gap-5 md:gap-10 lg:gap-20 ">
        {features.map((feature, index) => (
          <FeaturesCard
            key={index}
            feature={feature}
            payButtons={product?.payButtons}
          />
        ))}
      </div>
    </ContainerSections>
  );
};
