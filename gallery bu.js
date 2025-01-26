import React, { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import { FaSpinner } from 'react-icons/fa'; // Importing the spinner icon

// Import all media files dynamically
const importAll = (requireContext) =>
  requireContext.keys().map((key) => requireContext(key));

// Import both images and videos
const mediaFiles = importAll(
  require.context('../assets/media', false, /\.(png|jpe?g|gif|mp4|webm)$/i)
);

// Shuffle the mediaFiles array to randomize the order
mediaFiles.sort(() => Math.random() - 0.5);

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  // Filter images (for lightbox and thumbnails)
  const imageFiles = mediaFiles.filter((file) => /\.(jpe?g|png|gif)$/i.test(file));

  // Preload all images when the component mounts
  useEffect(() => {
    let loadedCount = 0;
    const totalFiles = imageFiles.length;

    const checkAllFilesLoaded = () => {
      if (loadedCount === totalFiles) {
        setIsLoading(false); // Set loading to false when all files are loaded
      }
    };

    // Preload images
    imageFiles.forEach((file) => {
      const filePath = typeof file === 'object' && file.default ? file.default : file;
      const img = new Image();
      img.src = filePath;
      img.onload = img.onerror = () => {
        loadedCount++;
        checkAllFilesLoaded(); // Check if all files are loaded
      };
    });

    // If no image files, set loading to false immediately
    if (totalFiles === 0) {
      setIsLoading(false);
    }
  }, []);

  const getVideoThumbnail = (videoPath) => {
    return `${videoPath}#t=0.5`; // Generate a thumbnail at the 0.5 second mark for the video
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
                {/* Render videos as thumbnails */}
                {/\.(mp4|webm)$/i.test(filePath) ? (
                  <video
                    src={filePath}
                    className="thumbnail"
                    onClick={() => setLightboxIndex(-1)} // No lightbox for videos
                    controls={true} // Include controls for video
                    preload="auto"  // Preload video automatically
                    poster={getVideoThumbnail(filePath)} // Set the poster for the video thumbnail
                    onLoadedMetadata={(e) => {
                      e.target.currentTime = 0; // Ensure we capture the first frame for poster
                    }}
                    type="video/mp4"
                  />
                ) : (
                  // Render images
                  <img
                    src={filePath}
                    alt={`Media ${index}`}
                    className="thumbnail"
                    onClick={() => {
                      const imageIndex = imageFiles.findIndex((imageFile) => imageFile === file);
                      setLightboxIndex(imageIndex); // Set lightbox index to the correct image
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox for full-size media (only images) */}
      {lightboxIndex >= 0 && (
        <Lightbox
          slides={imageFiles.map((file) => {
            const filePath = typeof file === 'object' && file.default ? file.default : file;
            return { src: filePath, type: 'image' }; // For images
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
