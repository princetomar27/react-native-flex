import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WellnessGoal, DashboardState } from '../../types';

const getDefaultGoalsForActivityLevel = (
  activityLevel: string,
): WellnessGoal[] => {
  const baseGoals: WellnessGoal[] = [
    {
      id: '1',
      title: 'Daily Steps',
      icon: '👟',
      current: 0,
      target:
        activityLevel === 'sedentary'
          ? 5000
          : activityLevel === 'lightly_active'
          ? 7500
          : activityLevel === 'moderately_active'
          ? 10000
          : 12000,
      unit: 'steps',
      color: '#FF6B6B',
      category: 'fitness',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Water Intake',
      icon: '💧',
      current: 0,
      target: 8,
      unit: 'glasses',
      color: '#4ECDC4',
      category: 'wellness',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Sleep Hours',
      icon: '😴',
      current: 0,
      target: 8,
      unit: 'hours',
      color: '#9B59B6',
      category: 'sleep',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Active Minutes',
      icon: '🏃‍♂️',
      current: 0,
      target:
        activityLevel === 'sedentary'
          ? 15
          : activityLevel === 'lightly_active'
          ? 30
          : activityLevel === 'moderately_active'
          ? 45
          : 60,
      unit: 'minutes',
      color: '#F39C12',
      category: 'fitness',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Fruits & Vegetables',
      icon: '🥗',
      current: 0,
      target: 5,
      unit: 'servings',
      color: '#27AE60',
      category: 'nutrition',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return baseGoals;
};

const initialState: DashboardState = {
  wellnessGoals: [],
  dailyStats: {
    stepsToday: 0,
    waterIntake: 0,
    sleepHours: 0,
    caloriesBurned: 0,
  },
  streaks: {
    workoutStreak: 0,
    nutritionStreak: 0,
    sleepStreak: 0,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    initializeGoals: (state, action: PayloadAction<string>) => {
      const activityLevel = action.payload;
      state.wellnessGoals = getDefaultGoalsForActivityLevel(activityLevel);
    },
    updateGoalProgress: (
      state,
      action: PayloadAction<{ goalId: string; current: number }>,
    ) => {
      const { goalId, current } = action.payload;
      const goal = state.wellnessGoals.find(g => g.id === goalId);
      if (goal) {
        goal.current = current;
        goal.updatedAt = new Date().toISOString();
      }
    },
    incrementGoalProgress: (
      state,
      action: PayloadAction<{ goalId: string; increment: number }>,
    ) => {
      const { goalId, increment } = action.payload;
      const goal = state.wellnessGoals.find(g => g.id === goalId);
      if (goal) {
        goal.current = Math.min(goal.current + increment, goal.target * 1.5); // Allow 150% of target
        goal.updatedAt = new Date().toISOString();
      }
    },
    addCustomGoal: (
      state,
      action: PayloadAction<
        Omit<WellnessGoal, 'id' | 'createdAt' | 'updatedAt'>
      >,
    ) => {
      const newGoal: WellnessGoal = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.wellnessGoals.push(newGoal);
    },
    removeGoal: (state, action: PayloadAction<string>) => {
      state.wellnessGoals = state.wellnessGoals.filter(
        g => g.id !== action.payload,
      );
    },
    updateDailyStats: (
      state,
      action: PayloadAction<Partial<DashboardState['dailyStats']>>,
    ) => {
      state.dailyStats = { ...state.dailyStats, ...action.payload };
    },
    updateStreaks: (
      state,
      action: PayloadAction<Partial<DashboardState['streaks']>>,
    ) => {
      state.streaks = { ...state.streaks, ...action.payload };
    },
    resetDailyProgress: state => {
      state.wellnessGoals.forEach(goal => {
        goal.current = 0;
        goal.updatedAt = new Date().toISOString();
      });
      state.dailyStats = {
        stepsToday: 0,
        waterIntake: 0,
        sleepHours: 0,
        caloriesBurned: 0,
      };
    },
  },
});

export const {
  initializeGoals,
  updateGoalProgress,
  incrementGoalProgress,
  addCustomGoal,
  removeGoal,
  updateDailyStats,
  updateStreaks,
  resetDailyProgress,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
