import "./ProductGallery.css";
import { useState } from "react";

const ProductGallery = ({ product }) => {
  const images = product.gallery?.length ? product.gallery : [product.image];
  const [selectedImage, setSelectedImage] = useState(
    product.gallery?.[0] || product.image
  );

  return (
    <div className="product-gallery">
      <div className="gallery-thumbnails">
        {images.map((img, index) => (
          <div
            key={index}
            className={`thumbnail ${
              selectedImage === img ? "active" : ""
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <img src={img} alt="" />
          </div>
        ))}

      </div>
      <div className="gallery-main">
        <img
          src={selectedImage}
          alt="Product"
        />
      </div>
    </div>
  );
};

export default ProductGallery;