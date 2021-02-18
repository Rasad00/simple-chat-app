interface IResponse {
    process: boolean;
    message: string;
}

export default class {
    static checkUser = async (username: string, room: string) =>
        await fetch(`http://localhost:5000/check/${username}/${room}`)
            .then(res => (res.json() as Promise<IResponse>));

    static getAviableRooms = async () =>
        await fetch(`http://localhost:5000/rooms`)
            .then(res => res.json() as Promise<Array<string>>);

    static getUserInRoom = async (room: string) =>
        await fetch(`http://localhost:5000/${ room }/users`)
            .then(res => res.json() as Promise<Array<string>>);

}