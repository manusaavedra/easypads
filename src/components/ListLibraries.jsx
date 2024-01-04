import { useEffect } from "react";
import { useStorePads } from "../store";

export default function ListLibraries() {
    const { currentLibrary, libraries } = useStorePads()

    useEffect(() => {
        useStorePads.setState((state) => ({ currentLibrary: state.libraries[0] }))
    }, [])

    const handleChangeLibrary = (library) => {
        useStorePads.setState({ currentLibrary: library })
    }

    const noOp = () => { }

    return (
        <footer className="px-2 flex items-center">
            <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden">
                {
                    libraries.map((library) => {
                        const isSelected = library.name === currentLibrary?.name
                        const isDisabled = library.disabled
                        return (
                            <button
                                key={library.name}
                                className={`${isSelected ? 'border-blue-800' : ''} ${isDisabled ? 'opacity-30 pointer-events-none' : ''} border-2 min-w-fit`}
                                onClick={() => {
                                    !isDisabled
                                        ? handleChangeLibrary(library)
                                        : noOp()
                                }}
                            >
                                {library.name}
                            </button>
                        )
                    })
                }
            </div>
            {/**<p className="text-xs text-center">Powered by <a className="underline text-blue-500" href="https://github.com/manusaavedra">Manuel Saavedra</a> | this project uses react js and howler js</p> */}
        </footer>
    )
}