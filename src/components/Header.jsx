export default function Header({ children }) {
    return (
        <header className="w-full py-2 px-6 bg-black flex justify-between items-center">
            <h1 className="text-xl font-semibold">EasyPads</h1>
            {children}
        </header>
    )
}