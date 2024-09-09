import Comment from "@/components/comment";
import TabInfoContainer from "@/components/tab-info-container";
import React from "react";

export default function Review() {
  return (
    <div>
      <TabInfoContainer title="Reviews">
        <div className="space-y-8">
          <Comment />
          <Comment />
          <Comment />
        </div>
      </TabInfoContainer>
    </div>
  );
}
