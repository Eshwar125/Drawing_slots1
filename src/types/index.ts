export interface Slot {
  id: string;
  name: string;
  category: string;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface AppState {
  slots: Slot[];
  categories: Category[];
  selectedCategory: string | null;
  theme: 'light' | 'dark';
  drawnSlot: Slot | null;
  isDrawing: boolean;
}