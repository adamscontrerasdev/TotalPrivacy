import React from "react";

interface Props {
  text: string;
}

export const Title: React.FC<Props> = ({ text }) => {
  const normalizeTitles = "text-3xl sm:text-5xl 2xl:text-6xl font-bold ";

  return <h1 className={`${normalizeTitles} `}>{text}</h1>;
};
