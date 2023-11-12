import {useEffect, useState} from "react";
import useAxios from "../hooks/useAxios.js";
import MessageComp from "../components/MessageComp.jsx";
import CreateMessage from "../components/CreateMessage.jsx";

export default function Message() {

    const [fizzbuzzes, setFizzBuzzes] = useState([]);
    const axios = useAxios();

    useEffect(() => {
        axios.get("/fizzbuzz").then((response) => {
            setFizzBuzzes(response.data);
        });
    }, [])

    const handleNewMessage = (message) => {
        setFizzBuzzes(prev => [message, ...prev])
    }

    return (
        <>
            <CreateMessage onNewMessage={handleNewMessage}/>
            <div>
                {fizzbuzzes.map((fizzBuzz) => {
                    return (<MessageComp key={fizzBuzz.id} data={fizzBuzz}/>)
                })}
            </div>
        </>
    )
}