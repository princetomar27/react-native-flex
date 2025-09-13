import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { UserProfile } from '../types';

export interface ValidationRule {
  field: keyof UserProfile;
  required?: boolean;
  validator?: (value: string) => boolean;
  errorMessage: string;
}

export interface WithValidationProps {
  validationErrors: { [key: string]: string };
  validateField: (field: keyof UserProfile, value: string) => boolean;
  validateForm: (data: Partial<UserProfile>) => boolean;
  clearValidationError: (field: keyof UserProfile) => void;
  clearAllValidationErrors: () => void;
}

export function withValidation<P extends object>(
  Component: React.ComponentType<P & WithValidationProps>,
  validationRules: ValidationRule[],
) {
  return function WrappedComponent(props: P) {
    const [validationErrors, setValidationErrors] = useState<{
      [key: string]: string;
    }>({});

    const validateField = useCallback(
      (field: keyof UserProfile, value: string): boolean => {
        const rule = validationRules.find(r => r.field === field);
        if (!rule) return true;

        if (rule.required && (!value || value.trim() === '')) {
          setValidationErrors(prev => ({
            ...prev,
            [field]: rule.errorMessage,
          }));
          return false;
        }

        if (rule.validator && !rule.validator(value)) {
          setValidationErrors(prev => ({
            ...prev,
            [field]: rule.errorMessage,
          }));
          return false;
        }

        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
        return true;
      },
      [],
    );

    const validateForm = useCallback((data: Partial<UserProfile>): boolean => {
      let isValid = true;
      const errors: { [key: string]: string } = {};

      validationRules.forEach(rule => {
        const value = data[rule.field];
        const stringValue = Array.isArray(value)
          ? value.join('')
          : String(value || '');

        if (rule.required && (!stringValue || stringValue.trim() === '')) {
          errors[rule.field] = rule.errorMessage;
          isValid = false;
        } else if (
          rule.validator &&
          stringValue &&
          !rule.validator(stringValue)
        ) {
          errors[rule.field] = rule.errorMessage;
          isValid = false;
        }
      });

      setValidationErrors(errors);

      if (!isValid) {
        const firstError = Object.values(errors)[0];
        Alert.alert('Validation Error', firstError);
      }

      return isValid;
    }, []);

    const clearValidationError = useCallback((field: keyof UserProfile) => {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }, []);

    const clearAllValidationErrors = useCallback(() => {
      setValidationErrors({});
    }, []);

    return (
      <Component
        {...props}
        validationErrors={validationErrors}
        validateField={validateField}
        validateForm={validateForm}
        clearValidationError={clearValidationError}
        clearAllValidationErrors={clearAllValidationErrors}
      />
    );
  };
}
