import { create } from "zustand";

export const useStorePads = create(() => ({
    directory: "default",
}))

export const useStoreBPM = create(() => ({
    bpm: 120,
    isRunning: false,
    measureCount: 4,
}))