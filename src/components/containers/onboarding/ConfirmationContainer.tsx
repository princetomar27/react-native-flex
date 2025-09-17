import React from 'react';
import { useAppDispatch, useAppSelectorTyped } from '../../../store/hooks';
import { completeOnboarding } from '../../../store/slices/onboardingSlice';
import ConfirmationPresentation from '../../presentation/onboarding/ConfirmationPresentation';

export default function ConfirmationContainer() {
  const dispatch = useAppDispatch();
  const onboardingState = useAppSelectorTyped(state => state.onboarding);

  const handleStartJourney = () => {
    dispatch(completeOnboarding());
  };

  return (
    <ConfirmationPresentation
      userProfile={onboardingState.userProfile}
      onStartJourney={handleStartJourney}
    />
  );
}
