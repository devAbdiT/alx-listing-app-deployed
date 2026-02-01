import { NextApiRequest, NextApiResponse } from "next";
import { PROPERTYLISTINGSAMPLE } from "@/constants";
import { PropertyProps } from "@/interfaces"; // Import interface

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Add IDs to each property
  const propertiesWithIds: PropertyProps[] = PROPERTYLISTINGSAMPLE.map(
    (property, index) => ({
      id: index + 1,
      ...property,
    }),
  );

  res.status(200).json(propertiesWithIds);
}
