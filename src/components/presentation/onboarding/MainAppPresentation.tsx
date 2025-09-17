import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { UserProfile } from '../../../types';

interface MainAppPresentationProps {
  userProfile: UserProfile;
  onResetProfile: () => void;
}

export default function MainAppPresentation({
  userProfile,
  onResetProfile,
}: MainAppPresentationProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>
              Welcome back, {userProfile.name}! 🌱
            </Text>
            <Text style={styles.subtitle}>
              Ready to continue your fitness journey?
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Your Profile</Text>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Activity Level</Text>
              <Text style={styles.statValue}>
                {userProfile.activityLevel
                  .replace('_', ' ')
                  .replace(/\b\w/g, l => l.toUpperCase())}
              </Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Age</Text>
              <Text style={styles.statValue}>{userProfile.age} years old</Text>
            </View>

            {userProfile.height && (
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Height</Text>
                <Text style={styles.statValue}>{userProfile.height}</Text>
              </View>
            )}

            {userProfile.weight && (
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Weight</Text>
                <Text style={styles.statValue}>{userProfile.weight}</Text>
              </View>
            )}
          </View>

          <View style={styles.quickActions}>
            <Text style={styles.actionsTitle}>Quick Actions</Text>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🏃‍♂️</Text>
              <Text style={styles.actionText}>Start Workout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionText}>View Progress</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>🎯</Text>
              <Text style={styles.actionText}>Set Goals</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionIcon}>📱</Text>
              <Text style={styles.actionText}>Track Activity</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={onResetProfile}
            >
              <Text style={styles.resetButtonText}>Reset Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fffe',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d5a27',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  statsContainer: {
    marginBottom: 32,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d5a27',
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  quickActions: {
    marginBottom: 32,
  },
  actionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d5a27',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  actionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
  },
  resetButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  resetButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
