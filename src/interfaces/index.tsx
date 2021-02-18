export interface IModal extends React.DetailedHTMLProps<any, any>{
    open: boolean, 
    onClose: () => void
}

export interface IUserdata {
    room?: string ; 
    username?: string;
}


export interface IMessage {
    username: string;
    message: string;
    isown: boolean;
    newcomer: boolean;
}


export type IMessages = IMessage[];