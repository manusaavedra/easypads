import { useEffect, useState } from "react";

export default function useCount(initialState = 0) {
   
    const [count, setCount] = useState(initialState)

    useEffect(() => {
        setCount(initialState)
    }, [initialState])

    return [
        count,
        setCount
    ]
}