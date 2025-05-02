"use client";
import React, { useEffect, useState } from "react";

// Función para generar nodos (puntos de conexión)
const generateNodes = (count: number, seed = 1) => {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    const hashValue = (seed * 9301 + i * 49297) % 233280;
    const pseudoRandom = hashValue / 233280;

    nodes.push({
      id: `node-${i}`,
      x: (pseudoRandom * 100) % 100,
      y: (((pseudoRandom * 500) % 100) + i) % 100,
      size: ((pseudoRandom * 3 + 1) % 4) + 1,
      delay: i * 0.6, // Para aparecer gradualmente
    });
  }
  return nodes;
};

// Función para generar líneas de circuito verticales
const generateCircuitLines = (count: number, seed = 2, startDelay = 0) => {
  const lines = [];
  for (let i = 0; i < count; i++) {
    const hashValue = (seed * 9301 + i * 49297) % 233280;
    const pseudoRandom = hashValue / 233280;

    // Distribución de posiciones para que no se amontonen
    const position = 10 + ((i * 16 + pseudoRandom * 10) % 80);
    const width = i % 3 === 0 ? 2 : 1;
    const opacity = ((pseudoRandom * 0.3 + 0.2) % 0.5) + 0.1;

    // Cada línea entra en momentos distintos
    const entryDelay = startDelay + i * 2;
    // Duración de la animación flowDown se mantiene en 8s
    const flowDelay = i * 3.5; // Espacio entre ciclos de la misma línea

    lines.push({
      id: `line-${seed}-${i}`,
      position,
      width,
      opacity,
      entryDelay,
      flowDelay,
      brightness: i % 2 === 0 ? "bright" : "dim",
    });
  }
  return lines;
};

export const SystemLine = () => {
  // Generar valores solo en el cliente
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const nodes = generateNodes(10);
  const primaryLines = generateCircuitLines(5, 2, 0);
  const secondaryLines = generateCircuitLines(5, 3, 1.5);
  const allLines = [...primaryLines, ...secondaryLines].slice(
    0,
    visibleLineCount,
  );
  const [isLoad, setIsLoad] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side mounting first
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only after mounting, handle the animation loading
  useEffect(() => {
    if (isMounted) {
      const timer = setTimeout(() => {
        setIsLoad(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  // Efecto para ir mostrando líneas progresivamente
  useEffect(() => {
    if (isLoad) {
      const maxLines = 10;
      let currentCount = 0;

      const interval = setInterval(() => {
        if (currentCount < maxLines) {
          setVisibleLineCount((prev) => {
            const newCount = prev + (Math.random() > 0.7 ? 2 : 1); // A veces aparecen de a 2
            return Math.min(newCount, maxLines);
          });
          currentCount += 1;
        } else {
          clearInterval(interval);
        }
      }, 800); // Intervalo entre apariciones de líneas

      return () => clearInterval(interval);
    }
  }, [isLoad]);

  return (
    <div
      className={`w-full max-w-80 md:max-w-xl overflow-hidden absolute -bottom-32 left-1/2 -translate-x-1/2 -z-10 ${
        isLoad ? "h-52" : "h-0"
      } transition-all duration-500 ease-in-out origin-top`}
    >
      {/* Fondo con efecto de brillo */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,100,255,0.05) 0%, rgba(0,0,0,1) 70%)",
        }}
      ></div>

      {/* Líneas de circuito verticales - aparecen progresivamente */}
      <div className="absolute inset-0">
        {allLines.map((line) => {
          const isBright = line.brightness === "bright";
          return (
            <span
              key={line.id}
              className={`absolute transition-opacity duration-1000 ease-in`}
              style={{
                left: `${line.position}%`,
                top: "0",
                width: `${line.width}px`,
                height: "100%",
                opacity: isBright ? 0 : 0,
                background:
                  "linear-gradient(to bottom, #00f, #00f, transparent)",
                animation: "flowDown 8s linear infinite",
                animationDelay: `${line.flowDelay}s`,
                boxShadow: isBright
                  ? "0 0 8px rgba(0, 255, 255, 0.8)"
                  : "0 0 4px rgba(0, 255, 255, 0.4)",
                transitionDelay: `${line.entryDelay * 0.1}s`,
              }}
            />
          );
        })}
      </div>

      {/* Nodos de circuito (puntos de conexión) - ahora aparecen con retraso */}
      <div className="absolute inset-0">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute rounded-full bg-[#00f] animate-pulse transition-opacity duration-700 ease-in"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
              boxShadow: "0 0 8px rgba(0, 255, 255, 0.8)",
              animationDuration: `${1 + (node.id.charCodeAt(0) % 2)}s`,
              opacity: visibleLineCount > 5 ? 1 : 0, // Los nodos aparecen después de algunas líneas
              transitionDelay: `${node.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Pulsos brillantes que se mueven por las líneas - solo visibles cuando hay suficientes líneas */}
      {visibleLineCount >= 4 && (
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in"
          style={{ opacity: visibleLineCount >= 6 ? 1 : 0.5 }}
        >
          {[...Array(4)].map((_, i) => {
            const delay = i * 2.2; // Más separación entre pulsos
            const left = 10 + ((i * 20) % 80); // Posición alineada con algunas líneas

            return (
              <span
                key={`p-${i}`}
                className="absolute"
                style={{
                  left: `${left}%`,
                  width: `${i % 2 === 0 ? 3 : 2}px`,
                  height: "20px",
                  opacity: 0.9,
                  background: "#f00",
                  boxShadow: "0 0 12px #00ffff, 0 0 24px #00ffff",
                  animation: "flowDown 8s linear infinite",
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Efecto de scanlines */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 0px, rgba(0, 255, 255, 0.05) 1px, transparent 1px, transparent 2px)",
            pointerEvents: "none",
            animation: "flickerScanlines 3s infinite",
          }}
        ></div>
      </div>

      {/* Efecto de parpadeo general */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          animation: "flicker 8s infinite",
          background:
            "radial-gradient(ellipse at center, rgba(0, 150, 255, 0.1) 0%, transparent 70%)",
        }}
      ></div>

      {/* Oscurecimiento de bordes para mejor transición */}
      <div
        className="w-full h-full absolute top-0 left-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, #000 70%)",
        }}
      ></div>
    </div>
  );
};
