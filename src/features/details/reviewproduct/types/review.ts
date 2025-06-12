export interface Review {
  id: number;
  username: string;
  user_id?: string;
  review_content: string;
  createdAt: string;
  product_id: number;
}

export interface ReviewFormData {
  review_content: string;
  product_id: number;
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data?: Review;
}