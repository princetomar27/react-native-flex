import React from 'react';
import { useNavigation } from '@react-navigation/native';
import ProgressContainer from '../../../components/containers/progress/ProgressContainer';

export default function ProgressScreen() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return <ProgressContainer onBackPress={handleBackPress} />;
}
