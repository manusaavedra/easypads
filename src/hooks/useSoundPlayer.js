import { useEffect } from 'react'
import { Howl } from 'howler'
import { useStorePads } from '../store'

const useSoundPlayer = () => {
    const { pads, libraries } = useStorePads()

    useEffect(() => {
        const listPads = libraries.map((library) => {
            return {
                [library.name]: library.sources.map((source) => {
                    return {
                        note: source.note,
                        player: new Howl({
                            src: `${source.url}`,
                            loop: true,
                            html5: true,
                            mute: false
                        })
                    }
                })
            }
        }).reduce((result, currentObject) => {
            return { ...result, ...currentObject };
        }, {});

        console.log(listPads)

        useStorePads.setState({ pads: listPads })

    }, [libraries])

    return { pads }
}

export default useSoundPlayer
