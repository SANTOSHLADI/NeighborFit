import React from 'react';
import { Home, MapPin, BarChart3, User } from 'lucide-react';

interface HeaderProps {
  currentStep: string;
  onStepChange: (step: 'home' | 'quiz' | 'search' | 'results' | 'insights') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onStepChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'quiz', label: 'Profile', icon: User },
    { id: 'search', label: 'Search', icon: MapPin },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NeighborFit
              </h1>
            </div>
          </div>
          
          <nav className="flex space-x-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onStepChange(id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentStep === id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};