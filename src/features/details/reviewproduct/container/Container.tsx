"use client";
import React from "react";
import { AlertCircle } from "lucide-react";
import { useReviews } from "../hooks/useReviews";
import ReviewForm from "../components/ReviewForm";
import ReviewsList from "../components/ReviewList";

interface ReviewContainerProps {
  productId: string | number;
}

const ReviewContainer: React.FC<ReviewContainerProps> = ({ productId }) => {
  const { reviews, isLoading, isSubmitting, error, postReview } =
    useReviews(productId);

  const handleSubmitReview = async (reviewContent: string) => {
    return await postReview({
      review_content: reviewContent,
      product_id: Number(productId),
    });
  };

  return (
    <section className="mycontainer mt-10 border-t border-netral-150 pt-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-netral-250 mb-2">
          Ulasan Pembeli
        </h2>
        <p className="text-gray-600">
          {reviews.length > 0
            ? `${reviews.length} ulasan`
            : "Belum ada ulasan untuk produk ini"}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <ReviewForm
        productId={productId}
        onSubmit={handleSubmitReview}
        isSubmitting={isSubmitting}
      />

      <ReviewsList reviews={reviews} isLoading={isLoading} />
    </section>
  );
};

export default ReviewContainer;
