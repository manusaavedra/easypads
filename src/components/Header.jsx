import { BsInfo, BsMenuApp } from "react-icons/bs";
import SetList from "./SetList";
import Metronome from "./Metronome";
import ModalButton from "./ModalButton";
import EasyPadsHeader from "./Info";

export default function Header() {
    return (
        <header className="w-full py-2 px-2 bg-neutral-900 shadow-md flex justify-between items-center">
            <picture className="w-10">
                <img src="/logo.svg" alt="easypads" />
            </picture>
            <Metronome />
            <div className="flex items-center gap-2">
                <ModalButton
                    contentClassName="max-h-[500px] h-full overflow-y-auto"
                    buttonContent={<BsMenuApp size={24} />}
                    position="top"
                >
                    <SetList />
                </ModalButton>
                <ModalButton
                    buttonContent={<BsInfo size={24} />}
                    position="top"
                >
                    <EasyPadsHeader />
                </ModalButton>
            </div>
        </header>
    )
}