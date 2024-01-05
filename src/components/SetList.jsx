import { BsPencil } from "react-icons/bs"
import useSetlist from "../hooks/useSetlist"

export default function SetList() {
    const { songs } = useSetlist()
    return (
        <div>
            {
                songs.map((song) => (
                    <div key={song.title} className="flex active:bg-neutral-900 border-b border-neutral-700 py-4 px-1 items-center justify-between">
                        <div>
                            <h4 className="font-semibold truncate">{song.title}</h4>
                            <span className="text-xs bg-neutral-700 text-white rounded-md px-4 py-1">{song.key}</span>
                        </div>
                        <div className="flex items-stretch gap-2">
                            <button>
                                <BsPencil size={16} />
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}