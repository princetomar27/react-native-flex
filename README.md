# Fyxlife Fitness Tracking App 🌱

A comprehensive fitness tracking mobile app built with React Native, featuring a complete onboarding flow and modern UI/UX design. Built with Redux for state management and a clean component/presentation architecture using Higher-Order Components (HOCs).

## Features

### Onboarding Flow

- **Welcome Screen**: Beautiful introduction with app branding and feature highlights
- **User Info Screen**: Comprehensive user data collection including:
  - Personal information (Name, Age, Phone)
  - Gender selection
  - Activity level assessment
  - Optional height and weight tracking
- **Confirmation Screen**: Profile summary and next steps overview

### Technical Features

- Cross-platform React Native app (iOS & Android)
- TypeScript for type safety
- React Navigation for smooth screen transitions
- **Redux Toolkit** for state management with persistence
- **Component/Presentation Architecture** with separation of concerns
- **Higher-Order Components (HOCs)** for reusable functionality
- Modern, accessible UI design
- Form validation and error handling
- Responsive design for different screen sizes

## Architecture

### Component/Presentation Pattern

The app follows a clean architecture pattern with:

- **Presentation Components**: Pure UI components that only handle rendering
- **Container Components**: Connect presentation components to Redux state
- **Higher-Order Components (HOCs)**: Provide reusable functionality like validation, navigation, and state management

### Redux State Management

- **Redux Toolkit** for modern Redux development
- **Redux Persist** for state persistence across app sessions
- **Typed hooks** for type-safe state access

## Project Structure

```
src/
├── components/
│   ├── containers/              # Container components (Redux-connected)
│   │   ├── WelcomeContainer.tsx
│   │   ├── UserInfoContainer.tsx
│   │   ├── ConfirmationContainer.tsx
│   │   └── MainAppContainer.tsx
│   ├── presentation/            # Pure presentation components
│   │   ├── WelcomePresentation.tsx
│   │   ├── UserInfoPresentation.tsx
│   │   └── ConfirmationPresentation.tsx
│   └── index.ts                 # Component exports
├── hoc/                         # Higher-Order Components
│   ├── withOnboarding.tsx       # Redux state management HOC
│   ├── withValidation.tsx       # Form validation HOC
│   ├── withNavigation.tsx       # Navigation HOC
│   └── index.ts                 # HOC exports
├── store/                       # Redux store configuration
│   ├── index.ts                 # Store setup and configuration
│   ├── hooks.ts                 # Typed Redux hooks
│   └── slices/
│       └── onboardingSlice.ts   # Onboarding state slice
├── navigation/
│   ├── AppNavigator.tsx         # Main app navigation
│   └── OnboardingNavigator.tsx  # Onboarding flow navigation
└── types/
    └── index.ts                 # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (>=20)
- React Native development environment
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Install dependencies:

```bash
npm install
```

2. For iOS, install pods:

```bash
cd ios && pod install
```

3. Start the Metro bundler:

```bash
npm start
```

4. Run on iOS:

```bash
npm run ios
```

5. Run on Android:

```bash
npm run android
```

## Architecture Benefits

### Component/Presentation Pattern

- **Separation of Concerns**: UI logic separated from business logic
- **Reusability**: Presentation components can be reused with different containers
- **Testability**: Easy to test presentation components in isolation
- **Maintainability**: Clear structure makes code easier to maintain

### Higher-Order Components (HOCs)

- **withOnboarding**: Provides Redux state and actions for onboarding flow
- **withValidation**: Handles form validation with configurable rules
- **withNavigation**: Provides navigation functionality
- **Composability**: HOCs can be combined for complex functionality

### Redux Benefits

- **Predictable State**: State changes are predictable and traceable
- **Persistence**: User data persists across app sessions
- **DevTools**: Excellent debugging with Redux DevTools
- **Scalability**: Easy to add new features and state slices

## App Flow

1. **Welcome Screen**: Users see the app introduction with the Fyxlife branding
2. **User Info Screen**: Users fill out their profile information with validation
3. **Confirmation Screen**: Users review their profile and complete onboarding
4. **Main App**: Users access the main fitness tracking features

## Development Notes

- **State Management**: Redux with persistence for user profile data
- **Form Validation**: Configurable validation rules with real-time feedback
- **Navigation**: Disabled during onboarding to ensure proper flow
- **Type Safety**: Full TypeScript implementation throughout
- **Architecture**: Clean separation between UI and business logic
- **HOCs**: Reusable functionality for common patterns

## Future Enhancements

- Fitness tracking features (workouts, steps, calories)
- Goal setting and progress monitoring
- Social features and challenges
- Integration with health devices
- Push notifications for motivation
- Data export and backup

---

Built with ❤️ for Fyxlife's fitness tracking vision using modern React Native architecture patterns.
