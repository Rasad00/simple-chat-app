import { IUserdata } from "interfaces";
import { EXIT_ROOM, JOIN_ROOM, } from "./types";

export const join = (data: IUserdata) => ({
    type: JOIN_ROOM,
    payload: data
})

export const exit = () => ({
    type: EXIT_ROOM,
})