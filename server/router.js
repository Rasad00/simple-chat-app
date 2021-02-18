const express = require("express")
const router = express.Router();

const { checkUsername, getAviableRooms, getAllUserInRoom } = require("./user");

router.get("/", (req, res) => {
    res.send("Server is running")
});


router.get("/:room/users", (req, res) => {
    const { room } = req.params;

    res.status(200).json(
        getAllUserInRoom(room)
    );
})

router.get("/check/:username/:room", (req, res) => {
    const { username, room } = req.params;
    
    if(checkUsername(username, room))
        return res.status(200).json({
            process: false,
            message: `${ username } nickname already exsist`
        })

    return res.status(200).json({
        process: true,
        message: "user not found"
    })
});

router.get("/rooms", (req, res) => {
    res.status(200).json(
        getAviableRooms()
    )
});

module.exports = router;