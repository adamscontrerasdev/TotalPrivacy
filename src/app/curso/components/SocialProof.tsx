import React from "react";

interface Props {
  avatarsView?: number;
  text?: string;
}

export const SocialProof: React.FC<Props> = ({ avatarsView, text }) => {
  const avatars = new Array(avatarsView || 4).fill(
    "https://cdn-icons-png.flaticon.com/512/9187/9187532.png",
  );
  return (
    <div className="flex items-center space-x-3 ">
      <div className="flex -space-x-2">
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src}
            className="w-6 h-6 rounded-full bg-neutral-200 p-1"
          />
        ))}
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground">
        {text || "Texto de prueba"}
      </p>
    </div>
  );
};
