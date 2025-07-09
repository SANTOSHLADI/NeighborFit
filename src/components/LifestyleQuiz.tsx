import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface LifestyleQuizProps {
  onComplete: (profile: UserProfile) => void;
}

export const LifestyleQuiz: React.FC<LifestyleQuizProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: 25,
    nightlife: 5,
    outdoor: 5,
    cultural: 5,
    dining: 5,
    family: 5,
    safetyImportance: 8,
    maxRent: 2000,
    transportMode: 'public' as 'car' | 'public' | 'walk',
    importantAmenities: [] as string[]
  });

  const amenityOptions = [
    'Grocery Stores', 'Restaurants', 'Parks', 'Gyms', 'Coffee Shops',
    'Schools', 'Public Transit', 'Shopping Centers', 'Healthcare',
    'Entertainment', 'Libraries', 'Community Centers'
  ];

  const steps = [
    {
      title: 'Basic Information',
      subtitle: 'Tell us about yourself',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's your name?
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age: {formData.age}
            </label>
            <input
              type="range"
              min="18"
              max="80"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>18</span>
              <span>80</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Lifestyle Preferences',
      subtitle: 'Rate your interest in these activities (1-10)',
      content: (
        <div className="space-y-6">
          {[
            { key: 'nightlife', label: 'Nightlife & Entertainment' },
            { key: 'outdoor', label: 'Outdoor Activities' },
            { key: 'cultural', label: 'Cultural Activities' },
            { key: 'dining', label: 'Fine Dining' },
            { key: 'family', label: 'Family Activities' }
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}: {formData[key as keyof typeof formData]}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData[key as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [key]: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Not Important</span>
                <span>Very Important</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Practical Preferences',
      subtitle: 'Help us understand your practical needs',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Safety Importance: {formData.safetyImportance}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.safetyImportance}
              onChange={(e) => setFormData({ ...formData, safetyImportance: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Monthly Rent: ${formData.maxRent}
            </label>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={formData.maxRent}
              onChange={(e) => setFormData({ ...formData, maxRent: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Transportation
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'car', label: 'Car' },
                { value: 'public', label: 'Public Transit' },
                { value: 'walk', label: 'Walking/Biking' }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setFormData({ ...formData, transportMode: value as any })}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    formData.transportMode === value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Important Amenities',
      subtitle: 'Select amenities that are important to you',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {amenityOptions.map((amenity) => (
              <button
                key={amenity}
                onClick={() => {
                  const newAmenities = formData.importantAmenities.includes(amenity)
                    ? formData.importantAmenities.filter(a => a !== amenity)
                    : [...formData.importantAmenities, amenity];
                  setFormData({ ...formData, importantAmenities: newAmenities });
                }}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  formData.importantAmenities.includes(amenity)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Selected: {formData.importantAmenities.length} amenities
          </p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the quiz
      const profile: UserProfile = {
        name: formData.name,
        age: formData.age,
        preferences: {
          nightlife: formData.nightlife,
          outdoor: formData.outdoor,
          cultural: formData.cultural,
          dining: formData.dining,
          family: formData.family,
          safetyImportance: formData.safetyImportance,
          maxRent: formData.maxRent,
          transportMode: formData.transportMode,
          importantAmenities: formData.importantAmenities
        }
      };
      onComplete(profile);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) return formData.name.trim() !== '';
    if (currentStep === 3) return formData.importantAmenities.length > 0;
    return true;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {steps[currentStep].title}
            </h2>
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 mb-6">{steps[currentStep].subtitle}</p>
          {steps[currentStep].content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <ArrowLeft size={20} />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors ${
              canProceed()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};