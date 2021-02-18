import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";

import Picker from "emoji-picker-react";

const SendMessagesInput: React.FC<{ onMessage: (message: string) => void }> = ({ onMessage }) => {
    const [picker, setPicker] = useState<boolean>(false);
    const [ message, setMessage ] = useState<string>("");


    const handleSendMessage = () => {
        onMessage(message);
        setMessage(() => "");
        setPicker(() => false);
    }

    return (
        <div className="send">
            <div className="input">
                <input
                    type="text"
                    name="message"
                    autoComplete="off"
                    autoCapitalize="on"
                    autoCorrect="on"
                    value={ message }
                    onChange={ (e) => setMessage((prev) => e.target.value)}
                    onKeyPress={ (e) => e.key === "Enter" ?  handleSendMessage() : null}
                />
                <span onClick={() => setPicker((prev) => !prev)}>
                    <GrEmoji />
                </span>


                {
                    picker && (
                        <div className="picker">
                            <Picker
                                preload={true}
                                disableAutoFocus={true}
                                disableSkinTonePicker={true}
                                onEmojiClick={(e, em) => setMessage((prev) => prev + em.emoji )}
                            />
                        </div>
                    )
                }

            </div>
            <button onClick={ handleSendMessage }> 
                <IoSendSharp /> 
            </button>

        </div>
    )
}


export default SendMessagesInput;