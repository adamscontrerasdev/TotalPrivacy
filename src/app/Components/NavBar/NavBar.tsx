"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from "./NavBar.module.css";
import { CursoOfTheNavBar } from "./../../Elements/index";
import { useIsMobile } from "@/app/Elements/hooks";
import { GoHomeFill } from "react-icons/go";
import { usePathname } from "next/navigation";
import { useBrowserMode } from "@/app/Elements/hooks/globalHooks/BrowserModeContext";

export const NavBar = () => {
  const [isHover, setIsHover] = useState(false);
  const [whoIsHover, setWhoIsHover] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isContentHover, setIsContentHover] = useState(false);
  const [isLinkHover, setIsLinkHover] = useState(false);
  const isMobile = useIsMobile();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const path = usePathname();
  const isNotDashboard: boolean = path !== "/Dashboard";
  const { setBrowserMode } = useBrowserMode();
  const [os, setOS] = useState<string | null>(null); // Estado para almacenar el OS

  const handleBrowserMode = () => {
    setBrowserMode(true);
  };

  const handleMobileClick = (who: string) => {
    if (whoIsHover === who) {
      setIsHover(false);
      setIsVisible(true);
      setIsLinkHover(false);
      setTimeout(() => {
        setWhoIsHover("");
      }, 500);
    } else {
      setIsLinkHover(true);
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      setIsHover(true);
      setWhoIsHover(who);
      setIsVisible(true);
    }
  };

  const handleDesktopMouseEnter = (who: string) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    setIsLinkHover(true);
    setIsHover(true);
    setWhoIsHover(who);
    setIsVisible(true);
  };

  const handleDesktopMouseLeave = () => {
    setIsLinkHover(false);
    if (!isContentHover && !isLinkHover) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setIsHover(false);
        setWhoIsHover("");
      }, 500);
    }
  };

  const handleContentMouseEnter = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    setIsContentHover(true);
    setIsHover(true);
  };

  const handleContentMouseLeave = () => {
    setIsContentHover(false);
    setIsHover(false);
    setWhoIsHover("");
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const platform = navigator.userAgent.toLowerCase();
      if (platform.includes("win")) {
        setOS("Windows");
      } else if (platform.includes("mac")) {
        setOS("MacOS");
      } else {
        setOS("Otro");
      }
    }
  }, []);

  return isNotDashboard ? (
    <div
      className={` bg-opacity-60 backdrop-blur-3xl backdrop-brightness-75 ${
        isHover ? (isMobile ? "h-[100%]" : "h-36") : "h-20"
      } w-full text-text flex flex-col items-center justify-between overflow-hidden fixed top-0 left-0 z-[999999] transition-all duration-500 `}
      style={{
        background: "linear-gradient(to bottom, #000, transparent )",
        borderRadius: "0 0 20px 20px",
      }}
    >
      <div
        className={`w-full h-20 md:h-12 absolute top-0 md:top-1/2 md:-translate-y-1/2 left-0 flex items-center px-10 justify-between`}
      >
        <Link
          href={"/"}
          className={`transition-all duration-1000 opacity-0 md:opacity-100 ${
            path !== "/" ? "opacity-100" : ""
          }`}
        >
          {isMobile ? (
            <GoHomeFill className="fill-white text-2xl" />
          ) : (
            <h1 className={`${styles.title} text-xs`}>TOTAL PRIVACY</h1>
          )}
        </Link>
        <div
          className={`flex items-center gap-2 cursor-pointer ${!isMobile ? "border-[1px] border-gray-500" : ""} p-2 rounded-full`}
          onClick={handleBrowserMode}
        >
          <FaMagnifyingGlass />
          {!isMobile && (
            <p className="text-xs">{os === "Windows" ? "CTRL + B" : "⌘ + B"}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-around font-medium h-20 z-20 gap-5">
        {isMobile ? (
          <>
            <div
              onClick={() => handleMobileClick("Cursos")}
              className="relative"
            >
              Cursos
              <div
                className={`${
                  whoIsHover === "Cursos" ? "w-full" : "w-0"
                } h-[1px] bg-foreground bottom-0 left-0 absolute transition-all duration-200 shadow-[0_0_10px_theme(colors.foreground),0_0_20px_theme(colors.foreground)]`}
              ></div>
            </div>
            <Link
              href={"/partners"}
              className="text-md relative px-2 text-white"
            >
              Partners
              <div className="absolute -top-2 -right-2 bg-red-600 text-[.5rem] text-white px-1 py-0.5 rounded-full animate-pulse">
                Nuevo
              </div>
            </Link>
          </>
        ) : (
          <>
            <div
              onMouseEnter={() => handleDesktopMouseEnter("Cursos")}
              onMouseLeave={handleDesktopMouseLeave}
              className="text-md relative px-2"
            >
              Cursos
              <div
                className={`${
                  whoIsHover === "Cursos" ? "w-full" : "w-0"
                } h-[1px] bg-foreground bottom-0 left-0 absolute transition-all duration-200 shadow-[0_0_10px_theme(colors.foreground),0_0_20px_theme(colors.foreground)]`}
              ></div>
            </div>
            <Link
              href={"/partners"}
              className="text-md relative px-2 text-nowrap text-white"
            >
              Total Privacy Partners
              <div className="absolute -top-2 -right-2 bg-red-600 text-[.5rem] text-white px-1 py-0.5 rounded-full animate-pulse">
                Nuevo
              </div>
            </Link>
          </>
        )}
      </div>

      <div
        className={`flex flex-row items-center justify-around w-full ${
          isMobile ? "h-full" : "h-24"
        } font-medium absolute top-12`}
      >
        {isVisible && whoIsHover === "Cursos" && (
          <div
            onMouseEnter={handleContentMouseEnter}
            onMouseLeave={handleContentMouseLeave}
            className={`w-full transition-all duration-500 ease-in-out absolute top-0 flex justify-center items-center bg-transparent ${
              isHover ? "h-full opacity-100" : "h-0"
            }`}
          >
            <CursoOfTheNavBar
              isVisible={isHover}
              duration={500}
              closeMenu={() => handleMobileClick("Cursos")}
            />
          </div>
        )}
      </div>
    </div>
  ) : null;
};
