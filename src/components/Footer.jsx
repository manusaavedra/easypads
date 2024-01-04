import { directories } from "../constants";
import { useStorePads } from "../store";

export default function Footer() {
    const handleChange = (e) => {
        useStorePads.setState({ directory: e.target.value })
    }

    return (
        <footer className="px-4 flex items-center">
            <select className="bg-neutral-950 p-2" onChange={handleChange}>
                {
                    directories.map((dir) => (
                        <option key={dir} value={dir}> {dir} </option>
                    ))
                }
            </select>
            {/**<p className="text-xs text-center">Powered by <a className="underline text-blue-500" href="https://github.com/manusaavedra">Manuel Saavedra</a> | this project uses react js and howler js</p> */}
        </footer>
    )
}