import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useAppDispatch, useAppSelectorTyped } from '../../../store/hooks';
import {
  calculateRisks,
  setBioSystemFilter,
} from '../../../store/slices/riskSlice';
import RiskPresentation from '../../presentation/risk/RiskPresentation';

interface RiskContainerProps {
  onBackPress: () => void;
}

export default function RiskContainer({ onBackPress }: RiskContainerProps) {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelectorTyped(
    state => state.onboarding.userProfile,
  );
  const wellnessGoals = useAppSelectorTyped(
    state => state.dashboard.wellnessGoals,
  );
  const riskState = useAppSelectorTyped(state => state.risk);

  // Calculate risks when component mounts or when wellness goals change
  useEffect(() => {
    if (wellnessGoals.length > 0) {
      console.log('Calculating health risks...');
      dispatch(calculateRisks({ userProfile, wellnessGoals }));
    }
  }, [dispatch, userProfile, wellnessGoals]);

  const handleBioSystemFilter = (bioSystem: string | null) => {
    dispatch(setBioSystemFilter(bioSystem));
  };

  const handleRiskPress = (riskId: string) => {
    const risk = riskState.currentRisks.find(r => r.id === riskId);
    if (!risk) return;

    Alert.alert(
      `${risk.name} - ${risk.riskPercentage}%`,
      `${risk.description}\n\n📍 Organ: ${
        risk.organ || 'Multiple'
      }\n🔬 Bio-System: ${risk.bioSystem}\n\n🔍 Key Factors:\n${risk.factors
        .map(f => `• ${f}`)
        .join('\n')}\n\n💡 Recommendations:\n${risk.recommendations
        .map(r => `• ${r}`)
        .join('\n')}`,
      [
        { text: 'Close', style: 'cancel' },
        {
          text: 'Learn More',
          onPress: () => handleLearnMore(risk.bioSystem),
        },
      ],
    );
  };

  const handleLearnMore = (bioSystem: string) => {
    const bioSystemInfo = {
      cardiovascular:
        'Learn about heart health, blood pressure management, and cardiovascular exercise benefits.',
      neurological:
        'Discover brain health tips, cognitive exercises, and neuroprotective lifestyle choices.',
      digestive:
        'Explore digestive health, gut microbiome, and nutrition for optimal digestion.',
      musculoskeletal:
        'Understand bone health, joint care, and exercises for strong muscles and bones.',
      endocrine:
        'Learn about hormone balance, metabolism, and blood sugar management.',
      respiratory:
        'Discover lung health, breathing techniques, and respiratory fitness.',
    };

    Alert.alert(
      `${bioSystem.charAt(0).toUpperCase() + bioSystem.slice(1)} System`,
      bioSystemInfo[bioSystem as keyof typeof bioSystemInfo] ||
        'Learn more about this biological system.',
      [{ text: 'Got it', style: 'default' }],
    );
  };

  return (
    <RiskPresentation
      userProfile={userProfile}
      healthRisks={riskState.currentRisks}
      riskAssessment={riskState.riskAssessment}
      onBackPress={onBackPress}
      onBioSystemFilter={handleBioSystemFilter}
      onRiskPress={handleRiskPress}
      selectedBioSystem={riskState.selectedBioSystem}
    />
  );
}
