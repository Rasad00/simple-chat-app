import React from "react";

import Modal from "./Modal";
import { IModal } from "interfaces";

interface IInfoModal extends IModal {
    message: string;
}

const InfoModal: React.FC<IInfoModal> = ({ open, onClose, message, ...args }) => (
    <Modal open={ open } onClose={ onClose } { ...args }>
        <div className="inner">
            <div className="inner-text">
                <p>{ message }</p>
            </div>
            <div className="inner-btn">
                <button type="button" onClick={ onClose }>
                    Close
                </button>
            </div>
        </div>
    </Modal>
)



export default InfoModal;