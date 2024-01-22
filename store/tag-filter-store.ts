import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
// import type {} from '@redux-devtools/extension' // required for devtools typing

interface BearState {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  unsetSelectedTag: () => void;
}

export const useTagFilterStore = create<BearState>()(
  devtools(
    (set) => ({
      selectedTag: '',
      setSelectedTag: (tag) => set({ selectedTag: tag }),
      unsetSelectedTag: () => set({ selectedTag: '' }),
    }),
    {
      name: 'tag-filter-storage',
    },
  ),
);
