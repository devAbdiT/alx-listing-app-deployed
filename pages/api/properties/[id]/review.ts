import { NextApiRequest, NextApiResponse } from "next";
import { Review } from "@/interfaces";

// Mock data - replace with database in production
const mockReviews: Review[] = [
  {
    id: "1",
    propertyId: "1",
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
    propertyId: "1",
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
    propertyId: "1",
    userId: "user3",
    userName: "Michael Chen",
    userAvatar: "",
    rating: 5,
    comment:
      "Best vacation rental I've stayed in. The view was breathtaking and everything was perfect.",
    date: "2024-01-05",
    helpful: 15,
  },
  {
    id: "4",
    propertyId: "1",
    userId: "user4",
    userName: "Emily Rodriguez",
    userAvatar: "",
    rating: 5,
    comment:
      "Perfect for our family vacation. The kids loved the pool and we enjoyed the peaceful surroundings.",
    date: "2024-01-02",
    helpful: 6,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Filter reviews by property ID
    const propertyReviews = mockReviews.filter(
      (review) => review.propertyId === id,
    );

    return res.status(200).json(propertyReviews);
  }

  if (req.method === "POST") {
    try {
      const newReview: Review = {
        ...req.body,
        id: `review_${Date.now()}`,
        date: new Date().toISOString(),
      };

      // In production, save to database here
      console.log("New review:", newReview);

      return res.status(201).json({
        success: true,
        message: "Review submitted successfully",
        review: newReview,
      });
    } catch (error) {
      console.error("Review submission error:", error);
      return res.status(500).json({ error: "Failed to submit review" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
