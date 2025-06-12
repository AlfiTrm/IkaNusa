import core from "@/api/core/core";
import { Review, ReviewFormData } from "@/features/details/reviewproduct/types/review";

export const getReviewsByProductId = async (productId: string | number): Promise<Review[]> => {
  const token = localStorage.getItem("token");
  const response = await core.get(`/users/review/${productId}`, {
      headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data.data)
  return response.data.data || [];
};

export const postReviewForProduct = async (reviewData: ReviewFormData): Promise<Review> => {
  const token = localStorage.getItem("token");
  const response = await core.post(
    "/users/review",
    {
      review_content: reviewData.review_content,
      product_id: reviewData.product_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};
