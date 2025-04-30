import { ButtonVSL, Subtitle, Title } from "@/app/curso/components";
import { Product } from "@/app/Elements";
import React from "react";

interface Props {
  product?: Product;
}

export const InicioItem: React.FC<Props> = ({ product }) => {
  return (
    <div
      className={`w-full  h-[70vh] flex justify-center items-center p-5 rounded-xl`}
      style={{
        background: `linear-gradient(to bottom,#000 50%,${product?.bgColor || "#000"} 100% )`,
      }}
    >
      <div className=" w-full h-full max-w-7xl flex flex-col items-center justify-start gap-2 p-2 rounded-t-3xl">
        <div className="text-center flex flex-col items-center justify-center gap-2  h-1/4">
          <Title text={product?.title || "Prueba"}></Title>
          <Subtitle text={product?.description || "Prueba"}></Subtitle>
          <ButtonVSL />
        </div>

        <div className="h-3/4  w-full flex justify-center items-center">
          <img src={product?.Bg || ""} alt="product" className="h-[90%]" />
        </div>
      </div>
    </div>
  );
};
