import { BsPlay, BsStop } from "react-icons/bs"
import useMetronome from "../hooks/useMetronome"
import ModalButton from "./ModalButton"
import InputNumber from "./InputNumber"

export default function Metronome() {
    const {
        bpm,
        tap,
        play,
        stop,
        isRunning,
        measures,
        count,
        setMeasureCount,
        setInterval
    } = useMetronome()

    const handleChange = (e) => {
        e.preventDefault()
        const beatPerMinutes = Number(e.target.value)
        if (beatPerMinutes >= 25 && beatPerMinutes <= 300) {
            setInterval(beatPerMinutes)
        }
    }

    const handleMeasureChange = (value) => {
        const measure = Number(value)
        if (measure >= 2 && measure <= 12) {
            setMeasureCount(measure)
        }
    }

    const measureIndicator = () => {
        return (
            <div className="flex items-center gap-2 justify-center">
                {
                    Array.from({ length: measures })
                        .map((_, index) => index + 1)
                        .map((measure) => {
                            let isActive = count === measure
                            return (
                                <div key={measure} className={`${isActive ? 'bg-neutral-600' : 'bg-black'} w-1 h-1 rounded-full`}></div>
                            )
                        })
                }
            </div>
        )
    }

    return (
        <div className="flex items-stretch gap-2">
            <ModalButton buttonContent={
                <div className="flex text-xs flex-col text-neutral-500 font-medium gap-1 w-full">
                    {bpm} BPM
                    {measureIndicator()}
                </div>
            }>
                <div className="flex flex-col items-center rounded-sm">
                    <div className="flex flex-col items-center">
                        <span className="text-base bg-gray-600 text-gray-900 font-semibold px-2 rounded-md">bpm</span>
                        <span className="font-semibold rounded-none bg-inherit text-7xl p-1 text-center">{bpm}</span>
                    </div>
                    <input className="w-full accent-blue-500" type="range" onInput={handleChange} value={bpm} min={30} max={300} />
                    <div className="flex items-center justify-center gap-4">
                        <button className="text-yellow-800" onClick={tap}>TAP</button>
                        <button onClick={!isRunning ? play : stop} className={`${isRunning ? 'text-red-800' : 'text-green-800'}`}>
                            {
                                !isRunning
                                    ? <BsPlay size={24} />
                                    : <BsStop size={24} />
                            }
                        </button>
                    </div>
                    <div className=" flex flex-col items-center gap-2 p-1">
                        <span>Compases</span>
                        <InputNumber onChange={handleMeasureChange} min={2} max={8} value={measures} />
                        {measureIndicator()}
                    </div>
                </div>
            </ModalButton>
            <button className="text-yellow-800" onClick={tap}>TAP</button>
            <button onClick={!isRunning ? play : stop} className={`${isRunning ? 'text-red-800' : 'text-green-800'}`}>
                {
                    !isRunning
                        ? <BsPlay size={24} />
                        : <BsStop size={24} />
                }
            </button>
        </div>
    )
}