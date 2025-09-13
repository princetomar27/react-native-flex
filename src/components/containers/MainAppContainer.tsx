import React from 'react';
import { useAppDispatch, useAppSelectorTyped } from '../../store/hooks';
import { resetOnboarding } from '../../store/slices/onboardingSlice';
import MainAppPresentation from '../presentation/MainAppPresentation';

export default function MainAppContainer() {
  const dispatch = useAppDispatch();
  const onboardingState = useAppSelectorTyped(state => state.onboarding);
  const { userProfile } = onboardingState;

  const handleResetProfile = () => {
    dispatch(resetOnboarding());
  };

  return (
    <MainAppPresentation
      userProfile={userProfile}
      onResetProfile={handleResetProfile}
    />
  );
}
