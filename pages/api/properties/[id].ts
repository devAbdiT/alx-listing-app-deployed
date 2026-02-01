import { NextApiRequest, NextApiResponse } from "next";
import { PROPERTYLISTINGSAMPLE } from "@/constants";
import { PropertyProps } from "@/interfaces"; // Import interface

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Add IDs to your sample data
  const propertiesWithIds: PropertyProps[] = PROPERTYLISTINGSAMPLE.map(
    (property, index) => ({
      id: index + 1,
      ...property,
    }),
  );

  const propertyId = parseInt(id as string);
  const property = propertiesWithIds.find((p) => p.id === propertyId);

  if (!property) {
    return res.status(404).json({ error: "Property not found" });
  }

  res.status(200).json(property);
}
