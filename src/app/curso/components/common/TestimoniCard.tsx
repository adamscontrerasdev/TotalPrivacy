import React from "react";

export const SuccessCases: React.FC<{
  title: string;
  img: string;
  description: string;
}> = ({ title, img, description }) => {
  if (!title || !description) {
    return null;
  } else {
    return (
      <div className="w-80 min-h-52 bg-neutral-900 rounded-3xl p-3 flex flex-col items-center justify-center gap-2 min-w-80">
        <div className=" flex w-full h-1/4 text-white gap-2 items-center justify-start font-bold">
          <div
            className={`w-10 aspect-square rounded-full bg-stone-600 overflow-hidden ${img ? "" : "animate-pulse"}`}
          >
            {img && (
              <img
                src={img}
                alt="User"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <h2
            className={`text-white rounded-3xl ${title ? "" : "bg-stone-600 animate-pulse min-w-52 min-h-7"}`}
          >
            {title}
          </h2>
        </div>
        <div className="w-full h-full text-left">
          <p
            className={`rounded-3xl ${description ? "" : "bg-stone-600 animate-pulse min-w-52 min-h-full"}`}
          >
            {description}
          </p>
        </div>
      </div>
    );
  }
};
