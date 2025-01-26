import React, { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import { FaSpinner } from 'react-icons/fa';

const importAll = (requireContext) =>
  requireContext.keys().map((key) => requireContext(key));

const mediaFiles = importAll(
  require.context('../assets/media', false, /\.(png|jpe?g|gif|mp4|webm)$/i)
);

mediaFiles.sort(() => Math.random() - 0.5);

const altPhrases = [
  "Snowfall in New Orleans",
  "New Orleans Snowfall",
  "Lots of Snow in New Orleans",
  "Rare Snow Event in New Orleans",
  "Snow in New Orleans",
];

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  const imageFiles = mediaFiles.filter((file) => /\.(jpe?g|png|gif)$/i.test(file));

  useEffect(() => {
    let loadedCount = 0;
    const totalFiles = imageFiles.length;

    const checkAllFilesLoaded = () => {
      if (loadedCount === totalFiles) {
        setIsLoading(false);
      }
    };

    imageFiles.forEach((file) => {
      const filePath = typeof file === 'object' && file.default ? file.default : file;
      const img = new Image();
      img.src = filePath;
      img.onload = img.onerror = () => {
        loadedCount++;
        checkAllFilesLoaded();
      };
    });

    if (totalFiles === 0) {
      setIsLoading(false);
    }
  }, []);

  const getVideoThumbnail = (videoPath) => {
    return `${videoPath}#t=0.5`;
  };

  return (
    <div className="container">
      {isLoading && (
        <div className="loading-spinner">
          <FaSpinner className="spinner-icon" />
        </div>
      )}

      {!isLoading && (
        <div className="gallery">
          {mediaFiles.map((file, index) => {
            const filePath = typeof file === 'object' && file.default ? file.default : file;

            return (
              <div key={index} className="gallery-item">
                {/\.(mp4|webm)$/i.test(filePath) ? (
                  <video
                    src={filePath}
                    className="thumbnail"
                    onClick={() => setLightboxIndex(-1)}
                    controls={true}
                    preload="auto"
                    poster={getVideoThumbnail(filePath)}
                    onLoadedMetadata={(e) => {
                      e.target.currentTime = 0;
                    }}
                    type="video/mp4"
                  />
                ) : (
                  <img
                    src={filePath}
                    alt={altPhrases[Math.floor(Math.random() * altPhrases.length)]}
                    className="thumbnail"
                    onClick={() => {
                      const imageIndex = imageFiles.findIndex((imageFile) => imageFile === file);
                      setLightboxIndex(imageIndex);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {lightboxIndex >= 0 && (
        <Lightbox
          slides={imageFiles.map((file) => {
            const filePath = typeof file === 'object' && file.default ? file.default : file;
            return { src: filePath, type: 'image' };
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
