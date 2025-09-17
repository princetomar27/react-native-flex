import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelectorTyped } from '../../../store/hooks';
import {
  initializeGoals,
  updateGoalProgress,
  incrementGoalProgress,
} from '../../../store/slices/dashboardSlice';
import { resetOnboarding } from '../../../store/slices/onboardingSlice';
import DashboardPresentation from '../../presentation/dashboard/DashboardPresentation';

type NavigationProp = StackNavigationProp<any>;

export default function DashboardContainer() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const userProfile = useAppSelectorTyped(
    state => state.onboarding.userProfile,
  );
  const dashboardState = useAppSelectorTyped(state => state.dashboard);

  // Initialize wellness goals based on user's activity level when component mounts
  useEffect(() => {
    if (
      dashboardState.wellnessGoals.length === 0 &&
      userProfile.activityLevel
    ) {
      console.log(
        'Initializing goals for activity level:',
        userProfile.activityLevel,
      );
      dispatch(initializeGoals(userProfile.activityLevel));
    }
  }, [
    dispatch,
    userProfile.activityLevel,
    dashboardState.wellnessGoals.length,
  ]);

  const handleGoalPress = (goalId: string) => {
    const goal = dashboardState.wellnessGoals.find(g => g.id === goalId);
    if (!goal) return;

    Alert.alert(
      `Update ${goal.title}`,
      `Current: ${goal.current} ${goal.unit}\nTarget: ${goal.target} ${goal.unit}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add Progress',
          onPress: () => handleQuickProgress(goalId, goal.category),
        },
        {
          text: 'Set Custom',
          onPress: () => handleCustomProgress(goalId),
        },
      ],
    );
  };

  const handleQuickProgress = (goalId: string, category: string) => {
    let increment = 1;

    switch (category) {
      case 'fitness':
        increment = goalId === '1' ? 500 : 15; // Steps or active minutes
        break;
      case 'wellness':
        increment = 1; // Water glasses
        break;
      case 'nutrition':
        increment = 1; // Servings
        break;
      case 'sleep':
        increment = 1; // Hours
        break;
    }

    dispatch(incrementGoalProgress({ goalId, increment }));
  };

  const handleCustomProgress = (goalId: string) => {
    // In a real app, you'd show a modal or navigate to a detailed input screen
    Alert.prompt(
      'Set Progress',
      'Enter current value:',
      text => {
        const value = parseFloat(text || '0');
        if (!isNaN(value) && value >= 0) {
          dispatch(updateGoalProgress({ goalId, current: value }));
        }
      },
      'plain-text',
    );
  };

  const handleAddActivity = () => {
    Alert.alert('Log Activity', 'Choose an activity to log:', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Workout',
        onPress: () => {
          // Find active minutes goal and increment
          const activeMinutesGoal = dashboardState.wellnessGoals.find(
            g => g.title === 'Active Minutes',
          );
          if (activeMinutesGoal) {
            dispatch(
              incrementGoalProgress({
                goalId: activeMinutesGoal.id,
                increment: 30,
              }),
            );
          }
        },
      },
      {
        text: 'Walk',
        onPress: () => {
          // Find steps goal and increment
          const stepsGoal = dashboardState.wellnessGoals.find(
            g => g.title === 'Daily Steps',
          );
          if (stepsGoal) {
            dispatch(
              incrementGoalProgress({ goalId: stepsGoal.id, increment: 1000 }),
            );
          }
        },
      },
    ]);
  };

  const handleViewProgress = () => {
    navigation.navigate('Progress');
  };

  const handleViewRisks = () => {
    navigation.navigate('Risk');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Choose an option:', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Edit Profile',
        onPress: () =>
          Alert.alert(
            'Edit Profile',
            'This would navigate to profile editing.',
          ),
      },
      {
        text: 'Reset App',
        style: 'destructive',
        onPress: () => {
          Alert.alert(
            'Reset App',
            'Are you sure? This will clear all data and return to onboarding.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Reset',
                style: 'destructive',
                onPress: () => dispatch(resetOnboarding()),
              },
            ],
          );
        },
      },
    ]);
  };

  return (
    <DashboardPresentation
      userProfile={userProfile}
      wellnessGoals={dashboardState.wellnessGoals}
      onGoalPress={handleGoalPress}
      onAddActivity={handleAddActivity}
      onViewProgress={handleViewProgress}
      onViewRisks={handleViewRisks}
      onSettings={handleSettings}
    />
  );
}
