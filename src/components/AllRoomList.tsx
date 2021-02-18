import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";


import api from "service/api";


interface IAllRoomListComp {
    onSelect: (room: string) => void
}

const AllRoomList: React.FC<IAllRoomListComp> = ({ onSelect }) => {
    const [ rooms, setRooms ] = useState<string[]>([])
    useEffect(() => {
        api.getAviableRooms()
            .then((rooms) => setRooms(() => rooms ))
    }, []);

    return(
        <div className="room-list">
            {
                rooms.length > 0 ? rooms.map((room) => (
                    <div key={ uuidv4() } className="room-list-item" onClick ={ () => onSelect(room) }>
                        { room }
                    </div>
                ))
                : <p> No room found </p>
            }
        </div>
    )
}


export default AllRoomList;