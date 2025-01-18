import { create } from "zustand";

type MenuStoreType = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export const useMenuStore = create<MenuStoreType>((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set(() => ({ isMenuOpen })),
}));
