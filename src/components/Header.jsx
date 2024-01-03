import { directories } from "../constants";
import { useStorePads } from "../store";

export default function Header({ children }) {
    const handleChange = (e) => {
        useStorePads.setState({ directory: e.target.value })
    }

    return (
        <header className="w-full py-2 px-6 bg-gray-900 shadow-md flex justify-between items-center">
            <h1 className="text-xl font-semibold">EasyPads</h1>
            {children}
            <select className="bg-gray-950" onChange={handleChange}>
                {
                    directories.map((dir) => (
                        <option key={dir} value={dir}> {dir} </option>
                    ))
                }
            </select>
        </header>
    )
}