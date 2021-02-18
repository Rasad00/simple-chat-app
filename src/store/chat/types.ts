import { IUserdata } from "interfaces";


export const JOIN_ROOM = "JOIN_ROOM";
export const EXIT_ROOM = "EXIT_ROOM";

interface JOIN_ROOM_ACTION {
    type: typeof JOIN_ROOM,
    payload: IUserdata
}

interface EXIT_ROOM_ACTION {
    type: typeof EXIT_ROOM
}

export type ActionType = JOIN_ROOM_ACTION | EXIT_ROOM_ACTION;