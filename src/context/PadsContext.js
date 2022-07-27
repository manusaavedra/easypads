import React, { useState } from "react";

export const ContextPads = React.createContext({})

export default function PadsContextProvider({ children }) {
    const [statePads, setStatePads] = useState([])

    return (
        <ContextPads.Provider value={{ statePads, setStatePads }}>
            {children}
        </ContextPads.Provider>
    )
}
