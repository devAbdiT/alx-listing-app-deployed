import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, User, ThumbsUp, Calendar } from "lucide-react";
import { Review } from "@/interfaces";

interface ReviewSectionProps {
  propertyId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch from API - if endpoint doesn't exist, use mock data
        const response = await axios.get(
          `/api/properties/${propertyId}/reviews`,
        );
        const reviewsData = response.data;

        setReviews(reviewsData);

        // Calculate stats
        const average =
          reviewsData.reduce(
            (acc: number, review: Review) => acc + review.rating,
            0,
          ) / reviewsData.length;
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviewsData.forEach((review: Review) => {
          counts[review.rating as keyof typeof counts]++;
        });

        setStats({
          averageRating: parseFloat(average.toFixed(1)),
          totalReviews: reviewsData.length,
          ratingCounts: counts,
        });
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Unable to load reviews at the moment.");

        // Fallback to mock data for demo
        const mockReviews: Review[] = [
          {
            id: "1",
            propertyId,
            userId: "user1",
            userName: "Alex Johnson",
            userAvatar: "",
            rating: 5,
            comment:
              "Absolutely amazing stay! The property exceeded all expectations. Perfect location and incredible amenities.",
            date: "2024-01-15",
            helpful: 12,
          },
          {
            id: "2",
            propertyId,
            userId: "user2",
            userName: "Sarah Williams",
            userAvatar: "",
            rating: 4,
            comment:
              "Great value for money. The host was very responsive and the place was spotless. Would recommend!",
            date: "2024-01-10",
            helpful: 8,
          },
          {
            id: "3",
            propertyId,
            userId: "user3",
            userName: "Michael Chen",
            userAvatar: "",
            rating: 5,
            comment:
              "Best vacation rental I've stayed in. The view was breathtaking and everything was perfect.",
            date: "2024-01-05",
            helpful: 15,
          },
        ];

        setReviews(mockReviews);
        setStats({
          averageRating: 4.7,
          totalReviews: 3,
          ratingCounts: { 5: 2, 4: 1, 3: 0, 2: 0, 1: 0 },
        });
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchReviews();
    }
  }, [propertyId]);

  const handleHelpful = async (reviewId: string) => {
    try {
      // Update helpful count locally
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId
            ? { ...review, helpful: (review.helpful || 0) + 1 }
            : review,
        ),
      );

      // In production: POST to API endpoint
      // await axios.post(`/api/reviews/${reviewId}/helpful`);
    } catch (error) {
      console.error("Error updating helpful count:", error);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  const renderRatingBar = (rating: number, count: number) => {
    const percentage = (count / stats.totalReviews) * 100;

    return (
      <div className="flex items-center mb-2">
        <span className="w-8 text-sm text-gray-600">{rating} ★</span>
        <div className="flex-1 ml-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <span className="w-12 text-right text-sm text-gray-500">{count}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">⚠️</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Reviews</h2>

      {/* Overall Rating */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-2">
            <span className="text-5xl font-bold text-gray-900 mr-2">
              {stats.averageRating}
            </span>
            <div>
              <div className="flex">
                {renderStars(Math.round(stats.averageRating))}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {stats.totalReviews}{" "}
                {stats.totalReviews === 1 ? "review" : "reviews"}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating}>
              {renderRatingBar(
                rating,
                stats.ratingCounts[rating as keyof typeof stats.ratingCounts],
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-6 last:border-0"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-3">
                  {review.userAvatar ? (
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <User className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {review.userName}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {renderStars(review.rating)}
              </div>
            </div>

            <p className="text-gray-700 mb-4">{review.comment}</p>

            <div className="flex items-center">
              <button
                onClick={() => handleHelpful(review.id)}
                className="flex items-center text-sm text-gray-500 hover:text-blue-600"
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                Helpful ({review.helpful || 0})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors">
          Write a Review
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
