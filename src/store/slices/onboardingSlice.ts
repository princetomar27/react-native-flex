import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, OnboardingState } from '../../types';

const initialState: OnboardingState = {
  currentStep: 0,
  isCompleted: false,
  userProfile: {
    name: '',
    age: '',
    phone: '',
    gender: '',
    activityLevel: '',
    height: '',
    weight: '',
    fitnessGoals: [],
  },
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
    nextStep: state => {
      state.currentStep = Math.min(state.currentStep + 1, 2);
    },
    previousStep: state => {
      state.currentStep = Math.max(state.currentStep - 1, 0);
    },
    completeOnboarding: state => {
      state.isCompleted = true;
    },
    resetOnboarding: () => initialState,
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
});

export const {
  updateProfile,
  nextStep,
  previousStep,
  completeOnboarding,
  resetOnboarding,
  setCurrentStep,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
