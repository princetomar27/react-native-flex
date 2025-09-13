import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelectorTyped } from '../../store/hooks';
import {
  updateProfile,
  nextStep,
  previousStep,
} from '../../store/slices/onboardingSlice';
import UserInfoPresentation from '../presentation/UserInfoPresentation';
import { UserProfile } from '../../types';

export default function UserInfoContainer() {
  const dispatch = useAppDispatch();
  const onboardingState = useAppSelectorTyped(state => state.onboarding);
  const [formData, setFormData] = useState<Partial<UserProfile>>(
    onboardingState.userProfile,
  );
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    setFormData(onboardingState.userProfile);
  }, [onboardingState.userProfile]);

  const validateField = (field: keyof UserProfile, value: string): boolean => {
    if (field === 'name' && (!value || value.trim() === '')) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: 'Please enter your name',
      }));
      return false;
    }
    if (field === 'age') {
      const age = Number(value);
      if (!value || isNaN(age) || age <= 0 || age >= 150) {
        setValidationErrors(prev => ({
          ...prev,
          [field]: 'Please enter a valid age',
        }));
        return false;
      }
    }
    if (field === 'phone' && (!value || value.trim() === '')) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: 'Please enter your phone number',
      }));
      return false;
    }
    if (field === 'gender' && (!value || value.trim() === '')) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: 'Please select your gender',
      }));
      return false;
    }
    if (field === 'activityLevel' && (!value || value.trim() === '')) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: 'Please select your activity level',
      }));
      return false;
    }

    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    return true;
  };

  const validateForm = (data: Partial<UserProfile>): boolean => {
    const errors: { [key: string]: string } = {};
    let isValid = true;

    if (!data.name?.trim()) {
      errors.name = 'Please enter your name';
      isValid = false;
    }
    if (!data.age?.trim() || isNaN(Number(data.age)) || Number(data.age) <= 0) {
      errors.age = 'Please enter a valid age';
      isValid = false;
    }
    if (!data.phone?.trim()) {
      errors.phone = 'Please enter your phone number';
      isValid = false;
    }
    if (!data.gender?.trim()) {
      errors.gender = 'Please select your gender';
      isValid = false;
    }
    if (!data.activityLevel?.trim()) {
      errors.activityLevel = 'Please select your activity level';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    validateField(field, value);
  };

  const handleContinue = () => {
    if (validateForm(formData)) {
      dispatch(updateProfile(formData));
      dispatch(nextStep());
    }
  };

  const handleBack = () => {
    dispatch(previousStep());
  };

  return (
    <UserInfoPresentation
      formData={formData}
      validationErrors={validationErrors}
      onInputChange={handleInputChange}
      onBack={handleBack}
      onContinue={handleContinue}
    />
  );
}
