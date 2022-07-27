import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Howl, Howler } from 'howler'
import { clearButtons } from "../helpers";
import { FaFolderOpen } from "react-icons/fa";

const ButtonPad = forwardRef((props, ref) => {

    const [file, setFile] = useState('')
    const soundRef = useRef();
    const checkInputRef = useRef();
    const body = document.querySelector('body');

    useImperativeHandle(ref, () => {
        return {
            getFile: () => {
                return file
            }
        }
    })

    const playSound = (e) => {

        if (file === '') return e.target.checked = false;

        clearButtons(e.target)

        if (!e.target.checked) return stopSound()

        Howler.stop()

        soundRef.current.volume(1)
        soundRef.current.play()

    }

    const sleep = (ms) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    }

    const stopSound = async () => {
        for (let i = 0; i < 20; i++) {
            await sleep(20)
            if (soundRef.current.volume() > 0) {
                soundRef.current.volume(soundRef.current.volume() - 0.05)
                console.log(soundRef.current.volume())
            }
        }
        Howler.stop()
    }

    const handleOnChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                setFile({
                    name: file.name.substring(0, file.name.length - 4),
                    src: e.target.result
                })

                soundRef.current = new Howl({
                    src: [e.target.result],
                    format: [file.name.split('.').pop().toLowerCase()],
                    volume: 1,
                    onplay: () => {
                        console.log('play')
                        body.classList.add('playing')
                    },
                    onend: () => {
                        console.log('end')
                        checkInputRef.current.checked = false
                        body.classList.remove('playing')
                    }
                })
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <button className="padbutton">
            <input ref={checkInputRef} type="checkbox" name='note' onChange={playSound} />
            <div className='text-content'>
                <span>{file.name}</span>
                <div className='fileInput'>
                    <input type="file" name='file' onChange={handleOnChange} />
                    <FaFolderOpen className="icon" size={24} />
                </div>
            </div>
        </button>
    )
})

export default ButtonPad