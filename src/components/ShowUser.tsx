import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import api from "service/api";

const ShowUser: React.FC<{ room: string, username: string }> = ({ room, username }) => {
    const [ users, setUsers ] = useState<Array<string>>([]);

    useEffect(() => { 
        api.getUserInRoom(room)
            .then(res => setUsers(res));
    }, []);


    return(
        <div className="show-user">
            <h3>Aviable user</h3>
            {
                users && users.map((user) => (
                    <div key={ uuidv4() } className="show-user--item">
                        { username === user ? `You as ${ username }`: user } 
                    </div>
                ))
            }
        </div>
    )
}


export default ShowUser;