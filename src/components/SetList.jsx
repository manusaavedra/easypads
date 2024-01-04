import { useStoreSongs } from "../store"

export default function SetList() {
    const { songs } = useStoreSongs()

    return (
        <div>List Song</div>
    )
}