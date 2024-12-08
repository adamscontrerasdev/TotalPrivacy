"use client";
import React, { useState, useEffect, useRef, use } from "react";
import { notFound } from "next/navigation";
import data from "./../../../public/data/products.json";
import styles from "./styles.module.css";
import Link from "next/link";
import { CardOFProduct } from "../Components";

const ContentList = ({ params }: { params: Promise<{ type: string }> }) => {
  const { type } = use(params);
  const items = data[type as "ebooks" | "cursos"];
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeCircle, setActiveCircle] = useState<string>(items[0]?.key || "");

  if (!items) {
    notFound();
  }

  const setRef = (itemKey: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[itemKey] = el;
  };

  const handleScroll = (direction?: "up" | "down") => {
    const currentScroll = window.scrollY;
    const closestSectionIndex = Math.round(currentScroll / window.innerHeight);

    let targetIndex = closestSectionIndex;
    if (direction) {
      targetIndex =
        direction === "down"
          ? closestSectionIndex + 1
          : closestSectionIndex - 1;
    }

    const targetKey = items[targetIndex]?.key;
    const targetSection = sectionRefs.current[targetKey];

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "auto", // Movimiento inmediato
      });
      setActiveCircle(targetKey || "");
    }
  };

  useEffect(() => {
    const onScroll = (event: WheelEvent) => {
      const delta = event.deltaY;

      // Detectar dirección del scroll
      const direction = delta > 0 ? "down" : "up";
      handleScroll(direction);

      event.preventDefault(); // Evitar scroll continuo
    };

    window.addEventListener("wheel", onScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", onScroll);
    };
  }, [items]);

  return (
    <div>
      <div
        className="left-0 w-full min-h-[100vh] top-0 flex flex-col justify-center items-center"
        style={{
          background:
            "radial-gradient(circle at center, rgba(32, 58, 223, 0.2) 10%, rgba(0, 0, 0, 0.85) 50%, black 100%)",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="section w-screen h-screen flex flex-col items-center justify-center"
            id={item.key}
            ref={setRef(item.key)}
          >
            <CardOFProduct
              title={item.title}
              price={item.price}
              currency={item.currency}
              Bg={item.Bg}
              description={item.description}
              before={item.before}
              order={item.order}
            />
          </div>
        ))}
      </div>
      <div
        className={`w-11 h-60 bg-[#E3DDCF] rounded-full fixed top-1/2 right-0 -translate-y-1/2 flex flex-col justify-evenly items-center ${styles.padreCircles}`}
        style={{ borderRadius: "20px 0 0 20px" }}
      >
        {items.map((item) => (
          <Link href={`#${item.key}`} key={item.key}>
            <div
              key={item.key}
              className={`rounded-full transition-all duration-500 ${
                activeCircle === item.key
                  ? "bg-black w-[1em] h-[1em]"
                  : "bg-[#707073] w-[.5em] h-[.5em]"
              }`}
            ></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContentList;
