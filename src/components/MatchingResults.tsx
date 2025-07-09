import React from 'react';
import { Trophy, MapPin, Star, TrendingUp, Shield, DollarSign, Car } from 'lucide-react';
import { MatchResult, UserProfile } from '../types';

interface MatchingResultsProps {
  results: MatchResult[];
  userProfile: UserProfile;
  onViewInsights: () => void;
}

export const MatchingResults: React.FC<MatchingResultsProps> = ({ 
  results, 
  userProfile, 
  onViewInsights 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreIcon = (category: string) => {
    switch (category) {
      case 'lifestyle': return <Star size={16} />;
      case 'amenities': return <MapPin size={16} />;
      case 'safety': return <Shield size={16} />;
      case 'cost': return <DollarSign size={16} />;
      case 'transport': return <Car size={16} />;
      default: return <TrendingUp size={16} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Neighborhood Matches
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your preferences, here are your best neighborhood matches ranked by compatibility score.
        </p>
      </div>

      <div className="space-y-6">
        {results.map((result, index) => (
          <div
            key={result.neighborhood.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {index === 0 && (
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Trophy className="text-yellow-600" size={20} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {result.neighborhood.name}
                    </h3>
                    <div className="flex items-center text-gray-500 mt-1">
                      <MapPin size={16} className="mr-1" />
                      <span>{result.neighborhood.city}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(result.overallScore)}%
                  </div>
                  <div className="text-sm text-gray-500">Match Score</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Score Breakdown</h4>
                  <div className="space-y-3">
                    {Object.entries(result.scores).map(([category, score]) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getScoreIcon(category)}
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <span className={`text-sm font-medium px-2 py-1 rounded ${getScoreColor(score)}`}>
                            {Math.round(score)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Why This Match?</h4>
                  <div className="space-y-2">
                    {result.reasons.map((reason, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <span className="text-sm text-gray-700">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    ${result.neighborhood.avgRent}
                  </div>
                  <div className="text-sm text-gray-500">Avg. Rent</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {result.neighborhood.safetyScore}/10
                  </div>
                  <div className="text-sm text-gray-500">Safety</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {result.neighborhood.features.walkable}/10
                  </div>
                  <div className="text-sm text-gray-500">Walkability</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {result.neighborhood.amenities.length}
                  </div>
                  <div className="text-sm text-gray-500">Amenities</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={onViewInsights}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          View Data Insights
        </button>
      </div>
    </div>
  );
};