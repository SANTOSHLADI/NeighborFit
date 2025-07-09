import React from 'react';
import { BarChart3, TrendingUp, Users, MapPin } from 'lucide-react';
import { Neighborhood, MatchResult } from '../types';

interface DataInsightsProps {
  neighborhoods: Neighborhood[];
  matchResults: MatchResult[];
}

export const DataInsights: React.FC<DataInsightsProps> = ({ neighborhoods, matchResults }) => {
  const avgRent = neighborhoods.reduce((sum, n) => sum + n.avgRent, 0) / neighborhoods.length;
  const avgSafety = neighborhoods.reduce((sum, n) => sum + n.safetyScore, 0) / neighborhoods.length;
  const totalAmenities = neighborhoods.reduce((sum, n) => sum + n.amenities.length, 0);
  
  const topMatch = matchResults[0];
  const avgMatchScore = matchResults.reduce((sum, r) => sum + r.overallScore, 0) / matchResults.length;

  const insights = [
    {
      title: 'Average Rent',
      value: `$${Math.round(avgRent)}`,
      subtitle: 'across selected neighborhoods',
      icon: <TrendingUp className="text-blue-600" size={24} />,
      color: 'bg-blue-50'
    },
    {
      title: 'Safety Score',
      value: `${avgSafety.toFixed(1)}/10`,
      subtitle: 'average safety rating',
      icon: <BarChart3 className="text-green-600" size={24} />,
      color: 'bg-green-50'
    },
    {
      title: 'Total Amenities',
      value: totalAmenities.toString(),
      subtitle: 'amenities analyzed',
      icon: <MapPin className="text-purple-600" size={24} />,
      color: 'bg-purple-50'
    },
    {
      title: 'Best Match',
      value: `${Math.round(topMatch?.overallScore || 0)}%`,
      subtitle: topMatch?.neighborhood.name || 'N/A',
      icon: <Users className="text-orange-600" size={24} />,
      color: 'bg-orange-50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Data Insights & Analysis
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive analysis of your selected neighborhoods and matching algorithm performance.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {insights.map((insight, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className={`w-12 h-12 ${insight.color} rounded-lg flex items-center justify-center mb-4`}>
              {insight.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{insight.value}</h3>
            <p className="text-sm text-gray-600">{insight.title}</p>
            <p className="text-xs text-gray-500 mt-1">{insight.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Algorithm Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Algorithm Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Match Score Distribution</h4>
            <div className="space-y-3">
              {matchResults.map((result, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-24 text-sm text-gray-600">
                    {result.neighborhood.name}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${result.overallScore}%` }}
                    />
                  </div>
                  <div className="w-12 text-sm font-medium text-gray-900">
                    {Math.round(result.overallScore)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Category Performance</h4>
            <div className="space-y-3">
              {['lifestyle', 'amenities', 'safety', 'cost', 'transport'].map((category) => {
                const avgScore = matchResults.reduce((sum, r) => sum + r.scores[category as keyof typeof r.scores], 0) / matchResults.length;
                return (
                  <div key={category} className="flex items-center space-x-3">
                    <div className="w-20 text-sm text-gray-600 capitalize">
                      {category}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${avgScore}%` }}
                      />
                    </div>
                    <div className="w-12 text-sm font-medium text-gray-900">
                      {Math.round(avgScore)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Neighborhood Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Neighborhood Comparison</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2">Neighborhood</th>
                <th className="text-left py-3 px-2">City</th>
                <th className="text-left py-3 px-2">Rent</th>
                <th className="text-left py-3 px-2">Safety</th>
                <th className="text-left py-3 px-2">Walkability</th>
                <th className="text-left py-3 px-2">Match Score</th>
              </tr>
            </thead>
            <tbody>
              {matchResults.map((result, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium">{result.neighborhood.name}</td>
                  <td className="py-3 px-2 text-gray-600">{result.neighborhood.city}</td>
                  <td className="py-3 px-2">${result.neighborhood.avgRent}</td>
                  <td className="py-3 px-2">{result.neighborhood.safetyScore}/10</td>
                  <td className="py-3 px-2">{result.neighborhood.features.walkable}/10</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      result.overallScore >= 80 ? 'bg-green-100 text-green-800' :
                      result.overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {Math.round(result.overallScore)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};