import React from "react";
import StarRatings from "react-star-ratings";

export default function Rating({ value }: { value: number }) {
  return (
    <StarRatings
      rating={value}
      starRatedColor="#FF492B"
      numberOfStars={5}
      starSpacing="0px"
      starDimension="15px"
    />
  );
}
