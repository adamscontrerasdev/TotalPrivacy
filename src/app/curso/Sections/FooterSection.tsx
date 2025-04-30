"use client";
import React from "react";
import { ContainerSections } from "../components";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <ContainerSections>
      <footer className="w-full max-w-7xl flex flex-col items-center justify-center gap-5 px-6 pt-10 pb-6 rounded-t-3xl bg-gradient-to-b from-[#001f3f] to-[#000]">
        <h2 className="text-white text-3xl font-bold neon-glow">
          TOTAL PRIVACY
        </h2>

        <p className="text-sm text-gray-200">
          ©2025 All rights reserved by Total Privacy.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-center">
          <Link
            href="/politica-de-privacidad"
            className="text-gray-300 hover:text-white transition duration-300 underline-offset-4 hover:underline"
          >
            Política de privacidad
          </Link>
          <Link
            href="/terminos&condiciones"
            className="text-gray-300 hover:text-white transition duration-300 underline-offset-4 hover:underline"
          >
            Términos & Condicione
          </Link>
        </div>
      </footer>
    </ContainerSections>
  );
};
