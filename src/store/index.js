import { create } from "zustand";

export const useStorePads = create(() => ({
    pads: [],
    currentLibrary: {
        name: "Default"
    },
    libraries: [
        {
            name: "Default",
            sources: [
                {
                    note: 'C',
                    url: '/pads/default/C.mp3'
                },
                {
                    note: 'C#',
                    url: '/pads/default/C#.mp3'
                },
                {
                    note: 'D',
                    url: '/pads/default/D.mp3'
                },
                {
                    note: 'D#',
                    url: '/pads/default/D#.mp3'
                },
                {
                    note: 'E',
                    url: '/pads/default/E.mp3'
                },
                {
                    note: 'F',
                    url: '/pads/default/F.mp3'
                },
                {
                    note: 'F#',
                    url: '/pads/default/F#.mp3'
                },
                {
                    note: 'G',
                    url: '/pads/default/G.mp3'
                },
                {
                    note: 'G#',
                    url: '/pads/default/G#.mp3'
                },
                {
                    note: 'A',
                    url: '/pads/default/A.mp3'
                },
                {
                    note: 'A#',
                    url: '/pads/default/A#.mp3'
                },
                {
                    note: 'B',
                    url: '/pads/default/B.mp3'
                }
            ],
            disabled: false
        },
        {
            name: "Worship",
            sources: [
                {
                    note: 'C',
                    url: '/pads/worship/C.ogg'
                }
            ],
            disabled: false
        },
        {
            name: "Clean organ",
            sources: [],
            disabled: true
        },
        {
            name: "Dark pad",
            sources: [],
            disabled: true
        }
    ]
}))

export const useStoreSongs = create(() => ({
    setlist: [],
    songs: []
}))
