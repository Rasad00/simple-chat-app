import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { IoIosList } from "react-icons/io"

import { join } from "store/chat/actions";
import { InfoModal } from "components";
import api from "service/api";
import AllRoomList from "components/AllRoomList";

const Join: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [ room, setRoom] = useState<string>("");
    const [ username , setUsername] = useState<string>("");
    const [ openRoomList, setOpenRoomList ] = useState<boolean>();
    const [ modal, setModal ] = useState<{ open: boolean, message: string }>({ open: false, message: "  " })


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await api.checkUser(username, room);

        if(res.process){
            dispatch(join({ username, room }));
            setTimeout(() =>  history.push("/chat"), 200);
            return;
        }

        setModal(() => ({
            open: true,
            message: res.message
        }))
        
    }

    const handleUpdateRoom = useCallback((value: string) => {
        setRoom(() => value);
        setOpenRoomList(() => false);
    }, [])

    return(
        <div className="join">
            <h1>Join Room</h1>
            <form onSubmit={ handleSubmit }>
                <div className="input">
                    <input 
                        id="username" 
                        name="username" 
                        type="text" required 
                        autoCorrect="off" 
                        autoComplete="off"
                        value={ username }
                        onChange = {e => setUsername(e.target.value)} 
                    />
                    <label htmlFor="username">Username</label>
                </div>

                <div className="input select">
                    <input 
                        id="room" 
                        name="room" 
                        type="text" required  
                        autoComplete="off"
                        value={ room }
                        onChange = {e => setRoom(e.target.value)}
                    />
                   <label htmlFor="room">Room</label>
                   <div title="Aviable chats"  className="rooms" onClick={ () => setOpenRoomList((prev) => !prev ) }>
                        <IoIosList />
                   </div>
                    {
                       openRoomList && 
                        <AllRoomList onSelect={ handleUpdateRoom } />
                    }
                </div>
                <button type="submit">
                    Join
                </button>
                <InfoModal 
                    open={ modal.open } 
                    message= { modal.message }
                    onClose = { () => {
                        setModal(() => ({
                            open: false,
                            message: ""
                        }))
                    }}
                
                />
            </form>
        </div>
    )
}

export default Join;