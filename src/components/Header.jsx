import { BsMenuApp, BsPlus } from "react-icons/bs";
import SetList from "./SetList";
import Metronome from "./Metronome";
import ModalButton from "./ModalButton";
import FormSetList from "./FormSetList";

export default function Header() {
    return (
        <header className="w-full py-2 px-2 bg-neutral-900 shadow-md flex justify-between items-center">
            <h1 className="text-base font-semibold">EasyPads</h1>
            <Metronome />
            <div className="flex items-center gap-2">
                <ModalButton
                    buttonContent={<BsPlus size={24} />}
                >
                    <FormSetList />
                </ModalButton>
                <ModalButton
                    contentClassName="max-h-[500px] h-full overflow-y-auto"
                    buttonContent={<BsMenuApp size={24} />}
                >
                    <SetList />
                </ModalButton>
            </div>
        </header>
    )
}