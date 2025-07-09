import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NeighborhoodSearch } from './components/NeighborhoodSearch';
import { LifestyleQuiz } from './components/LifestyleQuiz';
import { MatchingResults } from './components/MatchingResults';
import { DataInsights } from './components/DataInsights';
import { Footer } from './components/Footer';
import { UserProfile, Neighborhood, MatchResult } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<'home' | 'quiz' | 'search' | 'results' | 'insights'>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<Neighborhood[]>([]);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);

  const handleQuizComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentStep('search');
  };

  const handleSearchComplete = (neighborhoods: Neighborhood[]) => {
    setSelectedNeighborhoods(neighborhoods);
    if (userProfile) {
      // Calculate matches using our algorithm
      const results = calculateMatches(userProfile, neighborhoods);
      setMatchResults(results);
      setCurrentStep('results');
    }
  };

  const calculateMatches = (profile: UserProfile, neighborhoods: Neighborhood[]): MatchResult[] => {
    return neighborhoods.map(neighborhood => {
      const scores = {
        lifestyle: calculateLifestyleScore(profile, neighborhood),
        amenities: calculateAmenityScore(profile, neighborhood),
        safety: calculateSafetyScore(profile, neighborhood),
        cost: calculateCostScore(profile, neighborhood),
        transport: calculateTransportScore(profile, neighborhood)
      };
      
      const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;
      
      return {
        neighborhood,
        overallScore,
        scores,
        reasons: generateReasons(profile, neighborhood, scores)
      };
    }).sort((a, b) => b.overallScore - a.overallScore);
  };

  const calculateLifestyleScore = (profile: UserProfile, neighborhood: Neighborhood): number => {
    const weights = {
      nightlife: profile.preferences.nightlife * 0.2,
      outdoor: profile.preferences.outdoor * 0.2,
      cultural: profile.preferences.cultural * 0.2,
      dining: profile.preferences.dining * 0.2,
      family: profile.preferences.family * 0.2
    };
    
    return (
      weights.nightlife * neighborhood.features.nightlife +
      weights.outdoor * neighborhood.features.outdoor +
      weights.cultural * neighborhood.features.cultural +
      weights.dining * neighborhood.features.dining +
      weights.family * neighborhood.features.family
    );
  };

  const calculateAmenityScore = (profile: UserProfile, neighborhood: Neighborhood): number => {
    const amenityMatch = neighborhood.amenities.filter(amenity => 
      profile.preferences.importantAmenities.includes(amenity)
    ).length;
    return (amenityMatch / Math.max(profile.preferences.importantAmenities.length, 1)) * 100;
  };

  const calculateSafetyScore = (profile: UserProfile, neighborhood: Neighborhood): number => {
    const safetyImportance = profile.preferences.safetyImportance / 10;
    return neighborhood.safetyScore * safetyImportance * 10;
  };

  const calculateCostScore = (profile: UserProfile, neighborhood: Neighborhood): number => {
    const affordabilityScore = Math.max(0, 100 - Math.abs(profile.preferences.maxRent - neighborhood.avgRent) / 50);
    return affordabilityScore;
  };

  const calculateTransportScore = (profile: UserProfile, neighborhood: Neighborhood): number => {
    if (profile.preferences.transportMode === 'car') {
      return neighborhood.features.parking * 20;
    } else if (profile.preferences.transportMode === 'public') {
      return neighborhood.features.publicTransport * 20;
    } else {
      return neighborhood.features.walkable * 20;
    }
  };

  const generateReasons = (profile: UserProfile, neighborhood: Neighborhood, scores: any): string[] => {
    const reasons = [];
    
    if (scores.lifestyle > 70) {
      reasons.push(`Great lifestyle match for your preferences`);
    }
    if (scores.amenities > 80) {
      reasons.push(`Excellent amenities that match your needs`);
    }
    if (scores.safety > 85) {
      reasons.push(`High safety rating aligns with your priorities`);
    }
    if (scores.cost > 75) {
      reasons.push(`Within your budget range`);
    }
    if (scores.transport > 70) {
      reasons.push(`Good transportation options for your commute`);
    }
    
    return reasons;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentStep={currentStep} onStepChange={setCurrentStep} />
      
      {currentStep === 'home' && (
        <Hero onGetStarted={() => setCurrentStep('quiz')} />
      )}
      
      {currentStep === 'quiz' && (
        <LifestyleQuiz onComplete={handleQuizComplete} />
      )}
      
      {currentStep === 'search' && (
        <NeighborhoodSearch onComplete={handleSearchComplete} />
      )}
      
      {currentStep === 'results' && matchResults.length > 0 && (
        <MatchingResults 
          results={matchResults} 
          userProfile={userProfile!}
          onViewInsights={() => setCurrentStep('insights')}
        />
      )}
      
      {currentStep === 'insights' && (
        <DataInsights 
          neighborhoods={selectedNeighborhoods}
          matchResults={matchResults}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;