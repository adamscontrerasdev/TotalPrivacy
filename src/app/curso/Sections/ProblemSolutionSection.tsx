import React from "react";
import { ContainerSections } from "../components";
import { Product } from "@/app/Elements";
import { Line } from "../components/common/Line";

interface ProblemOrSolutionProps {
  content: { title: string; content: string };
}

const ProblemOrSolution: React.FC<ProblemOrSolutionProps> = ({ content }) => (
  <div className="w-full h-full flex flex-col justify-start items-start p-6 text-white gap-3">
    <h2 className="text-xl font-bold text-left">{content.title}</h2>
    <p className="text-left text-xs md:text-base text-neutral-300">
      {content.content}
    </p>
  </div>
);

interface Props {
  product?: Product;
}

export const ProblemSolutionSection: React.FC<Props> = ({ product }) => {
  const problem = product?.problem;
  const solution = product?.solution;

  const isComplete = (item?: { title?: string; content?: string }) =>
    !!item?.title?.trim() && !!item?.content?.trim();

  // Si cualquiera de los dos está incompleto, no renderizamos
  if (!isComplete(problem) || !isComplete(solution)) return null;

  const contentArray = [problem, solution] as {
    title: string;
    content: string;
  }[];

  return (
    <ContainerSections>
      <Line color="#0083ff" />
      <div className="w-full flex flex-col sm:flex-row items-start justify-center max-w-7xl">
        {contentArray.map((block, index) => (
          <ProblemOrSolution key={index} content={block} />
        ))}
      </div>
      <Line color="#0083ff" />
    </ContainerSections>
  );
};
