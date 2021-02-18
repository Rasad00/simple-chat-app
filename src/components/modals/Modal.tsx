import React from "react";
import { createPortal } from "react-dom";
import { IModal } from "interfaces";

const Modal: React.FC<IModal> = ({ open, onClose, children , ...args }) => createPortal(
    open ? (<> 
        <div className="overlay" onClick={ onClose }></div>
        <div className="modal" { ...args }>
            { children }
        </div>
    </>): null,
    document.getElementById("modal") as HTMLElement
)


export default Modal;