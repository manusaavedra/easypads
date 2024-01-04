import { Howler } from "howler"
import { useStorePads } from "../store"
import useSoundPlayer from "../hooks/useSoundPlayer"

export default function ButtonPad({ note }) {
    const { directory } = useStorePads()
    const { loading, play, stop } = useSoundPlayer({ directory, note })
    const isFlat = String(note).includes("#")

    const handlePlay = (e) => {
        clearButtons(e.target)

        if (e.target.checked) {
            return play()
        }

        stop()
    }

    const clearButtons = (currentCheckbox) => {
        const buttons = document.getElementsByName('note')
        Howler.stop()
        buttons.forEach(button => {
            if (currentCheckbox !== button)
                button.checked = false
        })
    }

    return (
        <div className={`relative ${isFlat ? ' bg-neutral-950' : 'bg-neutral-950 bg-opacity-60'} overflow-hidden border border-gray-700 rounded-lg`}>
            <input
                className={`w-full h-full peer opacity-0 absolute top-0 left-0`}
                onChange={handlePlay}
                title={note}
                type="checkbox"
                name='note'
            />
            <div className='w-full h-full flex items-center justify-center transition-colors ease-in-out duration-300 peer-checked:bg-indigo-500'>
                <span className="text-4xl font-medium">
                    {note}
                </span>
                {
                    loading && (
                        <div className="w-4 h-4 border-2 border-l-transparent border-gray-800 animate-spin rounded-full" />
                    )
                }
            </div>
        </div>
    )
}
