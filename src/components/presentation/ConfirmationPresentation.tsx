import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { UserProfile } from '../../types';

interface ConfirmationPresentationProps {
  userProfile: UserProfile;
  onStartJourney: () => void;
}

export default function ConfirmationPresentation({
  userProfile,
  onStartJourney,
}: ConfirmationPresentationProps) {
  const getActivityLevelText = (level: string) => {
    const activityMap: { [key: string]: string } = {
      sedentary: 'Sedentary',
      lightly_active: 'Lightly Active',
      moderately_active: 'Moderately Active',
      very_active: 'Very Active',
      extremely_active: 'Extremely Active',
    };
    return activityMap[level] || level;
  };

  const getGenderText = (gender: string) => {
    const genderMap: { [key: string]: string } = {
      male: 'Male',
      female: 'Female',
      other: 'Other',
    };
    return genderMap[gender] || gender;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🎉</Text>
          </View>

          <Text style={styles.title}>
            Hi {userProfile.name}, your profile is ready!
          </Text>
          <Text style={styles.subtitle}>
            We've set up your personalized fitness journey. Let's start building
            healthy habits together!
          </Text>

          <View style={styles.profileCard}>
            <Text style={styles.cardTitle}>Your Profile Summary</Text>

            <View style={styles.profileItem}>
              <Text style={styles.profileLabel}>Name</Text>
              <Text style={styles.profileValue}>{userProfile.name}</Text>
            </View>

            <View style={styles.profileItem}>
              <Text style={styles.profileLabel}>Age</Text>
              <Text style={styles.profileValue}>
                {userProfile.age} years old
              </Text>
            </View>

            <View style={styles.profileItem}>
              <Text style={styles.profileLabel}>Gender</Text>
              <Text style={styles.profileValue}>
                {getGenderText(userProfile.gender)}
              </Text>
            </View>

            <View style={styles.profileItem}>
              <Text style={styles.profileLabel}>Activity Level</Text>
              <Text style={styles.profileValue}>
                {getActivityLevelText(userProfile.activityLevel)}
              </Text>
            </View>

            {userProfile.height && (
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Height</Text>
                <Text style={styles.profileValue}>{userProfile.height}</Text>
              </View>
            )}

            {userProfile.weight && (
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Weight</Text>
                <Text style={styles.profileValue}>{userProfile.weight}</Text>
              </View>
            )}
          </View>

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>What's Next?</Text>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>📱</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Track Daily Activities</Text>
                <Text style={styles.featureDescription}>
                  Log your workouts, steps, and daily activities
                </Text>
              </View>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>🎯</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Set Personal Goals</Text>
                <Text style={styles.featureDescription}>
                  Create and track your fitness milestones
                </Text>
              </View>
            </View>

            <View style={styles.feature}>
              <Text style={styles.featureIcon}>📊</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>View Progress</Text>
                <Text style={styles.featureDescription}>
                  Monitor your improvement with detailed analytics
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={onStartJourney}>
          <Text style={styles.startButtonText}>Start Your Journey</Text>
        </TouchableOpacity>
      </View>
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
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'center',
  },
  icon: {
    fontSize: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d5a27',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d5a27',
    marginBottom: 16,
    textAlign: 'center',
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  profileValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d5a27',
    marginBottom: 20,
    textAlign: 'center',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
