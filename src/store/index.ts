import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import onboardingReducer from './slices/onboardingSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['onboarding'], // Only persist onboarding state
};

const rootReducer = combineReducers({
  onboarding: onboardingReducer,
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
};
