"use client";
import React, { useState } from "react";
import { ContainerSections, Subtitle, Title } from "../components";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Product } from "@/app/Elements";

const FAQItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 w-full flex flex-col gap-2 items-start">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h2 className="text-lg md:text-xl font-semibold text-white w-[80%]">
          {question}
        </h2>
        <MdKeyboardArrowDown
          className={`h-5 w-5 text-white transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-neutral-300 text-left">{answer}</p>
      </div>
    </div>
  );
};

interface Props {
  product: Product;
}

export const FAQSection: React.FC<Props> = ({ product }) => {
  const primaryColor = "#0083ff";

  // Filtrar FAQs válidas
  const validFAQ = (product.faq || []).filter(
    (faq) => faq.question?.trim() && faq.answer?.trim(),
  );

  // Si no hay FAQs válidas, no renderizar nada
  if (validFAQ.length === 0) return null;

  return (
    <ContainerSections>
      <div className="w-full max-w-7xl flex items-center justify-center flex-col gap-5">
        <div className="flex flex-col items-center gap-2 pt-10">
          <Title text="Preguntas Frecuentes" />
          <Subtitle text="No te quedes con dudas, consulta las preguntas más recurrentes" />
        </div>

        <div
          className="w-full bg-black rounded-3xl flex flex-col p-4 justify-center items-center max-w-sm md:max-w-2xl"
          style={{
            border: `1px solid ${primaryColor}`,
            boxShadow: `0 0 30px ${primaryColor}33`,
          }}
        >
          {validFAQ.map((faq, i) => (
            <FAQItem key={i} question={faq.question!} answer={faq.answer!} />
          ))}
        </div>
      </div>
    </ContainerSections>
  );
};
