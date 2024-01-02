import { clearButtons } from "../helpers"

export default function ButtonPad({ note }) {
    const isFlat = String(note).includes("#")

    const handlePlay = (e) => {
        clearButtons(e.target)
    }

    return (
        <button className={`relative ${isFlat ? ' bg-gray-950' : 'bg-gray-900'} overflow-hidden border rounded-lg`}>
            <input
                className={`w-full h-full peer opacity-0 absolute top-0 left-0`}
                onChange={handlePlay}
                title={note}
                type="checkbox"
                name='note'
            />
            <div className='w-full h-full flex items-center justify-center transition-colors ease-in-out duration-300 peer-checked:bg-blue-500'>
                <span className="text-4xl font-medium">{note}</span>
            </div>
        </button>
    )
}
