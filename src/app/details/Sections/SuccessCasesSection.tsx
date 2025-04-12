import React from "react";
import {
  ContainerSections,
  Subtitle,
  SuccessCases,
  Title,
} from "../components";
import { Product } from "@/app/Elements";

interface Props {
  product: Product;
}

export const SuccessCasesSection: React.FC<Props> = ({ product }) => {
  const SuccesCaseItems = product.SuccessCasesSection;
  return (
    <ContainerSections>
      <div className="w-full  max-w-7xl flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <Title text="Casos de éxito" />
          <Subtitle text="Nuestros alumnos estan usando nuestro producto" />
        </div>
        <div className=" max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-4 rounded-3xl ">
          {" "}
          {SuccesCaseItems.map((item, i) => (
            <SuccessCases
              description={item.description}
              img={item.img}
              key={i}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </ContainerSections>
  );
};
