import React, { useState, useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const importAll = (requireContext) =>
  requireContext.keys().map((key) => requireContext(key));

const mediaFiles = importAll(
  require.context("../assets/media", false, /\.(jpe?g|mp4)$/i)
);

mediaFiles.sort(() => Math.random() - 0.5);

const altPhrases = [
  "Snowfall in New Orleans",
  "New Orleans Snowfall",
  "Lots of Snow in New Orleans",
  "Rare Snow Event in New Orleans",
  "Snow in New Orleans",
];

const getRandomBorderRadius = () => {
  const randomValue = () => (Math.random() < 0.5 ? "0" : "35px");
  return {
    borderTopLeftRadius: randomValue(),
    borderTopRightRadius: randomValue(),
    borderBottomRightRadius: randomValue(),
    borderBottomLeftRadius: randomValue(),
  };
};

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const imageFiles = mediaFiles.filter((file) =>
    /\.(jpe?g|png|gif)$/i.test(file)
  );

  const videoFiles = mediaFiles.filter((file) =>
    /\.(mp4|webm)$/i.test(file)
  );

  const borderRadii = useMemo(
    () => mediaFiles.map(() => getRandomBorderRadius()),
    []
  );

  const getVideoThumbnail = (videoPath) => `${videoPath}#t=0.5`;

  return (

    <div className="container">

      <div className="gallery">

        {mediaFiles.map((file, index) => {

          const filePath =
            typeof file === "object" && file.default ? file.default : file;

          const isImage = /\.(jpe?g)$/i.test(filePath);
          const isVideo = /\.(mp4)$/i.test(filePath);

          return (

            <div key={index} className="gallery-item">
              {isImage ? (
                <img
                  src={filePath}
                  alt={
                    altPhrases[Math.floor(Math.random() * altPhrases.length)]
                  }
                  className="thumbnail"
                  style={borderRadii[index]}
                  onClick={() => {
                    const imageIndex = imageFiles.findIndex(
                      (imageFile) => imageFile === file
                    );
                    setLightboxIndex(imageIndex);
                  }}
                />
              ) : isVideo ? (
                <video
                  src={filePath}
                  className="thumbnail"
                  poster={getVideoThumbnail(filePath)}
                  controls
                  preload="auto"
                  style={borderRadii[index]}
                  onLoadedMetadata={(e) => {
                    e.target.currentTime = 0;
                  }}
                  onClick={() => setLightboxIndex(-1)}
                />
              ) : null}
            </div>
          );

        })}

      </div>

      {lightboxIndex >= 0 && (
        <Lightbox
          slides={imageFiles.map((file) => {
            const filePath =
              typeof file === "object" && file.default ? file.default : file;
            return { src: filePath, type: "image" };
          })}
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
        />
      )}

    </div>

  );

};

export default Gallery;
