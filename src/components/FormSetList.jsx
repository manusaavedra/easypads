import { useState } from "react"
import { notes } from "../constants"

export default function FormSetList() {
    const [selected, setSelected] = useState("")

    const handleChangeNote = (value) => {
        setSelected(value)
    }

    return (
        <div>
            <h4>Nueva Canción</h4>
            <input type="text" placeholder="Nombre de la canción" />
            <LibrarySelector list={notes} onChange={handleChangeNote} selectedValue={selected} />
            <button>Agregar Canción</button>
        </div>
    )
}

const LibrarySelector = ({ list, onChange, selectedValue }) => {
    const [selected, setSelected] = useState(selectedValue)

    const handleChange = (item) => {
        setSelected(item)
        onChange(item)
    }

    return (
        <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden">
            {list.map((item) => (
                <button
                    className={`${selected === item ? 'border-blue-800' : ''
                        } border-2 min-w-fit`}
                    onClick={() => handleChange(item)}
                >
                    {item}
                </button>
            ))}
        </div>
    )
}