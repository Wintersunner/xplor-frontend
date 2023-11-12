import PropTypes from "prop-types";
import {useRef, useState} from "react";
import useAxios from "../hooks/useAxios.js";
import useToast from "../hooks/useToast.js";

CreateMessage.propTypes = {
    onNewMessage: PropTypes.func
}

export default function CreateMessage({onNewMessage}) {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messageRef = useRef(null);
    const {setToast} = useToast();

    const axios = useAxios();
    const createNewMessage = () => {
        if (message === "") {
            setToast({
                "message": "Please enter a valid message",
                "type": "error"
            })
            return;
        }
        setIsLoading(true);
        axios.post("/fizzbuzz", {message})
            .then((response) => {
                onNewMessage(response.data);
                setMessage("");
                setToast({
                    message: "Message created successfully!"
                })
            })
            .finally(() => {
                setIsLoading(false);
                setTimeout(() => {
                    messageRef.current.focus()
                }, 0)
            })
    }

    return (
        <div className={"border border-gray-400 mb-2 rounded-lg"}>
            <div className={"font-semibold p-3"}>Submit New Message</div>
            <hr className={"border-gray-400 border-px"}/>
            <div className={"p-2.5"}>
                <input placeholder={"Type you new message here"}
                       value={message}
                       autoFocus={true}
                       ref={messageRef}
                       onChange={(e) => {
                           setMessage(e.target.value)
                       }}
                       disabled={isLoading}
                       onKeyUp={(e) => {
                           if (e.code === "Enter") {
                               createNewMessage()
                           }
                       }}
                       className={"bg-transparent outline-0 outline-none w-full font-light disabled:opacity-80 disabled:cursor-not-allowed"}/>
            </div>
        </div>
    )
}