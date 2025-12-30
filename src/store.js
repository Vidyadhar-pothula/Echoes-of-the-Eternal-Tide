import { create } from 'zustand';
import { storyData } from './storyData';

export const useStore = create((set) => ({
  currentPageIndex: 0,
  direction: 1,
  isAnimating: false,
  hasStarted: false,

  setHasStarted: (hasStarted) => set({ hasStarted }),

  nextPage: () => set((state) => {
    if (state.currentPageIndex < storyData.length - 1) {
      return { currentPageIndex: state.currentPageIndex + 1, direction: 1 };
    }
    return state;
  }),

  prevPage: () => set((state) => {
    if (state.currentPageIndex > 0) {
      return { currentPageIndex: state.currentPageIndex - 1, direction: -1 };
    }
    return state;
  }),

  setIsAnimating: (isAnimating) => set({ isAnimating }),
}));
