import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  HealthRisk,
  RiskState,
  RiskAssessment,
  UserProfile,
  WellnessGoal,
} from '../../types';

const generateHealthRisks = (
  userProfile: UserProfile,
  wellnessGoals: WellnessGoal[],
): HealthRisk[] => {
  const age = parseInt(userProfile.age || '35');
  const activityLevel = userProfile.activityLevel;

  // Calculate wellness compliance score (0-100)
  const complianceScore =
    wellnessGoals.length > 0
      ? wellnessGoals.reduce(
          (sum, goal) =>
            sum + Math.min((goal.current / goal.target) * 100, 100),
          0,
        ) / wellnessGoals.length
      : 50;

  const risks: HealthRisk[] = [
    // Cardiovascular Risks
    {
      id: 'heart_disease',
      name: 'Heart Disease',
      description:
        'Risk of coronary artery disease and heart complications based on lifestyle factors.',
      riskLevel: age > 40 && complianceScore < 60 ? 'moderate' : 'low',
      riskPercentage: Math.max(
        10,
        Math.min(85, age * 0.8 + (100 - complianceScore) * 0.5),
      ),
      bioSystem: 'cardiovascular' as const,
      organ: 'Heart',
      factors: ['Age', 'Physical inactivity', 'Poor diet', 'Stress levels'],
      recommendations: [
        'Regular cardio exercise',
        'Heart-healthy diet',
        'Stress management',
      ],
      icon: '❤️',
      color: '#F44336',
    },
    {
      id: 'hypertension',
      name: 'Hypertension',
      description:
        'Risk of high blood pressure based on lifestyle and age factors.',
      riskLevel: age > 35 && activityLevel === 'sedentary' ? 'moderate' : 'low',
      riskPercentage: Math.max(
        15,
        Math.min(75, age * 0.6 + (100 - complianceScore) * 0.4),
      ),
      bioSystem: 'cardiovascular' as const,
      organ: 'Blood vessels',
      factors: ['Sedentary lifestyle', 'High sodium intake', 'Stress', 'Age'],
      recommendations: [
        'Reduce sodium intake',
        'Regular exercise',
        'Weight management',
      ],
      icon: '🩸',
      color: '#FF5722',
    },

    // Endocrine Risks
    {
      id: 'diabetes_t2',
      name: 'Type 2 Diabetes',
      description: 'Risk of developing insulin resistance and type 2 diabetes.',
      riskLevel: age > 35 && complianceScore < 50 ? 'moderate' : 'low',
      riskPercentage: Math.max(
        8,
        Math.min(70, age * 0.5 + (100 - complianceScore) * 0.6),
      ),
      bioSystem: 'endocrine' as const,
      organ: 'Pancreas',
      factors: ['Poor diet', 'Physical inactivity', 'Age', 'Weight management'],
      recommendations: ['Balanced diet', 'Regular exercise', 'Weight control'],
      icon: '🍯',
      color: '#FF9800',
    },
    {
      id: 'metabolic_syndrome',
      name: 'Metabolic Syndrome',
      description: 'Risk of metabolic disorders affecting energy processing.',
      riskLevel: complianceScore < 40 ? 'moderate' : 'low',
      riskPercentage: Math.max(
        12,
        Math.min(65, (100 - complianceScore) * 0.8 + age * 0.3),
      ),
      bioSystem: 'endocrine' as const,
      organ: 'Multiple organs',
      factors: ['Poor nutrition', 'Lack of exercise', 'Sleep deprivation'],
      recommendations: [
        'Improve diet quality',
        'Increase physical activity',
        'Better sleep',
      ],
      icon: '⚖️',
      color: '#FFC107',
    },

    // Musculoskeletal Risks
    {
      id: 'osteoarthritis',
      name: 'Osteoarthritis',
      description: 'Risk of joint degeneration and mobility issues.',
      riskLevel: age > 40 && activityLevel === 'sedentary' ? 'moderate' : 'low',
      riskPercentage: Math.max(
        5,
        Math.min(60, age * 0.7 + (activityLevel === 'sedentary' ? 20 : 0)),
      ),
      bioSystem: 'musculoskeletal' as const,
      organ: 'Joints',
      factors: [
        'Age',
        'Physical inactivity',
        'Weight bearing',
        'Previous injuries',
      ],
      recommendations: [
        'Low-impact exercise',
        'Weight management',
        'Joint mobility work',
      ],
      icon: '🦴',
      color: '#795548',
    },
    {
      id: 'osteoporosis',
      name: 'Osteoporosis',
      description: 'Risk of bone density loss and fractures.',
      riskLevel: age > 35 && complianceScore < 70 ? 'moderate' : 'low',
      riskPercentage: Math.max(
        3,
        Math.min(55, age * 0.4 + (100 - complianceScore) * 0.3),
      ),
      bioSystem: 'musculoskeletal' as const,
      organ: 'Bones',
      factors: [
        'Age',
        'Lack of weight-bearing exercise',
        'Poor nutrition',
        'Vitamin D deficiency',
      ],
      recommendations: [
        'Weight-bearing exercises',
        'Calcium and Vitamin D',
        'Resistance training',
      ],
      icon: '🦴',
      color: '#8D6E63',
    },

    // Neurological Risks
    {
      id: 'cognitive_decline',
      name: 'Cognitive Decline',
      description: 'Risk of memory and cognitive function deterioration.',
      riskLevel: age > 40 && complianceScore < 60 ? 'moderate' : 'low',
      riskPercentage: Math.max(
        2,
        Math.min(45, age * 0.3 + (100 - complianceScore) * 0.2),
      ),
      bioSystem: 'neurological' as const,
      organ: 'Brain',
      factors: ['Age', 'Physical inactivity', 'Poor sleep', 'Chronic stress'],
      recommendations: [
        'Regular exercise',
        'Mental stimulation',
        'Quality sleep',
        'Stress reduction',
      ],
      icon: '🧠',
      color: '#9C27B0',
    },

    // Respiratory Risks
    {
      id: 'respiratory_issues',
      name: 'Respiratory Issues',
      description: 'Risk of breathing difficulties and lung function decline.',
      riskLevel: complianceScore < 50 ? 'moderate' : 'low',
      riskPercentage: Math.max(
        5,
        Math.min(40, (100 - complianceScore) * 0.4 + age * 0.2),
      ),
      bioSystem: 'respiratory' as const,
      organ: 'Lungs',
      factors: ['Physical inactivity', 'Poor air quality', 'Stress', 'Age'],
      recommendations: [
        'Cardiovascular exercise',
        'Breathing exercises',
        'Clean air exposure',
      ],
      icon: '🫁',
      color: '#00BCD4',
    },

    // Digestive Risks
    {
      id: 'digestive_issues',
      name: 'Digestive Disorders',
      description:
        'Risk of gastrointestinal problems and digestive health issues.',
      riskLevel: complianceScore < 60 ? 'moderate' : 'low',
      riskPercentage: Math.max(
        8,
        Math.min(50, (100 - complianceScore) * 0.5 + age * 0.1),
      ),
      bioSystem: 'digestive' as const,
      organ: 'Gastrointestinal tract',
      factors: ['Poor diet', 'Stress', 'Irregular eating', 'Lack of fiber'],
      recommendations: [
        'Fiber-rich diet',
        'Regular meal times',
        'Stress management',
        'Hydration',
      ],
      icon: '🫄',
      color: '#4CAF50',
    },
  ];

  return risks;
};

