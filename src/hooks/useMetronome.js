import { useEffect, useRef, useState } from "react"
import { Howl } from "howler"
import { setPreciseTimeout } from "../PreciseTimeout"

export default function useMetronome() {
    const [bpm, setBpm] = useState(120)
    const [measures, setMeasures] = useState(4)
    const [isRunning, setIsRunning] = useState(false)
    const beat1 = useRef(null)
    const beat2 = useRef(null)
    const interval = useRef(null)
    const measureCount = useRef(4)
    const count = useRef(1)
    const taps = []

    useEffect(() => {
        beat1.current = new Howl({
            src: ['/metronome/1.mp3'],
        }).stereo(-1)

        beat2.current = new Howl({
            src: ['/metronome/2.mp3'],
        }).stereo(-1)

        return () => {
            beat1.current.unload()
            beat2.current.unload()
        }
    }, [])

    useEffect(() => {
        const initialBpm = 60000 / 120
        interval.current = new setPreciseTimeout(() => {
            if (count.current === 1) {
                beat1.current.play();
            }

            beat2.current.play();
            count.current = (count.current % measureCount.current) + 1

            return () => {
                count.current = 1
            }
        }, initialBpm, { inmediate: true })

        return () => {
            if (interval.current) {
                interval.current.stop()
                interval.current = null
                setIsRunning(() => false)
            }
        }
    }, [])

    const play = () => {
        if (interval.current) {
            interval.current.start()
            setIsRunning(true)
        }
    }

    const stop = () => {
        if (interval.current) {
            interval.current.stop()
            count.current = 1
            setIsRunning(false)
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
            setBpm(bpm)
        }
    }

    const setInterval = (bpm) => {
        if (interval.current) {
            interval.current.setInterval(60000 / bpm)
        }

        setBpm(bpm)
    }

    const setMeasureCount = (measureLength) => {
        measureCount.current = measureLength
        setMeasures(measureLength)
    }

    return {
        bpm,
        tap,
        play,
        stop,
        isRunning,
        measures,
        setMeasureCount,
        setInterval
    }
}