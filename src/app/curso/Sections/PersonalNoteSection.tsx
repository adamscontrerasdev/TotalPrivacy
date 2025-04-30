import React from "react";
import { ContainerSections } from "../components";
import { Line } from "../components/common/Line";
import { Product } from "@/app/Elements";

interface Props {
  product?: Product;
}

export const PersonalNote: React.FC<Props> = ({ product }) => {
  if (
    !product?.personalNote ||
    product.personalNote.note === "" ||
    product.personalNote.title === ""
  ) {
    return null;
  } else {
    return (
      <ContainerSections>
        <Line color="#0083ff" />
        <div className="w-full max-w-7xl flex justify-center items-center">
          <div className="w-full max-w-5xl flex flex-col md:flex-row gap-5 rounded-2xl justify-center items-center ">
            {product?.personalNote?.img !== "" ? (
              <div className="h-full">
                <div>
                  <img
                    src={product?.personalNote?.img}
                    alt="img"
                    className=" rounded-2xl aspect-square "
                  />
                </div>
              </div>
            ) : null}
            <div className="w-full h-[70%] flex flex-col items-start justify-center bg-grwo-400 gap-2">
              <h1 className="text-2xl font-bold text-white">
                {product?.personalNote?.title}
              </h1>
              <p className="text-xs md:text-base text-neutral-300 text-left">
                {product?.personalNote?.note}
              </p>
            </div>
          </div>
        </div>
        <Line color="#0083ff" />
      </ContainerSections>
    );
  }
};
