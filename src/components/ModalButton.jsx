import { useState } from "react"

export default function ModalButton({ children, buttonContent, className }) {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <button className={className} onClick={handleOpen}>
                {buttonContent}
            </button>
            <div className={`fixed ${open ? 'flex' : 'hidden'} z-50 items-center justify-center top-0 left-0 w-full h-screen`}>
                <div onClick={handleClose} className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
                <div className="relative max-w-2xl w-[95%] mx-auto p-4 rounded-md bg-neutral-800">
                    {children}
                </div>
            </div>
        </div>
    )
}