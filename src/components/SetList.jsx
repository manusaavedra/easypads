import { FiDelete, FiMinus, FiPlus, FiTrash } from "react-icons/fi"
import useSetlist from "../hooks/useSetlist"
import { useStorePads } from "../store"
import { useState } from "react"
import useInput from "../hooks/useInput"

export default function SetList() {
    const { songs, filteredSong, fixedSong, removeSong } = useSetlist()
    const { pads } = useStorePads()
    const searchInput = useInput("")
    const [currentPad, setCurrentPad] = useState(null)

    const handleSelectedSong = ({ library, key, title }) => {
        const currentLibrary = pads[library] || []
        const pad = currentLibrary.find((pad) => {
            return pad.note === key
        })

        if (!pad) return

        if (currentPad && currentPad.library === library && currentPad.pad.note === key && currentPad.title === title) {
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
                pad,
                title
            });
        }
    }

    const handleReset = (pad) => {
        if (currentPad?.title === pad.title) {
            pad.player.stop()
            setCurrentPad(null)
        }
    }

    const noOp = () => { }

    const listSong = filteredSong(searchInput.value)

    if (songs.length === 0) {
        return (
            <picture className="flex h-full flex-col justify-center gap-2 w-60 text-center mx-auto">
                <img className="w-full" src="/empty-playlist.svg" alt="empty playlist" />
                <span className="font-semibold">No hay nada en la lista aún</span>
            </picture>
        )
    }

    return (
        <div className="relative">
            <div className="sticky top-0 left-0 mb-4 z-20 bg-neutral-800 w-full">
                <input
                    className="w-full md:text-2xl"
                    type="text"
                    placeholder="Buscar..."
                    onChange={searchInput.handleChange}
                    value={searchInput.value}
                />
            </div>
            <div>
                {
                    listSong.sort((a, b) => b.fixed - a.fixed).map((song) => {
                        const isPlaying = (currentPad?.library === song.library) && (currentPad?.pad.note === song.key) && (currentPad?.title === song.title)
                        const isFixed = song?.fixed
                        return (
                            <div
                                key={song.title}
                                className={`flex active:bg-neutral-700 border-b border-neutral-700 py-2 px-1 items-center justify-between`}
                            >
                                <div onClick={() => {
                                    isFixed ? handleSelectedSong(song) : noOp()
                                }} className={`w-full ${!isFixed ? 'opacity-30' : ''} grid grid-cols-[40px_minmax(40px,1fr)] gap-2`}>
                                    <span className="flex items-center text-xs bg-black bg-opacity-50 text-white font-semibold rounded-md px-4 py-1">
                                        {song.key}
                                    </span>
                                    <div className="grid grid-cols-[1fr_40px] gap-2">
                                        <div className="overflow-hidden">
                                            <h4 className="font-semibold truncate text-ellipsis">{song.title}</h4>
                                            <span className={`italic`}>{song.library}</span>
                                        </div>
                                        {
                                            isPlaying && (
                                                <div className="icon-audio-meter">
                                                    <div className="bars-meter"></div>
                                                    <div className="bars-meter"></div>
                                                    <div className="bars-meter"></div>
                                                    <div className="bars-meter"></div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={`flex items-stretch gap-1`}>
                                    <button className="bg-transparent p-1 border-none" onClick={() => removeSong(song, handleReset)}>
                                        <FiTrash size={24} />
                                    </button>
                                    <button className="bg-transparent p-1 border-none" onClick={() => fixedSong(song, handleReset)}>
                                        {isFixed ? <FiMinus size={24} /> : <FiPlus size={24} />}
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}