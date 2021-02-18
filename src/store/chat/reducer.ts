import { IUserdata } from "interfaces";
import {  ActionType } from "./types";

export default function Userdata(state: IUserdata = {} as IUserdata,
    action: ActionType) {
    switch (action.type) {
        case "JOIN_ROOM":
            return action.payload as IUserdata;
        case "EXIT_ROOM":
            return {};
        default:
            return state;
    }
}