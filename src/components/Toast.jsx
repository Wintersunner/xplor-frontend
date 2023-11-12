import {useEffect, useState} from "react";
import useToast from "../hooks/useToast.js";

export default function Toast() {

    const {toast} = useToast();
    const [show, setShow] = useState(false);
    const [firstTime, setFirstTime] = useState(true);

    useEffect(() => {
        if (firstTime) {
            setFirstTime(false);
            return
        }
        setShow(true);
        setTimeout(() => {
            setShow(false)
        }, 3000);
    }, [toast])

    return (
        <div className={`fixed z-40 right-0 text-white transition-all p-4 px-8 rounded-md mb-4 mr-4 `
            + (toast.type === 'error' ? "bg-rose-800 " : "bg-teal-800 ")
            + (show ? "bottom-0" : "-bottom-20")}>
            {toast.message}
        </div>
    )
}