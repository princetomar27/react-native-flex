import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProgressState } from '../../types';

const initialState: ProgressState = {
  progressHistory: [],
  weeklyTargets: {},
  monthlyTargets: {},
  currentStreak: 0,
  longestStreak: 0,
  selectedTimeRange: 'today',
  selectedCategory: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    recordDailyProgress: (
      state,
      action: PayloadAction<{
        date: string;
        completedGoals: number;
        totalGoals: number;
        goalProgress: { [goalId: string]: number };
      }>,
    ) => {
      const existingIndex = state.progressHistory.findIndex(
        entry => entry.date === action.payload.date,
      );

      if (existingIndex >= 0) {
        state.progressHistory[existingIndex] = action.payload;
      } else {
        state.progressHistory.push(action.payload);
        // Keep only last 90 days
        if (state.progressHistory.length > 90) {
          state.progressHistory = state.progressHistory.slice(-90);
        }
      }

      // Update streak
      const today = new Date().toISOString().split('T')[0];
      const todayEntry = state.progressHistory.find(
        entry => entry.date === today,
      );

      if (todayEntry && todayEntry.completedGoals === todayEntry.totalGoals) {
        // Calculate current streak
        let streak = 0;
        const sortedHistory = [...state.progressHistory].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        for (const entry of sortedHistory) {
          if (entry.completedGoals === entry.totalGoals) {
            streak++;
          } else {
            break;
          }
        }

        state.currentStreak = streak;
        if (streak > state.longestStreak) {
          state.longestStreak = streak;
        }
      }
    },

    setWeeklyTargets: (
      state,
      action: PayloadAction<{ [goalId: string]: number }>,
    ) => {
      state.weeklyTargets = action.payload;
    },

    setMonthlyTargets: (
      state,
      action: PayloadAction<{ [goalId: string]: number }>,
    ) => {
      state.monthlyTargets = action.payload;
    },

    updateStreak: (state, action: PayloadAction<number>) => {
      state.currentStreak = action.payload;
      if (action.payload > state.longestStreak) {
        state.longestStreak = action.payload;
      }
    },

    setTimeRange: (
      state,
      action: PayloadAction<'today' | 'week' | 'month'>,
    ) => {
      state.selectedTimeRange = action.payload;
    },

    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },

    resetProgress: () => initialState,

    initializeWeeklyTargets: (
      state,
      action: PayloadAction<{ [goalId: string]: number }>,
    ) => {
      if (Object.keys(state.weeklyTargets).length === 0) {
        // Set weekly targets as 7x daily targets
        const weeklyTargets: { [goalId: string]: number } = {};
        Object.entries(action.payload).forEach(([goalId, dailyTarget]) => {
          weeklyTargets[goalId] = dailyTarget * 7;
        });
        state.weeklyTargets = weeklyTargets;
      }
    },

    initializeMonthlyTargets: (
      state,
      action: PayloadAction<{ [goalId: string]: number }>,
    ) => {
      if (Object.keys(state.monthlyTargets).length === 0) {
        // Set monthly targets as 30x daily targets
        const monthlyTargets: { [goalId: string]: number } = {};
        Object.entries(action.payload).forEach(([goalId, dailyTarget]) => {
          monthlyTargets[goalId] = dailyTarget * 30;
        });
        state.monthlyTargets = monthlyTargets;
      }
    },
  },
});

export const {
  recordDailyProgress,
  setWeeklyTargets,
  setMonthlyTargets,
  updateStreak,
  setTimeRange,
  setCategoryFilter,
  resetProgress,
  initializeWeeklyTargets,
  initializeMonthlyTargets,
} = progressSlice.actions;

export default progressSlice.reducer;
