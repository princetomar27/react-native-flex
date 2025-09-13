import React from 'react';
import { useAppSelectorTyped } from '../store/hooks';
import WelcomeScreen from './screens/WelcomeScreen';
import UserInfoScreen from './screens/UserInfoScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

export default function OnboardingNavigator() {
  const currentStep = useAppSelectorTyped(
    state => state.onboarding.currentStep,
  );

  console.log('OnboardingNavigator - Current step:', currentStep);

  switch (currentStep) {
    case 0:
      return <WelcomeScreen />;
    case 1:
      return <UserInfoScreen />;
    case 2:
      return <ConfirmationScreen />;
    default:
      return <WelcomeScreen />;
  }
}
