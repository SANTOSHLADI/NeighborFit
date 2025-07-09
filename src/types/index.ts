export interface UserProfile {
  name: string;
  age: number;
  preferences: {
    nightlife: number;
    outdoor: number;
    cultural: number;
    dining: number;
    family: number;
    safetyImportance: number;
    maxRent: number;
    transportMode: 'car' | 'public' | 'walk';
    importantAmenities: string[];
  };
}

export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  description: string;
  avgRent: number;
  safetyScore: number;
  populationDensity: number;
  features: {
    nightlife: number;
    outdoor: number;
    cultural: number;
    dining: number;
    family: number;
    walkable: number;
    parking: number;
    publicTransport: number;
  };
  amenities: string[];
  demographics: {
    medianAge: number;
    familyFriendly: number;
    youngProfessionals: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface MatchResult {
  neighborhood: Neighborhood;
  overallScore: number;
  scores: {
    lifestyle: number;
    amenities: number;
    safety: number;
    cost: number;
    transport: number;
  };
  reasons: string[];
}