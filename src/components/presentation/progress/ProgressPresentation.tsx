import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { UserProfile, WellnessGoal } from '../../../types';

interface ProgressStats {
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

interface ProgressPresentationProps {
  userProfile: UserProfile;
  wellnessGoals: WellnessGoal[];
  progressStats: ProgressStats;
  onBackPress: () => void;
  onGoalCategoryFilter: (category: string | null) => void;
  onTimeRangeChange: (range: 'today' | 'week' | 'month') => void;
  selectedTimeRange: 'today' | 'week' | 'month';
  selectedCategory: string | null;
}

export default function ProgressPresentation({
  wellnessGoals,
  progressStats,
  onBackPress,
  onGoalCategoryFilter,
  onTimeRangeChange,
  selectedTimeRange,
  selectedCategory,
}: ProgressPresentationProps) {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    if (percentage >= 40) return '#FFC107';
    return '#F44336';
  };

  const renderTimeRangeSelector = () => {
    const ranges = [
      { key: 'today', label: 'Today' },
      { key: 'week', label: 'This Week' },
      { key: 'month', label: 'This Month' },
    ] as const;

    return (
      <View style={styles.timeRangeContainer}>
        {ranges.map(range => (
          <TouchableOpacity
            key={range.key}
            style={[
              styles.timeRangeButton,
              selectedTimeRange === range.key && styles.activeTimeRange,
            ]}
            onPress={() => onTimeRangeChange(range.key)}
          >
            <Text
              style={[
                styles.timeRangeText,
                selectedTimeRange === range.key && styles.activeTimeRangeText,
              ]}
            >
              {range.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderCategoryFilter = () => {
    const categories = [
      { key: null, label: 'All', icon: '📊' },
      { key: 'fitness', label: 'Fitness', icon: '🏃‍♂️' },
      { key: 'nutrition', label: 'Nutrition', icon: '🥗' },
      { key: 'wellness', label: 'Wellness', icon: '💧' },
      { key: 'sleep', label: 'Sleep', icon: '😴' },
    ];

    const renderCategoryItem: ListRenderItem<(typeof categories)[0]> = ({
      item,
    }) => (
      <TouchableOpacity
        style={[
          styles.categoryButton,
          selectedCategory === item.key && styles.activeCategoryButton,
        ]}
        onPress={() => onGoalCategoryFilter(item.key)}
      >
        <Text style={styles.categoryIcon}>{item.icon}</Text>
        <Text
          style={[
            styles.categoryText,
            selectedCategory === item.key && styles.activeCategoryText,
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.key || 'all'}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScrollView}
        contentContainerStyle={styles.categoryContainer}
      />
    );
  };

  const renderProgressOverview = () => {
    const currentStats = progressStats[selectedTimeRange];
    const progressColor = getProgressColor(currentStats.percentage);

    return (
      <View style={styles.overviewCard}>
        <View style={styles.overviewHeader}>
          <Text style={styles.overviewTitle}>
            {selectedTimeRange === 'today' && "Today's Progress"}
            {selectedTimeRange === 'week' && "This Week's Progress"}
            {selectedTimeRange === 'month' && "This Month's Progress"}
          </Text>
          <View style={styles.overviewStats}>
            <Text style={[styles.overviewPercentage, { color: progressColor }]}>
              {Math.round(currentStats.percentage)}%
            </Text>
            <Text style={styles.overviewSubtext}>
              {currentStats.completed} of {currentStats.total} goals
            </Text>
          </View>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${currentStats.percentage}%`,
                  backgroundColor: progressColor,
                },
              ]}
            />
          </View>
        </View>

        {selectedTimeRange === 'week' && (
          <Text style={styles.streakText}>
            🔥 {progressStats.week.streak} day streak
          </Text>
        )}

        {selectedTimeRange === 'month' && (
          <Text style={styles.streakText}>
            ⭐ Best week: {progressStats.month.bestWeek}% completion
          </Text>
        )}
      </View>
    );
  };

  const renderAgainstPlanStats = () => {
    const { againstPlan } = progressStats;

    return (
      <View style={styles.planStatsCard}>
        <Text style={styles.cardTitle}>Progress Against Plan</Text>

        <View style={styles.planStatsGrid}>
          <View style={styles.planStatItem}>
            <View
              style={[styles.planStatCircle, { backgroundColor: '#4CAF50' }]}
            >
              <Text style={styles.planStatNumber}>{againstPlan.onTrack}</Text>
            </View>
            <Text style={styles.planStatLabel}>On Track</Text>
          </View>

          <View style={styles.planStatItem}>
            <View
              style={[styles.planStatCircle, { backgroundColor: '#FF9800' }]}
            >
              <Text style={styles.planStatNumber}>{againstPlan.behind}</Text>
            </View>
            <Text style={styles.planStatLabel}>Behind</Text>
          </View>

          <View style={styles.planStatItem}>
            <View
              style={[styles.planStatCircle, { backgroundColor: '#2196F3' }]}
            >
              <Text style={styles.planStatNumber}>{againstPlan.ahead}</Text>
            </View>
            <Text style={styles.planStatLabel}>Ahead</Text>
          </View>
        </View>

        <View style={styles.planProgressBar}>
          <View
            style={[
              styles.planSegment,
              {
                flex: againstPlan.onTrack,
                backgroundColor: '#4CAF50',
              },
            ]}
          />
          <View
            style={[
              styles.planSegment,
              {
                flex: againstPlan.behind,
                backgroundColor: '#FF9800',
              },
            ]}
          />
          <View
            style={[
              styles.planSegment,
              {
                flex: againstPlan.ahead,
                backgroundColor: '#2196F3',
              },
            ]}
          />
        </View>
      </View>
    );
  };

  const renderGoalsList = () => {
    const filteredGoals = selectedCategory
      ? wellnessGoals.filter(goal => goal.category === selectedCategory)
      : wellnessGoals;

    const renderGoalItem: ListRenderItem<WellnessGoal> = ({ item: goal }) => {
      const progress = Math.min((goal.current / goal.target) * 100, 100);
      const progressColor = getProgressColor(progress);

      return (
        <View style={styles.goalItem}>
          <View style={styles.goalItemHeader}>
            <View style={styles.goalItemTitleContainer}>
              <Text style={styles.goalItemIcon}>{goal.icon}</Text>
              <Text style={styles.goalItemTitle}>{goal.title}</Text>
            </View>
            <Text style={[styles.goalItemPercentage, { color: progressColor }]}>
              {Math.round(progress)}%
            </Text>
          </View>

          <View style={styles.goalItemProgressBar}>
            <View
              style={[
                styles.goalItemProgressFill,
                {
                  width: `${progress}%`,
                  backgroundColor: progressColor,
                },
              ]}
            />
          </View>

          <Text style={styles.goalItemStats}>
            {goal.current} / {goal.target} {goal.unit}
          </Text>
        </View>
      );
    };

    return (
      <View style={styles.goalsListCard}>
        <Text style={styles.cardTitle}>Individual Goal Progress</Text>
        <FlatList
          data={filteredGoals}
          renderItem={renderGoalItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.goalSeparator} />}
        />
      </View>
    );
  };

  const renderInsights = () => {
    const insights = [];

    if (progressStats.today.percentage >= 80) {
      insights.push({
        id: '1',
        text: "🎉 Great job! You're crushing your goals today!",
      });
    } else if (progressStats.today.percentage >= 50) {
      insights.push({
        id: '2',
        text: "💪 You're on track! Keep pushing forward!",
      });
    } else {
      insights.push({
        id: '3',
        text: '🌱 Every step counts! Focus on one goal at a time.',
      });
    }

    if (progressStats.week.streak >= 3) {
      insights.push({
        id: '4',
        text: `🔥 Amazing ${progressStats.week.streak}-day streak! You're building great habits!`,
      });
    }

    if (progressStats.againstPlan.ahead > 0) {
      insights.push({
        id: '5',
        text: `⭐ You're ahead on ${progressStats.againstPlan.ahead} goals! Fantastic progress!`,
      });
    }

    const renderInsightItem: ListRenderItem<{ id: string; text: string }> = ({
      item,
    }) => (
      <View style={styles.insightItem}>
        <Text style={styles.insightText}>{item.text}</Text>
      </View>
    );

    return (
      <View style={styles.insightsCard}>
        <Text style={styles.cardTitle}>Personal Insights</Text>
        <FlatList
          data={insights}
          renderItem={renderInsightItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View style={styles.insightSeparator} />
          )}
        />
      </View>
    );
  };

  const mainSections = [
    { id: 'timeRange', type: 'timeRange' },
    { id: 'overview', type: 'overview' },
    { id: 'categoryFilter', type: 'categoryFilter' },
    { id: 'againstPlan', type: 'againstPlan' },
    { id: 'goalsList', type: 'goalsList' },
    { id: 'insights', type: 'insights' },
  ];

  const renderMainSection: ListRenderItem<(typeof mainSections)[0]> = ({
    item,
  }) => {
    switch (item.type) {
      case 'timeRange':
        return renderTimeRangeSelector();
      case 'overview':
        return renderProgressOverview();
      case 'categoryFilter':
        return renderCategoryFilter();
      case 'againstPlan':
        return renderAgainstPlanStats();
      case 'goalsList':
        return renderGoalsList();
      case 'insights':
        return renderInsights();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Progress View</Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={mainSections}
        renderItem={renderMainSection}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainContentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fffe',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#333',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d5a27',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  mainContentContainer: {
    paddingBottom: 20,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeTimeRange: {
    backgroundColor: '#4CAF50',
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTimeRangeText: {
    color: 'white',
  },
  categoryScrollView: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoryContainer: {
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    minWidth: 80,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeCategoryButton: {
    backgroundColor: '#4CAF50',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  activeCategoryText: {
    color: 'white',
  },
  overviewCard: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  overviewStats: {
    alignItems: 'flex-end',
  },
  overviewPercentage: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  overviewSubtext: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  streakText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  planStatsCard: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  planStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  planStatItem: {
    alignItems: 'center',
  },
  planStatCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  planStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  planStatLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  planProgressBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  planSegment: {
    height: '100%',
  },
  goalsListCard: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  goalItem: {
    paddingVertical: 16,
  },
  goalSeparator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
  },
  goalItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalItemTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalItemIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  goalItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  goalItemPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalItemProgressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  goalItemProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  goalItemStats: {
    fontSize: 14,
    color: '#666',
  },
  insightsCard: {
    margin: 20,
    marginTop: 0,
    marginBottom: 40,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  insightItem: {
    backgroundColor: '#f8fffe',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  insightSeparator: {
    height: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
