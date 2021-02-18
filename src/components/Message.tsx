import React from "react";

import { IMessage } from "interfaces";

interface IMessageComp {
    message: IMessage
}

const Message: React.FC<IMessageComp> = ({ message: { isown, message, username, newcomer } }) => (
    !newcomer 
        ?
            <div className={ isown ? "message own": "message" }>
                <h3>{ username }</h3>
                <p>{ message }</p>
            </div>
        :
            <div className="newcomer">
                <p>{ message }</p>
            </div>
        
)

export default Message; 