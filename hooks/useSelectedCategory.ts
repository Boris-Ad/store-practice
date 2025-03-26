import { create } from 'zustand';
import { CategoryTable } from '@/drizzle/schema/categories';

type Category = typeof CategoryTable.$inferSelect;

interface ISelectedCategory {
  selectedCategory: Category | null;
  setSelectedCategory: (value: Category | null) => void;
}

export const useSelectedCategory = create<ISelectedCategory>(set => ({
  selectedCategory: null,
  setSelectedCategory: value => set(() => ({ selectedCategory: value })),
}));
