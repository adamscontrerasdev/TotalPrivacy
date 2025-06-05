"use client";
import {
  ButtonVSL,
  ContainerSections,
  Subtitle,
  Title,
} from "@/app/curso/components";
import React from "react";
import data from "@/../../public/data/products.json";
import { Product } from "@/app/Elements";
import { SiApple, SiWindows10, SiAndroid } from "react-icons/si";
import { Line } from "@/app/curso/components/common/Line";
import { MdOutlineDesktopMac } from "react-icons/md";

interface ProductCardProps {
  product?: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const iconMap: Record<string, React.ElementType> = {
    SiApple,
    MdOutlineDesktopMac,
    SiWindows10,
    SiAndroid,
  };
  const IconComponent = iconMap[product?.icon || ""];

  return (
    <div className="w-full max-w-1/2 h-[22rem] bg-neutral-950 max-w-7xl rounded-2xl overflow-hidden flex flex-col items-center justify-between relative hover:scale-105 transition-transform duration-200">
      {/* <div className="w-full h-20  flex flex-col items-start justify-center p-5">
        <h2 className="font-bold text-white text-2xl">{product?.title}</h2>
        <p className="text-xs text-left max-w-96">{product?.description}</p>
      </div> */}

      <div className="w-full h-20  flex items-center justify-between md:p-5 p-2 bg-black/50 backdrop-blur-xl gap-2 absolute z-20 bottom-0">
        <div className=" flex md:gap-4 h-full justify-around items-center ">
          <IconComponent className="text-white text-3xl  w-1/4" />
          <div className="flex flex-col items-start justify-center w-3/4">
            <p className="text-[10px] md:text-sm text-left md:max-w-96 ">
              {product?.description}
            </p>
          </div>
        </div>
        <div
          onClick={() => (location.href = `curso/${product?.key}`)}
          className="w-full max-w-32"
        >
          <ButtonVSL value="Ver Curso" />
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <img src={product?.Bg || ""} alt="" className="w-full" />
      </div>
    </div>
  );
};

export const ProductRenderMain = () => {
  const products: Product[] = data.cursos;

  return (
    <ContainerSections id="Cursos">
      <div
        className="w-full  max-w-7xl flex flex-col items-center justify-center 
      md:items-start md:justify-start  md:p-2 text-center"
      >
        <Title text="Cursos" />
        <div className="max-w-52 md:max-w-max text-center ">
          <Subtitle text="En esta sección podrás encontrar Nuestros Cursos" />
        </div>
      </div>
      <div className="w-full max-w-7xl grid md:grid-cols-2 gap-5 md:p-2 ">
        {products.map((product, index) => (
          <div key={index}>
            <div className="md:hidden">
              <Line color="#0083ff" />
              <br />
            </div>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </ContainerSections>
  );
};
