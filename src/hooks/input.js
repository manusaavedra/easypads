import { useState } from "react";

export default function useInput(initial = "") {
    const [state, setState] = useState(initial)

    const handleChange = (e) => {
        setState(e.target.value)
    }

    return {
        value: state,
        handleChange
    }
}