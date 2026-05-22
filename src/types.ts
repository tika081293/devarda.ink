export interface TattooStyle {
  id: string;
  name: string;
  description: string;
  image: string;
  traits: {
    complexity: string; // e.g., "Extremely High", "Moderate"
    averagePain: string; // e.g., "Low-Medium", "Medium-High"
    healingTime: string; // e.g., "7-14 days", "10-21 days"
    sessionType: string; // e.g., "Half Day/Full Day", "Hourly"
  };
  details: string[];
}

export interface Artist {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  avatar: string;
  instagram: string;
  languages: string[];
  portfolio: string[];
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  style: string;
  title: string;
  artistName: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerInstagram?: string;
  artistId: string;
  styleId: string;
  placement: string;
  size: string; // e.g., "Small (Under 5cm)", "Medium (5-15cm)", "Large (Full Piece)"
  concept: string;
  date: string;
  timeSlot: string;
  createdAt: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
