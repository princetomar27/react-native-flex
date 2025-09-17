import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import onboardingReducer from './slices/onboardingSlice';
import dashboardReducer from './slices/dashboardSlice';
import progressReducer from './slices/progressSlice';
import riskReducer from './slices/riskSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['onboarding', 'dashboard', 'progress', 'risk'], // Persist all state
};

const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  dashboard: dashboardReducer,
  progress: progressReducer,
  risk: riskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Type for the persisted state
export type PersistedState = {
  onboarding: {
    currentStep: number;
    isCompleted: boolean;
    userProfile: {
      name: string;
      age: string;
      phone: string;
      gender: 'male' | 'female' | 'other' | '';
      activityLevel:
        | 'sedentary'
        | 'lightly_active'
        | 'moderately_active'
        | 'very_active'
        | 'extremely_active'
        | '';
      height?: string;
      weight?: string;
      fitnessGoals?: string[];
    };
  };
  dashboard: {
    wellnessGoals: Array<{
      id: string;
      title: string;
      icon: string;
      current: number;
      target: number;
      unit: string;
      color: string;
      category: 'fitness' | 'nutrition' | 'wellness' | 'sleep';
      createdAt: string;
      updatedAt: string;
    }>;
    dailyStats: {
      stepsToday: number;
      waterIntake: number;
      sleepHours: number;
      caloriesBurned: number;
    };
    streaks: {
      workoutStreak: number;
      nutritionStreak: number;
      sleepStreak: number;
    };
  };
  progress: {
    progressHistory: Array<{
      date: string;
      completedGoals: number;
      totalGoals: number;
      goalProgress: { [goalId: string]: number };
    }>;
    weeklyTargets: { [goalId: string]: number };
    monthlyTargets: { [goalId: string]: number };
    currentStreak: number;
    longestStreak: number;
    selectedTimeRange: 'today' | 'week' | 'month';
    selectedCategory: string | null;
  };
  risk: {
    currentRisks: Array<{
      id: string;
      name: string;
      description: string;
      riskLevel: 'low' | 'moderate' | 'high' | 'critical';
      riskPercentage: number;
      bioSystem:
        | 'cardiovascular'
        | 'neurological'
        | 'digestive'
        | 'musculoskeletal'
        | 'endocrine'
        | 'respiratory';
      organ?: string;
      factors: string[];
      recommendations: string[];
      icon: string;
      color: string;
    }>;
    riskAssessment: {
      overallRiskScore: number;
      riskLevel: 'low' | 'moderate' | 'high' | 'critical';
      bioSystemRisks: {
        [key: string]: {
          averageRisk: number;
          riskLevel: 'low' | 'moderate' | 'high' | 'critical';
          riskCount: number;
        };
      };
      topRisks: Array<{
        id: string;
        name: string;
        description: string;
        riskLevel: 'low' | 'moderate' | 'high' | 'critical';
        riskPercentage: number;
        bioSystem: string;
        organ?: string;
        factors: string[];
        recommendations: string[];
        icon: string;
        color: string;
      }>;
      improvementPotential: number;
    };
    selectedBioSystem: string | null;
    lastAssessmentDate: string;
    riskHistory: Array<{
      date: string;
      overallScore: number;
      bioSystemScores: { [bioSystem: string]: number };
    }>;
  };
};
