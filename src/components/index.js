import React, { useState, useEffect } from "react";

function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/posts") // Change this endpoint to match your json-server setup
      .then((response) => response.json())
      .then((data) => {
        // Assuming data contains an array of posts with "image" property
        setImages(data.map((post) => post.image));
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      <div className="image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/uploads/${image}`}
            alt={`Image ${index}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
