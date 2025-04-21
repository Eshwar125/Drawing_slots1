import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Slot, Category } from '../types';
import { generateId, saveToLocalStorage, loadFromLocalStorage } from '../utils';

// Define action types
type AppAction =
  | { type: 'ADD_SLOT'; payload: Omit<Slot, 'id' | 'createdAt'> }
  | { type: 'EDIT_SLOT'; payload: Slot }
  | { type: 'DELETE_SLOT'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Omit<Category, 'id'> }
  | { type: 'EDIT_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string | null }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_DRAWN_SLOT'; payload: Slot | null }
  | { type: 'SET_IS_DRAWING'; payload: boolean }
  | { type: 'RESET_ALL' };

// Initial state
const initialState: AppState = loadFromLocalStorage('drawingAppState', {
  slots: [],
  categories: [],
  selectedCategory: null,
  theme: 'light',
  drawnSlot: null,
  isDrawing: false,
});

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_SLOT':
      return {
        ...state,
        slots: [
          ...state.slots,
          {
            id: generateId(),
            ...action.payload,
            createdAt: Date.now(),
          },
        ],
      };
    case 'EDIT_SLOT':
      return {
        ...state,
        slots: state.slots.map(slot =>
          slot.id === action.payload.id ? action.payload : slot
        ),
      };
    case 'DELETE_SLOT':
      return {
        ...state,
        slots: state.slots.filter(slot => slot.id !== action.payload),
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            id: generateId(),
            ...action.payload,
          },
        ],
      };
    case 'EDIT_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.id ? action.payload : category
        ),
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload),
        slots: state.slots.map(slot =>
          slot.category === action.payload ? { ...slot, category: '' } : slot
        ),
        selectedCategory: state.selectedCategory === action.payload ? null : state.selectedCategory,
      };
    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_DRAWN_SLOT':
      return {
        ...state,
        drawnSlot: action.payload,
      };
    case 'SET_IS_DRAWING':
      return {
        ...state,
        isDrawing: action.payload,
      };
    case 'RESET_ALL':
      return {
        ...initialState,
        theme: state.theme, // Preserve theme setting
      };
    default:
      return state;
  }
};

// Create context
export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Context provider
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Save state to local storage when it changes
  useEffect(() => {
    saveToLocalStorage('drawingAppState', state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);