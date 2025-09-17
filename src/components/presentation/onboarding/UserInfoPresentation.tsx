import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { UserProfile } from '../../../types';

const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const ACTIVITY_LEVELS = [
  {
    label: 'Sedentary',
    value: 'sedentary',
    description: 'Little to no exercise',
  },
  {
    label: 'Lightly Active',
    value: 'lightly_active',
    description: 'Light exercise 1-3 days/week',
  },
  {
    label: 'Moderately Active',
    value: 'moderately_active',
    description: 'Moderate exercise 3-5 days/week',
  },
  {
    label: 'Very Active',
    value: 'very_active',
    description: 'Heavy exercise 6-7 days/week',
  },
  {
    label: 'Extremely Active',
    value: 'extremely_active',
    description: 'Very heavy exercise, physical job',
  },
];

interface UserInfoPresentationProps {
  formData: Partial<UserProfile>;
  validationErrors: { [key: string]: string };
  onInputChange: (field: keyof UserProfile, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function UserInfoPresentation({
  formData,
  validationErrors,
  onInputChange,
  onBack,
  onContinue,
}: UserInfoPresentationProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Tell us about yourself</Text>
          <Text style={styles.subtitle}>
            This helps us personalize your fitness journey
          </Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={[
                  styles.input,
                  validationErrors.name && styles.inputError,
                ]}
                value={formData.name}
                onChangeText={text => onInputChange('name', text)}
                placeholder="Enter your full name"
                autoCapitalize="words"
              />
              {validationErrors.name && (
                <Text style={styles.errorText}>{validationErrors.name}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age *</Text>
              <TextInput
                style={[
                  styles.input,
                  validationErrors.age && styles.inputError,
                ]}
                value={formData.age}
                onChangeText={text => onInputChange('age', text)}
                placeholder="Enter your age"
                keyboardType="numeric"
                maxLength={3}
              />
              {validationErrors.age && (
                <Text style={styles.errorText}>{validationErrors.age}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number *</Text>
              <TextInput
                style={[
                  styles.input,
                  validationErrors.phone && styles.inputError,
                ]}
                value={formData.phone}
                onChangeText={text => onInputChange('phone', text)}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
              {validationErrors.phone && (
                <Text style={styles.errorText}>{validationErrors.phone}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender *</Text>
              <View style={styles.optionsContainer}>
                {GENDER_OPTIONS.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.option,
                      formData.gender === option.value && styles.selectedOption,
                    ]}
                    onPress={() => onInputChange('gender', option.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        formData.gender === option.value &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {validationErrors.gender && (
                <Text style={styles.errorText}>{validationErrors.gender}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Activity Level *</Text>
              <View style={styles.activityContainer}>
                {ACTIVITY_LEVELS.map(level => (
                  <TouchableOpacity
                    key={level.value}
                    style={[
                      styles.activityOption,
                      formData.activityLevel === level.value &&
                        styles.selectedActivityOption,
                    ]}
                    onPress={() => onInputChange('activityLevel', level.value)}
                  >
                    <Text
                      style={[
                        styles.activityLabel,
                        formData.activityLevel === level.value &&
                          styles.selectedActivityLabel,
                      ]}
                    >
                      {level.label}
                    </Text>
                    <Text
                      style={[
                        styles.activityDescription,
                        formData.activityLevel === level.value &&
                          styles.selectedActivityDescription,
                      ]}
                    >
                      {level.description}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {validationErrors.activityLevel && (
                <Text style={styles.errorText}>
                  {validationErrors.activityLevel}
                </Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Height (optional)</Text>
              <TextInput
                style={styles.input}
                value={formData.height}
                onChangeText={text => onInputChange('height', text)}
                placeholder="e.g., 5'8\' or 173cm"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Weight (optional)</Text>
              <TextInput
                style={styles.input}
                value={formData.weight}
                onChangeText={text => onInputChange('weight', text)}
                placeholder="e.g., 70kg or 154lbs"
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={onContinue}>
          <Text style={styles.nextButtonText}>Continue</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d5a27',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  selectedOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: 'white',
    fontWeight: '600',
  },
  activityContainer: {
    gap: 12,
  },
  activityOption: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  selectedActivityOption: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4CAF50',
  },
  activityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  selectedActivityLabel: {
    color: '#2d5a27',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
  },
  selectedActivityDescription: {
    color: '#4CAF50',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 16,
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  nextButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  nextButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
