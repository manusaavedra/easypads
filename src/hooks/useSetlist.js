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

    const removeSong = (deleteSong) => {
        const newSongs = songs.filter((song) => song.title !== deleteSong.title)
        useStoreSongs.setState({ songs: newSongs })
        localStorage.setItem('songlist', JSON.stringify(newSongs))
    }

    const fixedSong = (tagSong) => {
        const newSongs = songs.map((song) => {
            if (tagSong.title === song.title) {
                return {
                    ...song,
                    fixed: !song.fixed
                }
            }
            return song
        })

        useStoreSongs.setState({ songs: newSongs })
        localStorage.setItem('songlist', JSON.stringify(newSongs))
    }

    const filteredSong = (value) => {
        return songs.filter((song) => {
            return String(song.title).toLowerCase().includes(String(value).toLowerCase())
        })
    }

    return {
        setlist,
        songs,
        toSongList,
        removeSong,
        fixedSong,
        filteredSong
    }
}