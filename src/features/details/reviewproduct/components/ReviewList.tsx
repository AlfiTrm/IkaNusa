"use client";
import React from "react";
import { MessageCircle } from "lucide-react";
import ReviewItem from "./ReviewItem";
import { Review } from "../types/review";

interface ReviewsListProps {
  reviews: Review[];
  isLoading?: boolean;
}

const ReviewsList: React.FC<ReviewsListProps> = ({
  reviews,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="mx-auto mb-4 text-gray-300" size={64} />
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          Belum ada ulasan
        </h3>
        <p className="text-gray-500">
          Jadilah yang pertama memberikan ulasan untuk produk ini
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewsList;
