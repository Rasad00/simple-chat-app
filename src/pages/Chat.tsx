import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { io, Socket } from "socket.io-client";
import { FiArrowLeft } from "react-icons/fi"
import { IoChatboxEllipsesOutline } from "react-icons/io5"

import { exit } from "store/chat/actions";
import { IUserdata, IMessages, IMessage } from "interfaces";
import { Messages, SendMessageInput, ShowUser } from "components";


let socket: Socket;

const Chat: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [messages, setMessages] = useState<IMessages>([]);
    const [showUser, setShowUser] = useState<boolean>(false)
    const { username, room } = useSelector<IUserdata, IUserdata>((state) => ({
        username: state?.username || undefined,
        room: state?.room || undefined
    }));

    useEffect(() => {
        if (!username && !room)
            history.push("/")
    });

    useEffect(() => {
        socket = io("localhost:5000");

        socket.emit("join", { username, room });

        socket.on("connect", () => {
            console.log("Websocket connected")
        });

        socket.on("newcomer", ({ username, message }: { username: string, message: string }) => {
            let newcomer: IMessage = {
                username, message,
                isown: false, newcomer: true
            }

            setMessages((prev) => [
                ...prev,
                newcomer
            ]);

        });

        socket.on("newmessage", ({ username, message }: { username: string, message: string }) => {
            let mes: IMessage = {
                username, message, isown: false,
                newcomer: false
            };

            setMessages((prev) => [...prev, mes])
        })

        return () => {
            socket.disconnect();
            socket.close();
        }
    }, []);


    const handleExit = () => {
        dispatch(exit())
    }

    const handleShowAllUser = () =>
        setShowUser((prev) => !prev)

    const handleMessage = (message: string) => {

        if(!(message.length > 0)) return;
        
        let newmessage: IMessage = {
            username: "you as " + username,
            message, isown: true, newcomer: false
        };

        setMessages((prev => [...prev, newmessage]));

        socket.emit("message", { message })
    }

    return (
        <section className="chat">
            <div className="meta">
                <div className="meta-back" title="Exit group" onClick={handleExit}>
                    <FiArrowLeft />
                </div>
                <div className="meta--name">
                    <h2>{room}</h2>
                </div>
                <div className="meta--users" onClick={handleShowAllUser}>
                    <IoChatboxEllipsesOutline />
                </div>

                {
                    showUser &&
                    <ShowUser username={username as string} room={room as string} />
                }
            </div>
            <div className="chat">
                <Messages messages={messages} />
            </div>

            <SendMessageInput onMessage={handleMessage} />

        </section>
    )
}


export default Chat;