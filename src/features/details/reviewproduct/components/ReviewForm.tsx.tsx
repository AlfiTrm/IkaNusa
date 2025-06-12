"use client";
import React, { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { useAuth } from "@/shared/hooks/useAuth";
import { getDisplayName } from "@/shared/utils/userProfile";

interface ReviewFormProps {
  productId: string | number;
  onSubmit: (reviewContent: string) => Promise<{ success: boolean; message: string }>;
  isSubmitting?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ 
  productId, 
  onSubmit, 
  isSubmitting = false 
}) => {
  const [reviewContent, setReviewContent] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewContent.trim()) {
      setLocalError("Mohon tulis ulasan Anda");
      return;
    }

    if (reviewContent.trim().length < 10) {
      setLocalError("Ulasan minimal 10 karakter");
      return;
    }

    setLocalError(null);
    
    const result = await onSubmit(reviewContent.trim());
    
    if (result.success) {
      setReviewContent("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <MessageCircle className="mx-auto mb-3 text-gray-400" size={48} />
        <p className="text-gray-600 mb-3">Masuk untuk menulis ulasan</p>
        <button 
          onClick={() => window.location.href = '/signin'}
          className="px-4 py-2 bg-blu-250 text-white rounded-lg hover:bg-blu-300 transition-colors"
        >
          Masuk Sekarang
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blu-250 rounded-full flex items-center justify-center text-white font-semibold">
          {user?.Username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <p className="font-medium text-gray-800">
            {user ? getDisplayName(user) : 'User'}
          </p>
          <p className="text-sm text-gray-500">Tulis ulasan Anda</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          placeholder="Bagikan pengalaman Anda dengan produk ini..."
          className="w-full min-h-[100px] p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blu-250 focus:border-transparent"
          disabled={isSubmitting}
        />
        
        {localError && (
          <p className="text-red-500 text-sm mt-2">{localError}</p>
        )}

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            {reviewContent.length}/500 karakter
          </p>
          <button
            type="submit"
            disabled={isSubmitting || !reviewContent.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-blu-250 text-white rounded-lg hover:bg-blu-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <Send size={16} />
                Kirim Ulasan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;