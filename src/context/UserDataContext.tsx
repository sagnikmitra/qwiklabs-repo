import { createContext, useContext, useState, ReactNode } from 'react';
import { userData, achieversData } from '../data/mockData';

export interface UserProgress {
  name: string;
  email: string;
  university: string;
  enrollmentStatus: string;
  qwiklabsUrl: string;
  questsCompleted: number;
  skillBadgesCompleted: number;
  timestamp: string;
}

interface UserDataContextType {
  getUserByEmail: (email: string) => UserProgress | null;
  getUserByUrl: (url: string) => UserProgress | null;
  getMilestoneAchievers: () => {
    milestone1: string[];
    milestone2: string[];
    milestone3: string[];
    milestone4: string[];
  };
  getUserMilestoneLevel: (quests: number, badges: number) => number;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getUserByEmail = (email: string): UserProgress | null => {
    // Simulate API delay
    setIsLoading(true);
    
    // For demo/test purposes, always return test data for "test" email
    if (email.toLowerCase() === 'test') {
      setTimeout(() => setIsLoading(false), 800);
      return {
        name: 'Test User',
        email: 'test',
        university: 'test',
        enrollmentStatus: 'Enrolled',
        qwiklabsUrl: 'test',
        questsCompleted: 20,
        skillBadgesCompleted: 10,
        timestamp: 'Fri Apr 09 2021 23:55:50 GMT+0530'
      };
    }
    
    // Check if user exists in our mock data
    const user = userData.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    setTimeout(() => setIsLoading(false), 800);
    return user || null;
  };

  const getUserByUrl = (url: string): UserProgress | null => {
    // Simulate API delay
    setIsLoading(true);
    
    // For demo/test purposes, always return test data for "test" url
    if (url.toLowerCase() === 'test') {
      setTimeout(() => setIsLoading(false), 800);
      return {
        name: 'Test User',
        email: 'test@example.com',
        university: 'test',
        enrollmentStatus: 'Enrolled',
        qwiklabsUrl: 'test',
        questsCompleted: 20,
        skillBadgesCompleted: 10,
        timestamp: 'Fri Apr 09 2021 23:55:50 GMT+0530'
      };
    }
    
    // Check if user exists in our mock data
    const user = userData.find(u => u.qwiklabsUrl.toLowerCase() === url.toLowerCase());
    
    setTimeout(() => setIsLoading(false), 800);
    return user || null;
  };

  const getMilestoneAchievers = () => {
    return achieversData;
  };

  // Calculate milestone level based on quests and badges
  const getUserMilestoneLevel = (quests: number, badges: number): number => {
    if (quests >= 30 && badges >= 15) return 4; // Ultimate milestone
    if (quests >= 24 && badges >= 12) return 3; // Third milestone
    if (quests >= 16 && badges >= 8) return 2;  // Second milestone
    if (quests >= 8 && badges >= 4) return 1;   // First milestone
    return 0; // No milestone reached
  };

  const value = {
    getUserByEmail,
    getUserByUrl,
    getMilestoneAchievers,
    getUserMilestoneLevel,
    isLoading,
    setIsLoading
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};