import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelectorTyped } from '../../../store/hooks';
import {
  setTimeRange,
  setCategoryFilter,
  recordDailyProgress,
  initializeWeeklyTargets,
  initializeMonthlyTargets,
} from '../../../store/slices/progressSlice';
import ProgressPresentation from '../../presentation/progress/ProgressPresentation';
import { ProgressStats } from '../../../types';

interface ProgressContainerProps {
  onBackPress: () => void;
}

export default function ProgressContainer({
  onBackPress,
}: ProgressContainerProps) {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelectorTyped(
    state => state.onboarding.userProfile,
  );
  const wellnessGoals = useAppSelectorTyped(
    state => state.dashboard.wellnessGoals,
  );
  const progressState = useAppSelectorTyped(state => state.progress);

  // Initialize targets when goals are available
  useEffect(() => {
    if (wellnessGoals.length > 0) {
      const dailyTargets: { [goalId: string]: number } = {};
      wellnessGoals.forEach(goal => {
        dailyTargets[goal.id] = goal.target;
      });

      dispatch(initializeWeeklyTargets(dailyTargets));
      dispatch(initializeMonthlyTargets(dailyTargets));
    }
  }, [dispatch, wellnessGoals]);

  // Record today's progress
  useEffect(() => {
    if (wellnessGoals.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const completedGoals = wellnessGoals.filter(
        goal => goal.current / goal.target >= 1,
      ).length;

      const goalProgress: { [goalId: string]: number } = {};
      wellnessGoals.forEach(goal => {
        goalProgress[goal.id] = goal.current;
      });

      dispatch(
        recordDailyProgress({
          date: today,
          completedGoals,
          totalGoals: wellnessGoals.length,
          goalProgress,
        }),
      );
    }
  }, [dispatch, wellnessGoals]);

  const progressStats: ProgressStats = useMemo(() => {
    const today = new Date();

    // Calculate today's stats
    const todayCompleted = wellnessGoals.filter(
      goal => goal.current / goal.target >= 1,
    ).length;
    const todayTotal = wellnessGoals.length;
    const todayPercentage =
      todayTotal > 0 ? (todayCompleted / todayTotal) * 100 : 0;

    // Calculate week's stats
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEntries = progressState.progressHistory.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekStart && entryDate <= today;
    });

    const weekCompleted = weekEntries.reduce(
      (sum, entry) => sum + entry.completedGoals,
      0,
    );
    const weekTotal = weekEntries.reduce(
      (sum, entry) => sum + entry.totalGoals,
      0,
    );
    const weekPercentage =
      weekTotal > 0 ? (weekCompleted / weekTotal) * 100 : 0;

    // Calculate month's stats
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEntries = progressState.progressHistory.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= monthStart && entryDate <= today;
    });

    const monthCompleted = monthEntries.reduce(
      (sum, entry) => sum + entry.completedGoals,
      0,
    );
    const monthTotal = monthEntries.reduce(
      (sum, entry) => sum + entry.totalGoals,
      0,
    );
    const monthPercentage =
      monthTotal > 0 ? (monthCompleted / monthTotal) * 100 : 0;

    // Calculate best week in month
    const bestWeek = Math.max(weekPercentage, 0);

    // Calculate against plan stats
    let onTrack = 0;
    let behind = 0;
    let ahead = 0;

    wellnessGoals.forEach(goal => {
      const progress = goal.current / goal.target;
      if (progress >= 0.8 && progress <= 1.2) {
        onTrack++;
      } else if (progress < 0.8) {
        behind++;
      } else {
        ahead++;
      }
    });

    return {
      today: {
        completed: todayCompleted,
        total: todayTotal,
        percentage: todayPercentage,
      },
      week: {
        completed: weekCompleted,
        total: weekTotal,
        percentage: weekPercentage,
        streak: progressState.currentStreak,
      },
      month: {
        completed: monthCompleted,
        total: monthTotal,
        percentage: monthPercentage,
        bestWeek,
      },
      againstPlan: {
        onTrack,
        behind,
        ahead,
        totalGoals: wellnessGoals.length,
      },
    };
  }, [
    wellnessGoals,
    progressState.progressHistory,
    progressState.currentStreak,
  ]);

  const handleTimeRangeChange = (range: 'today' | 'week' | 'month') => {
    dispatch(setTimeRange(range));
  };

  const handleCategoryFilter = (category: string | null) => {
    dispatch(setCategoryFilter(category));
  };

  return (
    <ProgressPresentation
      userProfile={userProfile}
      wellnessGoals={wellnessGoals}
      progressStats={progressStats}
      onBackPress={onBackPress}
      onGoalCategoryFilter={handleCategoryFilter}
      onTimeRangeChange={handleTimeRangeChange}
      selectedTimeRange={progressState.selectedTimeRange}
      selectedCategory={progressState.selectedCategory}
    />
  );
}
