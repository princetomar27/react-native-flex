import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import onboardingReducer from './slices/onboardingSlice';
import dashboardReducer from './slices/dashboardSlice';
import progressReducer from './slices/progressSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['onboarding', 'dashboard', 'progress'], // Persist all state
};

const rootReducer = combineReducers({
  onboarding: onboardingReducer,
  dashboard: dashboardReducer,
  progress: progressReducer,
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
};
