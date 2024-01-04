import Metronome from "./Metronome";

export default function Header({ children }) {
    return (
        <header className="w-full py-2 px-4 bg-neutral-900 shadow-md flex justify-between items-center">
            <h1 className="text-base font-semibold">EasyPads</h1>
            {children}
            <Metronome />
        </header>
    )
}