import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch, PersistedState } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Hook for accessing the persisted state with proper typing
export const useAppSelectorTyped = useSelector as TypedUseSelectorHook<PersistedState>;
