const { v4: uuidv4 } = require('uuid');
const redisClient =  require("../util/redis");
const ROOM_EXPIRE = 60 * 5;  //先設置5分鐘房間會被銷毀
const ROOM_PREFIX = "room--"

// await client.set('key', JSON.stringify(camp));
// const value = await client.get('key');
// JSON.parse(value)

let roomMap = {} ////
const createRoom =  async (req, res) => {
    let config = req.body;
    let roomId = uuidv4()
    roomMap[roomId] = {...config, roomId} ////

    await redisClient.set((ROOM_PREFIX + roomId), JSON.stringify({...config, roomId}));
    redisClient.expire(roomId, ROOM_EXPIRE)
    
    console.log("createRoom: ",{...config, roomId}, )
      
    res.status(200).send({...config, roomId}) ; 
}

const getRoom =  async (req, res) => {
    let roomId = req.params.roomId;
    let room = await redisClient.get((ROOM_PREFIX + roomId));
    if(!room){
        res.status(300).json({error: 'room is not exit'}); 
        console.log(roomId, "room is not exit");
        return;
    }
    let roomInfo = roomMap[roomId] ////
    room = JSON.parse(room)
    console.log("getRoom: ", aaa);
    res.status(200).send(room) ; 
}


// let aaa = await redisClient.keys(ROOM_PREFIX+"*")



module.exports = {
    createRoom,
    getRoom
};