"use client";
import { useState, useEffect } from "react";
import { Review, ReviewFormData, ReviewResponse } from "../types/review";
import { getReviewsByProductId, postReviewForProduct } from "@/api/services/review/review";

export const useReviews = (productId: string | number) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getReviewsByProductId(productId);
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Gagal memuat ulasan");
    } finally {
      setIsLoading(false);
    }
  };

  const postReview = async (reviewData: ReviewFormData): Promise<ReviewResponse> => {
    try {
      setIsSubmitting(true);
      setError(null);

      const newReview = await postReviewForProduct(reviewData);
      setReviews((prev) => [newReview, ...prev]);

      return {
        success: true,
        message: "Ulasan berhasil ditambahkan",
        data: newReview,
      };
    } catch (err: unknown) {
      console.log("Error: ", err)
      const message = "Gagal mengirim ulasan";
      setError(message);
      return {
        success: false,
        message,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return {
    reviews,
    isLoading,
    isSubmitting,
    error,
    postReview,
    refreshReviews: fetchReviews,
  };
};