import { FiMinus, FiPlus } from "react-icons/fi"
import { CgLoadbarSound } from "react-icons/cg";
import useSetlist from "../hooks/useSetlist"
import { useStorePads } from "../store"
import { useState } from "react"
import useInput from "../hooks/useInput"

export default function SetList() {
    const { filteredSong, fixedSong } = useSetlist()
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

    const noOp = () => { }

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
            {
                filteredSong(searchInput.value).sort((a, b) => b.fixed - a.fixed).map((song) => {
                    const isPlaying = (currentPad?.library === song.library) && (currentPad?.pad.note === song.key) && (currentPad?.title === song.title)
                    const isFixed = song?.fixed
                    return (
                        <div
                            key={song.title}
                            className={`flex active:bg-neutral-700 border-b border-neutral-700 py-2 px-1 items-center justify-between`}
                        >
                            <div onClick={() => {
                                isFixed ? handleSelectedSong(song) : noOp()
                            }} className={`w-full ${!isFixed ? 'opacity-30' : ''} grid grid-cols-[40px_minmax(40px,1fr)_80px] gap-2`}>
                                <span className="text-xs bg-black bg-opacity-50 text-white font-semibold rounded-md px-4 py-1">{song.key}</span>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold truncate">{song.title}</h4>
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
                                <span className={`italic`}>{song.library}</span>
                            </div>
                            <div className={`flex items-stretch gap-2`}>
                                <button className="bg-transparent border-none" onClick={() => fixedSong(song)}>
                                    {isFixed ? <FiMinus size={24} /> : <FiPlus size={24} />}
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}