const calculateRiskAssessment = (risks: HealthRisk[]): RiskAssessment => {
  const overallRiskScore =
    risks.reduce((sum, risk) => sum + risk.riskPercentage, 0) / risks.length;

  let overallRiskLevel: 'low' | 'moderate' | 'high' | 'critical' = 'low';
  if (overallRiskScore >= 70) overallRiskLevel = 'critical';
  else if (overallRiskScore >= 50) overallRiskLevel = 'high';
  else if (overallRiskScore >= 30) overallRiskLevel = 'moderate';

  // Group by bio-system
  const bioSystemRisks: {
    [key: string]: {
      averageRisk: number;
      riskLevel: 'low' | 'moderate' | 'high' | 'critical';
      riskCount: number;
    };
  } = {};

  risks.forEach(risk => {
    const bioSystem = risk.bioSystem as keyof typeof bioSystemRisks;
    if (!bioSystemRisks[bioSystem]) {
      bioSystemRisks[bioSystem] = {
        averageRisk: 0,
        riskLevel: 'low' as const,
        riskCount: 0,
      };
    }
    bioSystemRisks[bioSystem].averageRisk += risk.riskPercentage;
    bioSystemRisks[bioSystem].riskCount++;
  });

  // Calculate averages and levels
  Object.keys(bioSystemRisks).forEach(bioSystem => {
    const data = bioSystemRisks[bioSystem];
    data.averageRisk = data.averageRisk / data.riskCount;

    if (data.averageRisk >= 70) data.riskLevel = 'critical' as const;
    else if (data.averageRisk >= 50) data.riskLevel = 'high' as const;
    else if (data.averageRisk >= 30) data.riskLevel = 'moderate' as const;
    else data.riskLevel = 'low' as const;
  });

  // Get top 3 risks (full HealthRisk objects)
  const topRisks = [...risks]
    .sort((a, b) => b.riskPercentage - a.riskPercentage)
    .slice(0, 3);

  // Calculate improvement potential
  const improvementPotential = Math.min(
    100,
    Math.max(0, 100 - overallRiskScore),
  );

  return {
    overallRiskScore,
    riskLevel: overallRiskLevel,
    bioSystemRisks,
    topRisks,
    improvementPotential,
  };
};

