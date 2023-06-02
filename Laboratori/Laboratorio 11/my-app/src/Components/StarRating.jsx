import { useState } from 'react';

function StarRating() {
  const [rating, setRating] = useState(2);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'selected' : ''}`}
          onClick={() => handleRatingClick(star)}
        >
          &#9733;
        </span>
      ))}
      <p>Rating: {rating} out of 5</p>
    </div>
  );
}

export default StarRating;
