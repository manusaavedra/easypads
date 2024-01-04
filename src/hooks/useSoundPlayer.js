import { useState, useEffect, useRef } from 'react'
import { Howl } from 'howler'

const useSoundPlayer = ({ url, note }) => {
    const [loading, setLoading] = useState(true)
    const player = useRef(null)

    useEffect(() => {
        setLoading(true)

        player.current = new Howl({
            src: `${url}/${note}.mp3`,
            loop: true,
            html5: true,
            onload: () => {
                setLoading(false)
            }
        })

        return () => {
            if (player.current) {
                player.current.stop()
                player.current = null
            }
        }
    }, [url, note])

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
