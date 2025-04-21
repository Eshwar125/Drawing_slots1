import { Slot, Category } from '../types';

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Get a random slot from the list
export const getRandomSlot = (slots: Slot[]): Slot | null => {
  if (slots.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * slots.length);
  return slots[randomIndex];
};

// Get slots filtered by category
export const getSlotsByCategory = (slots: Slot[], categoryId: string | null): Slot[] => {
  if (!categoryId) return slots;
  return slots.filter(slot => slot.category === categoryId);
};

// Predefined category colors
export const categoryColors = [
  '#4F46E5', // Indigo
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#8B5CF6', // Violet
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#14B8A6', // Teal
];

// Get a random color from the predefined colors
export const getRandomColor = (): string => {
  const randomIndex = Math.floor(Math.random() * categoryColors.length);
  return categoryColors[randomIndex];
};

// Save data to local storage
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};

// Load data from local storage
export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage', error);
    return defaultValue;
  }
};