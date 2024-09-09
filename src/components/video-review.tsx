import React from "react";
import { Typography } from "./ui/typography";
import Rating from "./rating";

export default function VideoReview() {
  return (
    <div className="h-[300px] flex flex-col shadow-lg border border-gray-400 rounded">
      <div className="w-full bg-card-header p-1 px-3 border-b border-gray-400">
        <Typography variant="paragraph" size="sm">
          Review by <span className="font-semibold">Rashmi T</span>.
        </Typography>
      </div>

      <div className="flex-1">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/jNQXAC9IVRw?si=KTUbABNG5idHrVqa"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div className="p-1 px-3 pb-2">
        <Typography>Trello Review</Typography>
        <Rating value={4.5} />
      </div>
    </div>
  );
}
