import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({
  rating = 0,
  setRating = () => {},
  readOnly = false,
  size = 22,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div
      className="star-rating-container"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        cursor: readOnly ? "default" : "pointer",
      }}
    >
      {[1, 2, 3, 4, 5].map((starValue) => {
        const isFilled =
          starValue <= (hoverRating > 0 ? hoverRating : rating);

        return (
          <button
            key={starValue}
            type="button"
            disabled={readOnly}
            aria-label={`Rate ${starValue} stars`}
            onClick={() => !readOnly && setRating(starValue)}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            style={{
              background: "none",
              border: "none",
              padding: "2px",
              margin: 0,
              cursor: readOnly ? "default" : "pointer",
              color: isFilled ? "#D4A04B" : "#E5D8DC",
              transition: "color 0.2s ease, transform 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaStar
              size={size}
              style={{
                transform: !readOnly && hoverRating === starValue ? "scale(1.15)" : "scale(1)",
                filter: isFilled ? "drop-shadow(0 2px 4px rgba(212, 160, 75, 0.3))" : "none",
              }}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
