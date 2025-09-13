import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface WithNavigationProps {
  navigation: StackNavigationProp<any>;
}

export function withNavigation<P extends object>(
  Component: React.ComponentType<P & WithNavigationProps>,
) {
  return function WrappedComponent(props: P) {
    const navigation = useNavigation<StackNavigationProp<any>>();

    return <Component {...props} navigation={navigation} />;
  };
}
