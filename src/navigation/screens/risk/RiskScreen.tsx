import React from 'react';
import { useNavigation } from '@react-navigation/native';
import RiskContainer from '../../../components/containers/risk/RiskContainer';

export default function RiskScreen() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return <RiskContainer onBackPress={handleBackPress} />;
}
