import { useEffect, useRef, useState } from "react"
import { Howl, Howler } from "howler"
import { useStore } from "../store"

export default function ButtonPad({ note }) {
    const [loading, setLoading] = useState(true)
    const { directory } = useStore()
    const isFlat = String(note).includes("#")
    const player = useRef()


    useEffect(() => {
        player.current = new Howl({
            src: `/pads/${directory}/${note}.mp3`,
            loop: true,
            onload: () => {
                setLoading(false)
            }
        })

        return () => {
            player.current = null
        }
    }, [note, directory])

    const handlePlay = (e) => {
        clearButtons(e.target)

        if (e.target.checked) {
            player.current.play()
        } else {
            player.current.stop()
        }
    }

    const clearButtons = (currentCheckbox) => {
        Howler.stop()
        const buttons = document.getElementsByName('note')
        buttons.forEach(button => {
            if (currentCheckbox !== button)
                button.checked = false
        })
    }

    return (
        <div className={`relative ${isFlat ? ' bg-gray-950' : 'bg-gray-900'} overflow-hidden border border-gray-700 rounded-lg`}>
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
                    {
                        loading && (
                            <div className="w-4 h-4 border-2 border-l-transparent border-gray-800 animate-spin rounded-full" />
                        )
                    }
                </span>
            </div>
        </div>
    )
}
