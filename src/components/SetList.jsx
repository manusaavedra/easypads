import { FaThumbtack } from "react-icons/fa"
import useSetlist from "../hooks/useSetlist"
import { useStorePads } from "../store"
import { useState } from "react"
import useInput from "../hooks/useInput"

export default function SetList() {
    const { filteredSong, fixedSong } = useSetlist()
    const { pads } = useStorePads()
    const searchInput = useInput("")
    const [currentPad, setCurrentPad] = useState(null)

    const handleSelectedSong = ({ library, key }) => {
        const currentLibrary = pads[library] || []
        const pad = currentLibrary.find((pad) => {
            return pad.note === key
        })

        if (!pad) return

        if (currentPad && currentPad.library === library && currentPad.pad.note === key) {
            pad.player.stop();
            setCurrentPad(null);
        } else {
            if (currentPad) {
                const { library: currentLibrary, pad: currentPadNote } = currentPad;
                const currentPadToStop = pads[currentLibrary].find((pad) => pad.note === currentPadNote.note);
                if (currentPadToStop) {
                    currentPadToStop.player.stop();
                }
            }
            pad.player.play();
            setCurrentPad({
                library,
                pad
            });
        }
    }

    return (
        <div className="max-h-[400px] overflow-y-auto overflow-x-hidden">
            <div className="mb-4 bg-neutral-800">
                <input
                    className="w-full md:text-2xl"
                    type="search"
                    placeholder="Buscar..."
                    onChange={searchInput.handleChange}
                    value={searchInput.value}
                />
            </div>
            {
                filteredSong(searchInput.value).sort((a, b) => b.fixed - a.fixed).map((song) => {
                    const isPlaying = (currentPad?.library === song.library) && (currentPad?.pad.note === song.key)
                    const isFixed = song?.fixed
                    return (
                        <div
                            key={song.title}
                            className={`flex ${isPlaying ? 'bg-indigo-500 text-white' : ''} active:bg-neutral-900 border-b border-neutral-700 py-2 px-1 items-center justify-between`}
                        >
                            <div onClick={() => handleSelectedSong(song)} className="w-full grid grid-cols-[40px_minmax(40px,1fr)_80px] gap-2">
                                <span className="text-xs bg-black bg-opacity-50 text-white font-semibold rounded-md px-4 py-1">{song.key}</span>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold truncate">{song.title}</h4>
                                </div>
                                <span className={`text-neutral-500 ${isPlaying ? 'text-black' : ''} italic text-opacity-50`}>{song.library}</span>
                            </div>
                            <div className={`flex items-stretch gap-2`}>
                                <button className={` ${isFixed ? 'bg-indigo-800' : ''} `} onClick={() => fixedSong(song)}>
                                    <FaThumbtack size={16} />
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}