import React, { useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

const InputNumber = ({ value, onChange, initialValue = 0, min = 0, max = 100 }) => {
    const [inputValue, setInputValue] = useState(initialValue);

    useEffect(() => {
        setInputValue(value);
    }, [value])

    const increment = () => {
        const newValue = parseInt(inputValue) + 1;
        if (newValue <= max) {
            setInputValue(newValue);
            onChange(newValue);
        }
    }

    const decrement = () => {
        const newValue = parseInt(inputValue) - 1
        if (newValue >= min) {
            setInputValue(newValue);
            onChange(newValue);
        }
    }

    const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value)
        if (newValue >= min && newValue <= max) {
            setInputValue(newValue);
            onChange(newValue);
        }
    }

    return (
        <div className="flex items-center gap-2">
            <button
                className="flex active:bg-opacity-25 items-center justify-center bg-gray-500 text-white w-8 h-8 rounded-full"
                onClick={decrement}
            >
                <FiMinus size={24} />
            </button>
            <input
                type="text"
                disabled={true}
                className="border px-2 py-1 text-center w-14"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button
                className="flex active:bg-opacity-25 items-center justify-center bg-gray-500 text-white w-8 h-8 rounded-full"
                onClick={increment}
            >
                <FiPlus size={24} />
            </button>
        </div>
    )
}

export default InputNumber
