import { useEffect } from "react";
import { useStorePads, useStoreSongs } from "../store";

export default function useSetlist() {
    const { setlist, songs } = useStoreSongs()
    const { pads } = useStorePads()

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

    const removeSong = (deleteSong, onDelete) => {
        const pad = pads[deleteSong.library].find((pad) => {
            return pad.note === deleteSong.key
        })

        const newSongs = songs.filter((song) => song.title !== deleteSong.title)
        useStoreSongs.setState({ songs: newSongs })
        localStorage.setItem('songlist', JSON.stringify(newSongs))

        onDelete && onDelete({ ...pad, title: deleteSong.title })
    }

    const fixedSong = (tagSong, onFixed) => {
        const pad = pads[tagSong.library].find((pad) => {
            return pad.note === tagSong.key
        })


        const newSongs = songs.map((song) => {
            if (tagSong.title === song.title) {
                return {
                    ...song,
                    fixed: !song.fixed
                }
            }
            return song
        })

        onFixed && onFixed({ ...pad, title: tagSong?.title })

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