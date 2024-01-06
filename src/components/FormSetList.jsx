import { notes } from "../constants"
import useSetlist from "../hooks/useSetlist"
import { useStorePads } from "../store"

export default function FormSetList() {
    const { libraries } = useStorePads()
    const { toSongList } = useSetlist()

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = Object.fromEntries(new FormData(e.target))
        toSongList(data)

        e.target.reset()
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4 className="font-bold text-xl py-4">Nueva Canción</h4>
            <div className="flex flex-col gap-2">
                <div>
                    <label>Nombre de la canción:</label>
                    <input className="w-full" type="text" name="title" placeholder="Nombre de la canción" />
                </div>
                <div className="flex flex-col">
                    <label>Tonalidad:</label>
                    <select className="bg-neutral-950 py-1" name="key">
                        {
                            notes.map((note) => (
                                <option key={note} value={note}>
                                    {note}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex flex-col">
                    <label>Sonido:</label>
                    <select className="bg-neutral-950 py-1" name="library">
                        {
                            libraries.map((library) => (
                                <option key={library.name} value={library.name}>
                                    {library.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="py-2 flex items-center justify-end">
                    <button>Agregar Canción</button>
                </div>
            </div>
        </form>
    )
}