const initialState: RiskState = {
  currentRisks: [],
  riskAssessment: {
    overallRiskScore: 0,
    riskLevel: 'low',
    bioSystemRisks: {},
    topRisks: [],
    improvementPotential: 0,
  },
  selectedBioSystem: null,
  lastAssessmentDate: '',
  riskHistory: [],
};

const riskSlice = createSlice({
  name: 'risk',
  initialState,
  reducers: {
    calculateRisks: (
      state,
      action: PayloadAction<{
        userProfile: UserProfile;
        wellnessGoals: WellnessGoal[];
      }>,
    ) => {
      const { userProfile, wellnessGoals } = action.payload;
      const risks = generateHealthRisks(userProfile, wellnessGoals);
      const assessment = calculateRiskAssessment(risks);

      state.currentRisks = risks;
      state.riskAssessment = assessment;
      state.lastAssessmentDate = new Date().toISOString();

      // Add to history
      const today = new Date().toISOString().split('T')[0];
      const bioSystemScores: { [bioSystem: string]: number } = {};
      Object.entries(assessment.bioSystemRisks).forEach(([bioSystem, data]) => {
        bioSystemScores[bioSystem] = data.averageRisk;
      });

      const existingIndex = state.riskHistory.findIndex(
        entry => entry.date === today,
      );
      const historyEntry = {
        date: today,
        overallScore: assessment.overallRiskScore,
        bioSystemScores,
      };

      if (existingIndex >= 0) {
        state.riskHistory[existingIndex] = historyEntry;
      } else {
        state.riskHistory.push(historyEntry);
        // Keep only last 30 days
        if (state.riskHistory.length > 30) {
          state.riskHistory = state.riskHistory.slice(-30);
        }
      }
    },

    setBioSystemFilter: (state, action: PayloadAction<string | null>) => {
      state.selectedBioSystem = action.payload;
    },

    updateRiskLevel: (
      state,
      action: PayloadAction<{ riskId: string; newPercentage: number }>,
    ) => {
      const { riskId, newPercentage } = action.payload;
      const risk = state.currentRisks.find(r => r.id === riskId);
      if (risk) {
        risk.riskPercentage = newPercentage;

        // Update risk level based on percentage
        if (newPercentage >= 70) risk.riskLevel = 'critical';
        else if (newPercentage >= 50) risk.riskLevel = 'high';
        else if (newPercentage >= 30) risk.riskLevel = 'moderate';
        else risk.riskLevel = 'low';

        // Recalculate assessment
        state.riskAssessment = calculateRiskAssessment(state.currentRisks);
      }
    },

    resetRiskAssessment: () => initialState,
  },
});

export const {
  calculateRisks,
  setBioSystemFilter,
  updateRiskLevel,
  resetRiskAssessment,
} = riskSlice.actions;

export default riskSlice.reducer;
