import { NextApiRequest, NextApiResponse } from "next";
import { BookingData } from "@/interfaces";

// In-memory storage for demo (replace with database in production)
let bookings: BookingData[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Get all bookings
    return res.status(200).json(bookings);
  }

  if (req.method === "POST") {
    try {
      const bookingData: BookingData = {
        ...req.body,
        id: `booking_${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      // Validate required fields
      if (
        !bookingData.propertyId ||
        !bookingData.email ||
        !bookingData.firstName ||
        !bookingData.lastName
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Add to bookings array
      bookings.push(bookingData);

      // In production, you would save to a database here
      console.log("Booking created:", bookingData);

      return res.status(201).json({
        success: true,
        message: "Booking created successfully",
        bookingId: bookingData.id,
        booking: bookingData,
      });
    } catch (error) {
      console.error("Booking error:", error);
      return res.status(500).json({ error: "Failed to create booking" });
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
