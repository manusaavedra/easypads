import { useEffect, useRef } from "react"
import { Howl } from "howler"
import { useStoreBPM } from "../store"
import { BsPlay, BsStop } from "react-icons/bs"
import { setPreciseTimeout } from "../PreciseTimeout"

function useMetronome() {
    const { bpm, isRunning, measureCount } = useStoreBPM()
    const beat1 = useRef()
    const beat2 = useRef()
    const count = useRef(1)
    const interval = useRef()
    const taps = []

    useEffect(() => {
        const initialBpm = 60000 / useStoreBPM.getState().bpm

        beat1.current = new Howl({
            src: ['/metronome/1.mp3'],
        }).stereo(-1)

        beat2.current = new Howl({
            src: ['/metronome/2.mp3'],
        }).stereo(-1)

        interval.current = new setPreciseTimeout(() => {
            if (count.current === 1) {
                beat1.current.play();
            }

            beat2.current.play();
            count.current = (count.current % measureCount) + 1
        }, initialBpm, { inmediate: true })

        return () => {
            beat1.current.unload()
            beat2.current.unload()
            useStoreBPM.setState({ isRunning: false })
            if (interval.current) {
                interval.current.stop()
            }
        }
    }, [measureCount])

    useEffect(() => {
        if (interval.current) {
            interval.current.setInterval(60000 / bpm)
        }
    }, [bpm])

    const play = () => {
        if (interval.current) {
            interval.current.start()
            useStoreBPM.setState({ isRunning: true })
        }
    }

    const stop = () => {
        if (interval.current) {
            interval.current.stop()
            useStoreBPM.setState({ isRunning: false })
        }
    }

    const calculateBPM = () => {
        const timeDifferences = []
        const millisecondsInMinute = 60000

        if (taps.length < 2) return 0

        for (let i = 1; i < taps.length; i++) {
            const diff = taps[i] - taps[i - 1]
            timeDifferences.push(diff)
        }

        const averageTimeDiff = timeDifferences.reduce((acc, val) => {
            return acc + val
        }, 0)

        const bpm = Math.round(
            millisecondsInMinute /
            (averageTimeDiff / timeDifferences.length)
        )

        return bpm
    }

    function tap() {
        const timestamp = Date.now()
        taps.push(timestamp)

        const bpm = calculateBPM()

        if (bpm > 25 && bpm < 300) {
            useStoreBPM.setState({ bpm })
        }
    }

    return {
        bpm,
        tap,
        play,
        stop,
        isRunning,
        measureCount,
        setInterval
    }
}

export default function Metronome() {
    const { bpm, play, stop, isRunning, measureCount, tap } = useMetronome()

    const handleChange = (e) => {
        e.preventDefault()
        const beatPerMinutes = Number(e.target.value)
        if (beatPerMinutes >= 25 && beatPerMinutes <= 300) {
            useStoreBPM.setState({ bpm: beatPerMinutes })
        }
    }

    const handleMeasureChange = (e) => {
        e.preventDefault()
        const measure = Number(e.target.value)
        if (measure >= 2 && measure <= 12) {
            useStoreBPM.setState({ measureCount: measure })
        }
    }

    return (
        <div className="flex items-stretch gap-2">
            <div className="bg-neutral-900 flex items-stretch rounded-sm border border-neutral-950">
                <input
                    type="number"
                    className="w-20 font-semibold rounded-none bg-inherit text-xl py-1"
                    onChange={handleChange}
                    min={30}
                    max={300}
                    value={bpm}
                />
                <div className=" flex items-center gap-2 p-1">
                    <span>BPM</span>
                    <select onChange={handleMeasureChange} value={measureCount} className="bg-inherit">
                        {
                            Array.from({ length: 12 }).map((_, i) => i + 1).slice(1).map((measure) => (
                                <option className="text-black" value={measure}>{measure}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
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