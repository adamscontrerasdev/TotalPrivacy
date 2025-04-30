import { notFound } from "next/navigation";
import data from "../../../../public/data/products.json";
import ProductClient from "./ProductClient";
import { Product } from "@/app/Elements";
import React from "react";

const cursos: Product[] = data.cursos ?? [];
const validTypes = cursos
  .map((item) => item.key?.trim())
  .filter((key): key is string => key !== undefined);

export async function generateStaticParams() {
  return validTypes.map((type) => ({ type }));
}

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  // Esperar a que el parámetro se resuelva completamente antes de usarlo
  const resolvedParams = await Promise.resolve(params);
  const typeValue = await resolvedParams.type;

  const type = typeof typeValue === "string" ? typeValue.trim() : "";

  const productRaw = cursos.find((item) => item.key === type);

  if (!productRaw) {
    notFound();
  }

  const product = productRaw as Product;

  return <ProductClient product={product} />;
}
