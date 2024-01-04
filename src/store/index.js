import { create } from "zustand";

export const useStorePads = create(() => ({
    currentLibrary: null,
    libraries: [
        {
            name: "Default",
            url: "/pads/default"
        },
        {
            name: "Worship",
            url: "/pads/worship",
            disabled: true
        },
        {
            name: "Clean organ",
            url: "/pads/cleanorgan",
            disabled: true
        },
        {
            name: "Dark pad",
            url: "/pads/dark",
            disabled: true
        }
    ]
}))

export const useStoreSongs = create(() => ({
    songs: []
}))
