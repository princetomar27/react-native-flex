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

export interface WellnessGoal {
  id: string;
  title: string;
  icon: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  category: 'fitness' | 'nutrition' | 'wellness' | 'sleep';
  createdAt: string;
  updatedAt: string;
}

export interface ProgressStats {
  today: {
    completed: number;
    total: number;
    percentage: number;
  };
  week: {
    completed: number;
    total: number;
    percentage: number;
    streak: number;
  };
  month: {
    completed: number;
    total: number;
    percentage: number;
    bestWeek: number;
  };
  againstPlan: {
    onTrack: number;
    behind: number;
    ahead: number;
    totalGoals: number;
  };
}

export interface ProgressState {
  progressHistory: {
    date: string;
    completedGoals: number;
    totalGoals: number;
    goalProgress: { [goalId: string]: number };
  }[];
  weeklyTargets: { [goalId: string]: number };
  monthlyTargets: { [goalId: string]: number };
  currentStreak: number;
  longestStreak: number;
  selectedTimeRange: 'today' | 'week' | 'month';
  selectedCategory: string | null;
}

export interface DashboardState {
  wellnessGoals: WellnessGoal[];
  dailyStats: {
    stepsToday: number;
    waterIntake: number;
    sleepHours: number;
    caloriesBurned: number;
  };
  streaks: {
    workoutStreak: number;
    nutritionStreak: number;
    sleepStreak: number;
  };
}

export interface OnboardingState {
  currentStep: number;
  isCompleted: boolean;
  userProfile: UserProfile;
}

export type OnboardingStep = 'welcome' | 'userInfo' | 'confirmation';
