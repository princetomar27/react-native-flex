import React from 'react';
import { useAppDispatch, useAppSelectorTyped } from '../../../store/hooks';
import { nextStep } from '../../../store/slices/onboardingSlice';
import WelcomePresentation from '../../presentation/onboarding/WelcomePresentation';

export default function WelcomeContainer() {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelectorTyped(
    state => state.onboarding.currentStep,
  );

  const handleGetStarted = () => {
    console.log('Get Started clicked! Current step:', currentStep);
    dispatch(nextStep());
    console.log('nextStep action dispatched');
  };

  return <WelcomePresentation onGetStarted={handleGetStarted} />;
}
