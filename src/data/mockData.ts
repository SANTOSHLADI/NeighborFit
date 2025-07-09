import { Neighborhood } from '../types';

export const mockNeighborhoods: Neighborhood[] = [
  {
    id: '1',
    name: 'Mission District',
    city: 'San Francisco',
    description: 'Vibrant neighborhood known for its street art, diverse food scene, and nightlife.',
    avgRent: 3200,
    safetyScore: 7,
    populationDensity: 15000,
    features: {
      nightlife: 9,
      outdoor: 6,
      cultural: 8,
      dining: 9,
      family: 5,
      walkable: 9,
      parking: 3,
      publicTransport: 8
    },
    amenities: ['Restaurants', 'Bars', 'Coffee Shops', 'Parks', 'Public Transit', 'Art Galleries', 'Grocery Stores'],
    demographics: {
      medianAge: 32,
      familyFriendly: 6,
      youngProfessionals: 9
    },
    coordinates: { lat: 37.7599, lng: -122.4148 }
  },
  {
    id: '2',
    name: 'Pacific Heights',
    city: 'San Francisco',
    description: 'Upscale residential area with Victorian architecture and stunning city views.',
    avgRent: 4500,
    safetyScore: 9,
    populationDensity: 8000,
    features: {
      nightlife: 4,
      outdoor: 7,
      cultural: 7,
      dining: 8,
      family: 8,
      walkable: 7,
      parking: 6,
      publicTransport: 6
    },
    amenities: ['Parks', 'Restaurants', 'Shopping Centers', 'Schools', 'Healthcare', 'Gyms'],
    demographics: {
      medianAge: 42,
      familyFriendly: 9,
      youngProfessionals: 6
    },
    coordinates: { lat: 37.7930, lng: -122.4411 }
  },
  {
    id: '3',
    name: 'Williamsburg',
    city: 'New York',
    description: 'Trendy Brooklyn neighborhood with artisanal shops, restaurants, and waterfront views.',
    avgRent: 3800,
    safetyScore: 8,
    populationDensity: 18000,
    features: {
      nightlife: 8,
      outdoor: 7,
      cultural: 9,
      dining: 8,
      family: 6,
      walkable: 8,
      parking: 4,
      publicTransport: 9
    },
    amenities: ['Restaurants', 'Bars', 'Coffee Shops', 'Art Galleries', 'Parks', 'Public Transit', 'Entertainment'],
    demographics: {
      medianAge: 29,
      familyFriendly: 6,
      youngProfessionals: 9
    },
    coordinates: { lat: 40.7081, lng: -73.9571 }
  },
  {
    id: '4',
    name: 'Upper East Side',
    city: 'New York',
    description: 'Elegant Manhattan neighborhood with museums, upscale shopping, and Central Park access.',
    avgRent: 4200,
    safetyScore: 9,
    populationDensity: 20000,
    features: {
      nightlife: 6,
      outdoor: 8,
      cultural: 10,
      dining: 9,
      family: 7,
      walkable: 9,
      parking: 3,
      publicTransport: 9
    },
    amenities: ['Museums', 'Restaurants', 'Shopping Centers', 'Parks', 'Schools', 'Healthcare', 'Libraries'],
    demographics: {
      medianAge: 38,
      familyFriendly: 8,
      youngProfessionals: 7
    },
    coordinates: { lat: 40.7736, lng: -73.9566 }
  },
  {
    id: '5',
    name: 'Venice Beach',
    city: 'Los Angeles',
    description: 'Bohemian beachside community known for its boardwalk, street performers, and laid-back vibe.',
    avgRent: 2800,
    safetyScore: 6,
    populationDensity: 12000,
    features: {
      nightlife: 7,
      outdoor: 10,
      cultural: 8,
      dining: 7,
      family: 5,
      walkable: 8,
      parking: 5,
      publicTransport: 6
    },
    amenities: ['Beach', 'Restaurants', 'Bars', 'Gyms', 'Parks', 'Entertainment', 'Coffee Shops'],
    demographics: {
      medianAge: 35,
      familyFriendly: 5,
      youngProfessionals: 8
    },
    coordinates: { lat: 33.9850, lng: -118.4695 }
  },
  {
    id: '6',
    name: 'Beverly Hills',
    city: 'Los Angeles',
    description: 'Prestigious neighborhood known for luxury shopping, dining, and celebrity homes.',
    avgRent: 5200,
    safetyScore: 9,
    populationDensity: 6000,
    features: {
      nightlife: 7,
      outdoor: 6,
      cultural: 7,
      dining: 9,
      family: 8,
      walkable: 6,
      parking: 8,
      publicTransport: 5
    },
    amenities: ['Shopping Centers', 'Restaurants', 'Spas', 'Healthcare', 'Parks', 'Schools'],
    demographics: {
      medianAge: 45,
      familyFriendly: 9,
      youngProfessionals: 5
    },
    coordinates: { lat: 34.0736, lng: -118.4004 }
  },
  {
    id: '7',
    name: 'Lincoln Park',
    city: 'Chicago',
    description: 'Historic neighborhood with tree-lined streets, parks, and proximity to the lake.',
    avgRent: 2100,
    safetyScore: 8,
    populationDensity: 11000,
    features: {
      nightlife: 6,
      outdoor: 9,
      cultural: 7,
      dining: 7,
      family: 8,
      walkable: 8,
      parking: 6,
      publicTransport: 7
    },
    amenities: ['Parks', 'Restaurants', 'Museums', 'Schools', 'Healthcare', 'Coffee Shops', 'Gyms'],
    demographics: {
      medianAge: 33,
      familyFriendly: 8,
      youngProfessionals: 8
    },
    coordinates: { lat: 41.9246, lng: -87.6369 }
  },
  {
    id: '8',
    name: 'South by Southwest',
    city: 'Austin',
    description: 'Creative hub with live music venues, food trucks, and a vibrant startup culture.',
    avgRent: 1800,
    safetyScore: 7,
    populationDensity: 9000,
    features: {
      nightlife: 9,
      outdoor: 7,
      cultural: 8,
      dining: 8,
      family: 6,
      walkable: 7,
      parking: 7,
      publicTransport: 5
    },
    amenities: ['Music Venues', 'Restaurants', 'Bars', 'Coffee Shops', 'Parks', 'Entertainment'],
    demographics: {
      medianAge: 28,
      familyFriendly: 6,
      youngProfessionals: 9
    },
    coordinates: { lat: 30.2672, lng: -97.7431 }
  },
  {
    id: '9',
    name: 'Capitol Hill',
    city: 'Seattle',
    description: 'Eclectic neighborhood known for its music scene, independent businesses, and nightlife.',
    avgRent: 2400,
    safetyScore: 7,
    populationDensity: 13000,
    features: {
      nightlife: 8,
      outdoor: 6,
      cultural: 8,
      dining: 8,
      family: 5,
      walkable: 9,
      parking: 4,
      publicTransport: 8
    },
    amenities: ['Bars', 'Restaurants', 'Coffee Shops', 'Music Venues', 'Parks', 'Public Transit'],
    demographics: {
      medianAge: 30,
      familyFriendly: 5,
      youngProfessionals: 9
    },
    coordinates: { lat: 47.6062, lng: -122.3321 }
  },
  {
    id: '10',
    name: 'Ballard',
    city: 'Seattle',
    description: 'Maritime neighborhood with breweries, seafood restaurants, and weekend farmers market.',
    avgRent: 2200,
    safetyScore: 8,
    populationDensity: 10000,
    features: {
      nightlife: 7,
      outdoor: 8,
      cultural: 7,
      dining: 8,
      family: 7,
      walkable: 7,
      parking: 6,
      publicTransport: 6
    },
    amenities: ['Breweries', 'Restaurants', 'Farmers Market', 'Parks', 'Coffee Shops', 'Community Centers'],
    demographics: {
      medianAge: 35,
      familyFriendly: 7,
      youngProfessionals: 8
    },
    coordinates: { lat: 47.6685, lng: -122.3834 }
  }
];