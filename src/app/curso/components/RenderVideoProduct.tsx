import React from "react";

interface Props {
  video: string; // Este será el ID del video, no el URL completo
}

export const RenderVideoProduct: React.FC<Props> = ({ video }) => {
  return (
    <div className="w-full aspect-video max-w-2xl rounded-2xl overflow-hidden">
      {video && video !== "" ? (
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            src={`https://iframe.mediadelivery.net/embed/411945/${video}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`}
            loading="lazy"
            style={{
              border: "0",
              position: "absolute",
              top: "0",
              left: "0",
              height: "100%",
              width: "100%",
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="w-full h-full bg-neutral-800 animate-pulse" />
      )}
    </div>
  );
};
