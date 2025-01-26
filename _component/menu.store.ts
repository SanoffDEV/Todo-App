import { create } from "zustand";

type MenuStoreType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export const useMenuStore = create<MenuStoreType>((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set(() => ({ isMenuOpen })),
}));

type DateStoreType = {
  date: Date | false;
  setDate: (date: Date) => void;
};

export const useDateStore = create<DateStoreType>((set) => ({
  date: false,
  setDate: (date) => set(() => ({ date })),
}));
