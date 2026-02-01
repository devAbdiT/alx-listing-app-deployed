export interface PropertyProps {
  id: number;
  name: string;
  address: {
    state: string;
    city: string;
    country: string;
  };
  rating: number;
  category: string[];
  price: number;
  offers: {
    bed: string;
    shower: string;
    occupants: string;
  };
  image: string;
  discount: string;
}
export interface BookingData {
  id?: string;
  propertyId: string;
  propertyName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalNights: number;
  pricePerNight: number;
  bookingFee: number;
  totalPrice: number;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status?: "pending" | "confirmed" | "cancelled";
  createdAt?: string;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful?: number;
}
interface LayoutProps {
  children: React.ReactNode;
}
