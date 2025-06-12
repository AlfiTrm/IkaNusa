"use client";
import React from "react";
import { MessageCircle, Clock } from "lucide-react";
import { Review } from "../types/review";

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  
  const getUserInitial = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-white border border-netral-100 rounded-xl p-6 hover:shadow-sm transition-shadow">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-blu-350 rounded-full flex items-center justify-center text-white font-semibold ">
          {getUserInitial(review.username)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 truncate">
              {review.username}
            </h3>
          </div>
          
          <p className="text-netral-200 w-full max-h-40 overflow-auto">
            {review.review_content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
