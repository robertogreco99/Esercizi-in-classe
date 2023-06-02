import React from 'react';

const FilmRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<i className="fa fa-star" />);
  }
  for (let i = rating; i < 5; i++) {
    stars.push(<i className="fa fa-star-o" />);
  }
  return <div>{stars}</div>;
};

export default FilmRating;
