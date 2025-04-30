"use client";
import React, { useState, useEffect, useRef } from "react";
import { useBrowserMode } from "@/app/Elements/hooks/globalHooks/BrowserModeContext";
import { usePathname } from "next/navigation";
import { useScrollBlock } from "@/app/Elements/hooks/globalHooks/ScrollBlockContext";

const data = {
  cursos: [
    { id: 8, key: "grapheneos", title: "Curso GrapheneOS", category: "Curso" },
    {
      id: 6,
      key: "Blinda-iphone",
      title: "Blinda tu iPhone",
      category: "Curso",
    },
    {
      id: 9,
      key: "Blinda-mac",
      title: "Curso Privacidad MacOS",
      category: "Curso",
    },
    {
      id: 10,
      key: "Blinda-windows",
      title: "Curso Privacidad Windows",
      category: "Curso",
    },
    {
      id: 7,
      key: "Blinda-android",
      title: "Blinda tu Android",
      category: "Curso",
    },
    {
      id: 11,
      key: "bitcoin",
      title: "Iniciación a Bitcoin",
      category: "Curso",
    },
  ],
};

const searchList = [
  ...data.cursos.map((curso) => ({
    name: curso.title,
    path: `/cursos#${curso.key}`,
    category: curso.category,
  })),
];

export const BrowserComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { browserMode, setBrowserMode } = useBrowserMode();
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState<
    { name: string; path: string; category: string }[]
  >([]);
  const pathname = usePathname();
  const { setScrollBlock } = useScrollBlock();

  useEffect(() => {
    if (browserMode) {
      document.body.style.overflow = "hidden";
      setScrollBlock(true);
    } else {
      document.body.style.overflow = "";
      setScrollBlock(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [browserMode, setScrollBlock]);

  const fetchRecentSearches = () => {
    const storedSearches = localStorage.getItem("recentSearches");
    setRecentSearches(storedSearches ? JSON.parse(storedSearches) : []);
  };

  useEffect(() => {
    fetchRecentSearches();
    window.addEventListener("localStorageUpdated", fetchRecentSearches);
    return () =>
      window.removeEventListener("localStorageUpdated", fetchRecentSearches);
  }, []);

  const updateLocalStorage = (key: string, value: object) => {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  const handleSelectResult = (item: {
    name: string;
    path: string;
    category: string;
  }) => {
    window.location.href = item.path;
    setBrowserMode(false);
    setRecentSearches((prev) => {
      const updatedSearches = [
        item,
        ...prev.filter((s) => s.path !== item.path),
      ].slice(0, 5);
      updateLocalStorage("recentSearches", updatedSearches);
      return updatedSearches;
    });
  };

  useEffect(() => {
    setBrowserMode(false);
  }, [pathname, setBrowserMode]);

  const clearLocalStorage = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  const filteredResults = searchList.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (browserMode) {
      document.body.style.overflow = "hidden";
      setScrollBlock(true);
      setSearch(""); // Borra el texto del input
      setTimeout(() => inputRef.current?.focus(), 50); // Hace focus al input
    } else {
      document.body.style.overflow = "";
      setScrollBlock(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [browserMode, setScrollBlock]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey && event.key === "b") || // Windows/Linux (CTRL + B)
        (event.metaKey && event.key === "b") // Mac (CMD + B)
      ) {
        event.preventDefault();
        setBrowserMode(true); // Aquí puedes ejecutar la función que desees
      } else if (event.key === "Escape") {
        setBrowserMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 transition-all duration-300 z-[999999]"
      style={{
        pointerEvents: browserMode ? "auto" : "none",
        backdropFilter: browserMode ? "blur(10px)" : "blur(0px)",
      }}
      onClick={() => setBrowserMode(false)}
    >
      <div
        className="w-[80%] lg:w-1/2 h-3/4 bg-gray-950 rounded-xl shadow-lg overflow-hidden border-gray-600 border-[1px] relative transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
        style={{
          scale: browserMode ? 1 : 0,
          opacity: browserMode ? 1 : 0,
        }}
      >
        <div className="w-full bg-gray-950 h-20 flex items-center p-4 border-b-[1px] border-gray-600">
          <input
            type="search"
            className="w-full h-full p-2 bg-transparent border-[1px] border-none text-2xl text-white capitalize focus:outline-none "
            placeholder="Buscar curso o ebook..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            ref={inputRef}
          />
        </div>
        {!search && recentSearches.length === 0 && (
          <div className="text-white text-center mt-4">
            Escribe en el buscador para comenzar
          </div>
        )}

        {!search && recentSearches.length > 0 && (
          <div className="p-4">
            <h3 className="text-gray-400 text-lg mb-2">Búsquedas recientes</h3>
            {recentSearches.map((item, index) => (
              <div
                key={index}
                className="w-full min-h-20 bg-black rounded-xl text-white text-xl cursor-pointer p-5 hover:bg-slate-900 transition-all duration-300"
                onClick={() => handleSelectResult(item)}
              >
                <h2 className="font-bold">{item.name}</h2>
                <h2
                  className={
                    item.category === "Curso"
                      ? "text-yellow-400"
                      : "text-primary"
                  }
                >
                  {item.category}
                </h2>
              </div>
            ))}
          </div>
        )}

        {search && (
          <div className="p-4 overflow-y-auto w-full h-[calc(100%-5rem)] flex flex-col gap-4">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, index) => (
                <div
                  key={index}
                  className="w-full min-h-20 bg-black rounded-xl text-white text-xl cursor-pointer p-5 hover:bg-slate-900 transition-all duration-300"
                  onClick={() => handleSelectResult(item)}
                >
                  <h2 className="font-bold">{item.name}</h2>
                  <h2
                    className={
                      item.category === "Curso"
                        ? "text-yellow-400"
                        : "text-primary"
                    }
                  >
                    {item.category}
                  </h2>
                </div>
              ))
            ) : (
              <div className="text-white text-center mt-4">
                No se encontraron resultados
              </div>
            )}
          </div>
        )}

        <div className="w-full h-20 absolute bottom-0 flex justify-end items-center px-10 transition-all duration-300">
          <button
            className="border-red-600 text-red-600 border-[1px] rounded-full px-5  py-2 hover:border-transparent hover:text-white hover:bg-red-600 transition-all duration-300"
            onClick={clearLocalStorage}
            style={{
              opacity: recentSearches.length > 0 ? 1 : 0,
              scale: recentSearches.length > 0 ? 1 : 0,
            }}
          >
            Borrar historial
          </button>
        </div>
      </div>
    </div>
  );
};
