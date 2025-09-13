import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  updateProfile,
  nextStep,
  previousStep,
  completeOnboarding,
  resetOnboarding,
} from '../store/slices/onboardingSlice';
import { UserProfile } from '../types';

export interface WithOnboardingProps {
  onboardingState: {
    currentStep: number;
    isCompleted: boolean;
    userProfile: UserProfile;
  };
  onboardingActions: {
    updateProfile: (profile: Partial<UserProfile>) => void;
    nextStep: () => void;
    previousStep: () => void;
    completeOnboarding: () => void;
    resetOnboarding: () => void;
  };
}

export function withOnboarding<P extends object>(
  Component: React.ComponentType<P & WithOnboardingProps>,
) {
  return function WrappedComponent(props: P) {
    const dispatch = useAppDispatch();
    const onboardingState = useAppSelector(state => state.onboarding);

    const onboardingActions = {
      updateProfile: (profile: Partial<UserProfile>) =>
        dispatch(updateProfile(profile)),
      nextStep: () => dispatch(nextStep()),
      previousStep: () => dispatch(previousStep()),
      completeOnboarding: () => dispatch(completeOnboarding()),
      resetOnboarding: () => dispatch(resetOnboarding()),
    };

    return (
      <Component
        {...props}
        onboardingState={onboardingState}
        onboardingActions={onboardingActions}
      />
    );
  };
}
