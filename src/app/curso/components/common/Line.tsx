import React from "react";

interface Props {
  color?: string;
}

export const Line: React.FC<Props> = ({ color }) => {
  return (
    <div
      className={`w-full h-0.5 max-w-7xl`}
      style={{
        background: `linear-gradient(to right,transparent, ${color}, transparent)`,
      }}
    />
  );
};
