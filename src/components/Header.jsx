import { directories } from "../constants";

export default function Header({ children }) {
    return (
        <header className="w-full py-2 px-6 bg-gray-900 shadow-md flex justify-between items-center">
            <h1 className="text-xl font-semibold">EasyPads</h1>
            {children}
            <select name="" id="">
                {
                    directories.map((dir) => (
                        <option key={dir} value="dir"> {dir} </option>
                    ))
                }
            </select>
        </header>
    )
}