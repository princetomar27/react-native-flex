import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelectorTyped } from '../store/hooks';
import OnboardingNavigator from './OnboardingNavigator';
import DashboardScreen from './screens/dashboard/DashboardScreen';
import ProgressScreen from './screens/progress/ProgressScreen';
import RiskScreen from './screens/risk/RiskScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Dashboard: undefined;
  Progress: undefined;
  Risk: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const isCompleted = useAppSelectorTyped(
    state => state.onboarding.isCompleted,
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isCompleted ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Progress" component={ProgressScreen} />
            <Stack.Screen name="Risk" component={RiskScreen} />
          </>
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
