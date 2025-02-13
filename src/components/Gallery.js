import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const importAll = (requireContext) =>
  requireContext.keys().map((key) => ({
    path: requireContext(key),
    name: key.replace(/\..+$/, "").replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()
  }));

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
  "Heavy Snow Covers the Streets",
  "A Blanket of Snow Over the City",
  "Snowstorm Sweeps Through Downtown",
  "Winter Wonderland in the South",
  "Unexpected Snowfall Amazes Residents"
];

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const totalFiles = mediaFiles.length;

  useEffect(() => {
    if (loadedCount >= totalFiles) {
      setLoading(false);
    }
  }, [loadedCount, totalFiles]);

  const imageFiles = mediaFiles.filter((file) =>
    /\.(jpe?g|png|gif)$/i.test(file.path)
  );

  const getVideoThumbnail = (videoPath) => `${videoPath}#t=0.5`;

  return (
    <div className="container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="gallery" style={{ visibility: loading ? "hidden" : "visible" }}>
        {mediaFiles.map((file, index) => {
          const filePath = file.path.default ? file.path.default : file.path;
          const isImage = /\.(jpe?g)$/i.test(filePath);
          const isVideo = /\.(mp4)$/i.test(filePath);
          const altText = altPhrases[index % altPhrases.length];
          const seoFilename = altText.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase() + ".jpg";

          return (
            <div key={index} className="gallery-item">
              {isImage ? (
                <img
                  src={filePath}
                  alt={altText}
                  data-filename={seoFilename}
                  className="thumbnail"
                  onClick={() => {
                    const imageIndex = imageFiles.findIndex(
                      (imageFile) => imageFile.path === file.path
                    );
                    setLightboxIndex(imageIndex);
                  }}
                  onLoad={() => setLoadedCount((prev) => prev + 1)}
                />
              ) : isVideo ? (
                <video
                  src={filePath}
                  className="thumbnail"
                  poster={getVideoThumbnail(filePath)}
                  controls
                  preload="auto"
                  onLoadedMetadata={(e) => {
                    e.target.currentTime = 0;
                    setLoadedCount((prev) => prev + 1);
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
          slides={imageFiles.map((file) => ({
            src: file.path.default ? file.path.default : file.path,
            type: "image"
          }))}
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
        />
      )}
      <style>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(0, 0, 0, 0.3);
          border-top: 5px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
