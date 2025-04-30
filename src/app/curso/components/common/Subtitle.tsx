import React from "react";

interface Props {
  text: string;
  white?: boolean;
}

export const Subtitle: React.FC<Props> = ({ text, white }) => {
  const normalizeText = " text-sm md:text-md lg:text-lg xl:text-xl";

  return (
    <h2
      className={`leading-relaxed ${normalizeText} md:xl:max-w-xl max-w-80 ${white ? "text-white" : ""}`}
    >
      {text}
    </h2>
  );
};
