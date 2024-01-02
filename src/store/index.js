import { create } from "zustand";

export const useStore = create(() => ({
    directory: "default"
}))