import {useEffect, useRef, useState} from "react";
import useAxios from "../hooks/useAxios.js";
import MessageComp from "./MessageComp.jsx";
import PropTypes from "prop-types";

FindModal.propTypes = {
    hideMe: PropTypes.func
}

export default function FindModal({hideMe}) {
    const [id, setId] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null);
    const [error, setError] = useState("");
    const inputRef = useRef(null)
    const axios = useAxios()

    const findById = () => {
        if (id === "") {
            setError("Please enter a valid ID")
            return;
        }
        setIsLoading(true);
        axios.get(`/fizzbuzz/${id}`).then((response) => {
            setMessage(response.data);
        }).catch((e) => {
            setError(e.response?.data.error ?? e.message)
        }).finally(() => {
            setIsLoading(false);
            setTimeout(() => {
                inputRef.current.focus()
            }, 0)
        })
    }

    useEffect(() => {
        setError("");
        setMessage(null);
    }, [id])

    return (
        <div className={"fixed top-0 left-0 right-0 bottom-0 bg-black/40 z-10"} onClick={() => {
            hideMe()
        }}>
            <div onClick={(e) => e.stopPropagation()}
                 className={"absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white p-8 bg-slate-100 rounded-md w-1/3"}>
                <div className={"text-black"}>
                    <div className={"border border-gray-400 mb-1 rounded-lg"}>
                        <div className={"font-semibold p-3"}>Enter the ID</div>
                        <hr className={"border-gray-400 border-px"}/>
                        <div className={"flex items-center p-2.5 gap-4"}>
                            <div className={"grow"}>
                                <input placeholder={"FizzBuzz ID..."}
                                       value={id}
                                       type={"text"}
                                       ref={inputRef}
                                       autoFocus={true}
                                       onChange={(e) => {
                                           setId(e.target.value)
                                       }}
                                       onKeyUp={(e) => {
                                           if (e.code === "Enter") {
                                               findById();
                                           }
                                       }}
                                       disabled={isLoading}
                                       className={"bg-transparent outline-0 w-full font-light disabled:opacity-80 disabled:cursor-not-allowed"}/>
                            </div>
                            <button onClick={() => {findById()}} className={"bg-xplor text-white px-3 py-1 rounded-md text-sm font-semibold"}>
                                Find
                            </button>
                        </div>
                    </div>
                    {
                        error !== "" ? <div className={"text-sm text-red-600"}>{error}</div> : null
                    }
                    {
                        message !== null ? <MessageComp data={message}/> : null
                    }
                </div>
            </div>
        </div>
    )
}