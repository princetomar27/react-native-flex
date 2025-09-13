export interface UserProfile {
  name: string;
  age: string;
  phone: string;
  gender: 'male' | 'female' | 'other' | '';
  activityLevel:
    | 'sedentary'
    | 'lightly_active'
    | 'moderately_active'
    | 'very_active'
    | 'extremely_active'
    | '';
  height?: string;
  weight?: string;
  fitnessGoals?: string[];
}

export interface OnboardingState {
  currentStep: number;
  isCompleted: boolean;
  userProfile: UserProfile;
}

export type OnboardingStep = 'welcome' | 'userInfo' | 'confirmation';
