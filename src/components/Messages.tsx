import React from "react";
import { v4 as uuidv4 } from "uuid";

import Message from "./Message";
import { IMessages } from "interfaces";

interface IMessageComp {
    messages: IMessages;
}

const Messages: React.FC<IMessageComp> = ({ messages }) => (
    <div className="messages">
        {messages
            .map((message) => <Message key={ uuidv4() } message={message} />)}
    </div>
)


export default Messages;