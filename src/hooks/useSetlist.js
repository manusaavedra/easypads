import { useEffect } from "react";
import { useStoreSongs } from "../store";

export default function useSetlist() {
    const { setlist, songs } = useStoreSongs()

    useEffect(() => {
        const localSongs = localStorage.getItem('songlist')
        if (localSongs) {
            useStoreSongs.setState({ songs: JSON.parse(localSongs) })
        }
    }, [])

    const toSongList = (newSong) => {
        const newSongs = songs.filter((song) => song.title !== newSong.title)
        useStoreSongs.setState({ songs: [...newSongs, newSong] })
        localStorage.setItem('songlist', JSON.stringify([...newSongs, newSong]))
    }

    return {
        setlist,
        songs,
        toSongList
    }
}