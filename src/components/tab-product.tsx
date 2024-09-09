import { TabProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StarRatings from "react-star-ratings";

export default function TabProduct({ title, rating, image }: TabProductType) {
  return (
    <Link href={`/banks/${title}`}>    
    <div className="basis-1/2 md:basis-1/2 lg:basis-1/3 cursor-pointer hover:transform hover:-translate-y-2 transition-all">
      <div className="flex flex-col border border-gray-400 p-2 lg:p-4 rounded-md">
        <h3 className="text-left font-medium">{title}</h3>
        <div className="flex items-start ">
          <StarRatings
            rating={4.5}
            starRatedColor="#FF492B"
            numberOfStars={5}
            starSpacing="0px"
            starDimension="20px"
          />
          <span className="text-xs mx-1">({rating})</span>
        </div>

        <Image
          src={image}
          alt={title}
          width={50}
          height={50}
          className="mx-auto my-2 py-5"
        />
      </div>
    </div>
    </Link>
  );
}
