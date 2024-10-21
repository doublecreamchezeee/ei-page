import create from "zustand";
import { devtools } from "zustand/middleware";

export const useSearchStore = create(
  devtools((set, get) => ({
    search: "",
    setSearch: (search) => {
      set({ search: search });
    },
  }))
);
