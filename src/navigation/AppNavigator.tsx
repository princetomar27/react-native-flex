import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelectorTyped } from '../store/hooks';
import OnboardingNavigator from './OnboardingNavigator';
import MainAppScreen from './screens/onboarding/MainAppScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  MainApp: undefined;
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
          <Stack.Screen name="MainApp" component={MainAppScreen} />
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
