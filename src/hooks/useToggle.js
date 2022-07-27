import { useState } from "react";

export default function useToggle() {
    const [isToggled, setToggle] = useState(false);
    const toggle = () => setToggle(!isToggled);
    return [isToggled, toggle];
}