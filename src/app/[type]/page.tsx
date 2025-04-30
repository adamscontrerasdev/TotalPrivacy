"use client";
import React, { useState, useEffect, useRef, use } from "react";
import { notFound } from "next/navigation";
import data from "./../../../public/data/products.json";
import { CardOFProduct, StaticIsland } from "../Components";
import { useScrollBlock } from "../Elements/hooks/globalHooks/ScrollBlockContext";
import { Filters, Product } from "@/app/Elements";
import { useIsMobile } from "@/app/Elements/hooks";
import {
  ContentListProvider,
  useContentList,
} from "@/app/Elements/hooks/localHooks/ContentListContext";

const ContentList = ({ params }: { params: Promise<{ type: string }> }) => {
  return (
    <ContentListProvider>
      <ContentListInner params={params} />
    </ContentListProvider>
  );
};

const ContentListInner = ({
  params,
}: {
  params: Promise<{ type: string }>;
}) => {
  const { type } = use(params);
  const { scrollBlock } = useScrollBlock();
  const items = data[type as "cursos"];
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeCircle, setActiveCircle] = useState<string>(
    items ? items[0]?.key || "" : "",
  );
  const [scrolling, setScrolling] = useState(false);
  const lastTouchY = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const { filter } = useContentList(); // Ahora useContentList se usa dentro del proveedor.
  const filteredItems = filter
    ? items.filter((item: Product) => !item.proximamente)
    : items;

  if (!filteredItems) {
    notFound();
  }

  const setRef = (itemKey: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[itemKey] = el;
  };

  const handleScroll = (direction?: "up" | "down") => {
    if (scrolling) return;

    const currentScroll = window.scrollY;
    const closestSectionIndex = Math.round(currentScroll / window.innerHeight);

    let targetIndex = closestSectionIndex;
    if (direction) {
      targetIndex =
        direction === "down"
          ? closestSectionIndex + 1
          : closestSectionIndex - 1;
    }

    const targetKey = filteredItems[targetIndex]?.key;
    const targetSection = sectionRefs.current[targetKey];

    if (targetSection) {
      setScrolling(true);
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
      setActiveCircle(targetKey || "");
      window.history.replaceState(null, "", `#${targetKey}`);
      setTimeout(() => setScrolling(false), 800);
    }
  };

  useEffect(() => {
    if (scrollBlock) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  }, [scrollBlock]);

  let lastScrollDirection: "up" | "down" | null = null;

  const handleWheel = (event: WheelEvent) => {
    if (scrolling) {
      event.preventDefault();
      return;
    }

    const SCROLL_THRESHOLD = 30;
    const direction = event.deltaY > 0 ? "down" : "up";

    if (
      Math.abs(event.deltaY) > SCROLL_THRESHOLD &&
      direction !== lastScrollDirection
    ) {
      lastScrollDirection = direction;
      handleScroll(direction);
    }

    event.preventDefault();
  };

  const handleTouchStart = (event: TouchEvent) => {
    lastTouchY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (scrolling || lastTouchY.current === null) {
      event.preventDefault();
      return;
    }

    const currentTouchY = event.touches[0].clientY;
    const direction = currentTouchY < lastTouchY.current ? "down" : "up";
    handleScroll(direction);

    lastTouchY.current = currentTouchY;
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [filteredItems, scrolling]);

  useEffect(() => {
    const updateActiveCircleWithHash = () => {
      const currentHash = window.location.hash.slice(1);
      if (currentHash && currentHash !== activeCircle) {
        setActiveCircle(currentHash);
        const targetSection = sectionRefs.current[currentHash];
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth",
          });
        }
      }
    };

    window.addEventListener("hashchange", updateActiveCircleWithHash);

    return () => {
      window.removeEventListener("hashchange", updateActiveCircleWithHash);
    };
  }, [activeCircle]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        handleScroll("down");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handleScroll("up");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Se ejecuta cuando cambia `scrolling`

  return (
    <div>
      <div
        className="left-0 w-full min-h-[100vh] top-0 flex flex-col justify-center items-center"
        style={{
          background: "#000",
        }}
      >
        {!isMobile && <Filters />}

        {filteredItems.map((item: Product) => (
          <div
            key={item.id}
            className="section w-screen h-screen flex flex-col items-center justify-center relative"
            id={item.key}
            ref={setRef(item.key || "")}
          >
            <CardOFProduct product={item} key={item.id} />
          </div>
        ))}
      </div>
      <StaticIsland items={filteredItems} activeCircle={activeCircle} />{" "}
    </div>
  );
};

export default ContentList;
