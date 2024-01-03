import { create } from "zustand";

export const useStorePads = create(() => ({
    directory: "default",
    currentPlayer: null,
    hightpassFrecuency: 20000
}))