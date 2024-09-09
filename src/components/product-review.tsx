import React from "react";
import Rating from "./rating";
import Avatar from "./avatar";

export default function ProductReview() {
  return (
    <blockquote className="rounded-lg p-5 shadow-lg border border-gray-300 sm:p-5">
      <div className="flex items-center gap-4">
        <Avatar src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80" />

        <div>
          <p className="mt-0.5 text-lg font-medium text-gray-900">Paul Starr</p>
          <Rating value={5} />
        </div>
      </div>

      <p className="mt-4 text-gray-700">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit
        rerum incidunt, a consequuntur recusandae ab saepe illo est quia
        obcaecati neque quibusdam eius accusamus error officiis atque voluptates
        magnam!
      </p>
    </blockquote>
  );
}
