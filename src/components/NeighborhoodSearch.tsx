import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Neighborhood } from '../types';
import { mockNeighborhoods } from '../data/mockData';

interface NeighborhoodSearchProps {
  onComplete: (neighborhoods: Neighborhood[]) => void;
}

export const NeighborhoodSearch: React.FC<NeighborhoodSearchProps> = ({ onComplete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);

  const cities = ['San Francisco', 'New York', 'Los Angeles', 'Chicago', 'Austin', 'Seattle'];

  const filteredNeighborhoods = mockNeighborhoods.filter(neighborhood => {
    const matchesSearch = neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         neighborhood.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === '' || neighborhood.city === selectedCity;
    const matchesPrice = neighborhood.avgRent >= priceRange[0] && neighborhood.avgRent <= priceRange[1];
    
    return matchesSearch && matchesCity && matchesPrice;
  });

  const handleNeighborhoodToggle = (id: string) => {
    setSelectedNeighborhoods(prev => 
      prev.includes(id) 
        ? prev.filter(nId => nId !== id)
        : [...prev, id]
    );
  };

  const handleAnalyze = () => {
    const selected = mockNeighborhoods.filter(n => selectedNeighborhoods.includes(n.id));
    onComplete(selected);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Select Neighborhoods to Analyze
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose neighborhoods you're interested in, and we'll analyze how well they match your lifestyle preferences.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Neighborhoods
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or city..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Neighborhood Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredNeighborhoods.map((neighborhood) => (
          <div
            key={neighborhood.id}
            className={`bg-white rounded-xl shadow-sm border transition-all duration-200 cursor-pointer hover:shadow-md ${
              selectedNeighborhoods.includes(neighborhood.id)
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleNeighborhoodToggle(neighborhood.id)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{neighborhood.name}</h3>
                  <div className="flex items-center text-gray-500 mt-1">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{neighborhood.city}</span>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 transition-colors ${
                  selectedNeighborhoods.includes(neighborhood.id)
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedNeighborhoods.includes(neighborhood.id) && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{neighborhood.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Avg. Rent</span>
                  <span className="font-semibold">${neighborhood.avgRent}/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Safety Score</span>
                  <span className="font-semibold">{neighborhood.safetyScore}/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Walkability</span>
                  <span className="font-semibold">{neighborhood.features.walkable}/10</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {neighborhood.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {neighborhood.amenities.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{neighborhood.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      {selectedNeighborhoods.length > 0 && (
        <div className="text-center">
          <button
            onClick={handleAnalyze}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Analyze {selectedNeighborhoods.length} Neighborhood{selectedNeighborhoods.length > 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
};