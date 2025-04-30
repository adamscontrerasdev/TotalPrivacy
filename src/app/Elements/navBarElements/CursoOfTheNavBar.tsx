"use client";
import React, { useEffect, useState } from "react";
import {
  SiApple,
  SiWindows10,
  SiAndroid,
  SiBitcoinsv,
  SiGrapheneos,
} from "react-icons/si";
import { MdOutlineDesktopMac } from "../icons/Mac";

import styles from "./ElementsNavBar.module.css";
import { GeneralCardOfNavbar } from "./../../Elements/index";
import dataOfCurso from "./../../../../public/data/products.json";
import { useIsMobile } from "../hooks";
import Link from "next/link";

// Mapping icon names to react-icons components
const iconMap: Record<string, React.ElementType> = {
  SiApple,
  MdOutlineDesktopMac,
  SiWindows10,
  SiAndroid,
  SiBitcoinsv,
  SiGrapheneos,
};

interface CursoOfTheNavBarProps {
  isVisible?: boolean;
  duration?: number;
  closeMenu: () => void; // Nueva prop para cerrar el menú
}

export const CursoOfTheNavBar: React.FC<CursoOfTheNavBarProps> = ({
  isVisible,
  duration = 200, // reduce duración
  closeMenu,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const isMobile = useIsMobile();

  const iconCards = Array.isArray(dataOfCurso.cursos) ? dataOfCurso.cursos : [];

  useEffect(() => {
    if (isVisible) {
      setIsRendered(true);
      setTimeout(() => setIsAnimated(true), 50); // Inicia fade-in rápidamente
    } else {
      setIsAnimated(false);
      const timeout = setTimeout(
        () => setIsRendered(false),
        iconCards.length * 50 + duration, // tiempo reducido para fade-out completo
      );
      return () => clearTimeout(timeout);
    }
  }, [isVisible, duration, iconCards.length]);

  return (
    isRendered && (
      <div className="flex flex-col md:flex-row items-center justify-evenly w-3/4  text-text  absolute top-0 h-[95%] md:h-full ">
        {isMobile && <div onClick={closeMenu}></div>}

        {iconCards.map(({ icon, title, key }, index) => {
          const IconComponent = iconMap[icon];
          if (!IconComponent) return null;

          // Reduce el delay para una desaparición más rápida
          const delay = isMobile
            ? isAnimated
              ? index * 20 // Aparece de izquierda a derecha con menor delay
              : (iconCards.length - 1 - index) * 20
            : isAnimated
              ? index * 50 // Aparece de izquierda a derecha con menor delay
              : (iconCards.length - 1 - index) * 50; // Desaparece de derecha a izquierda
          return (
            <div
              key={index}
              className={`${styles.cardCurso} transition-opacity duration-200 cursor-pointer`}
              style={{
                opacity: isAnimated ? 1 : 0,
                transitionDelay: `${delay}ms`,
              }}
            >
              <Link href={`/curso/${key}`} onClick={closeMenu}>
                <GeneralCardOfNavbar ico={IconComponent} title={title} />
              </Link>
            </div>
          );
        })}
      </div>
    )
  );
};
