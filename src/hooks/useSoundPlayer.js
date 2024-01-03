import { useState, useEffect, useRef } from 'react'
import { Howl } from 'howler'

const useSoundPlayer = ({ directory, note }) => {
    const [loading, setLoading] = useState(true)
    const player = useRef(null)

    useEffect(() => {
        player.current = new Howl({
            src: `/pads/${directory}/${note}.ogg`,
            loop: true,
            html5: true,
            onload: () => {
                setLoading(false)
            }
        })

        return () => {
            if (player.current) {
                player.current.stop()
                player.current.unload()
                player.current = null
            }
        }
    }, [directory, note])

    const play = () => {
        if (player.current) {
            player.current.play()
        }
    }

    const stop = () => {
        if (player.current) {
            player.current.stop()
        }
    }

    return { loading, play, stop }
}

export default useSoundPlayer
