const { v4: uuidv4 } = require('uuid');
const redisClient =  require("../util/redis");
const ROOM_EXPIRE = 60 * 5;  //先設置5分鐘房間會被銷毀

// await client.set('key', JSON.stringify(camp));
// const value = await client.get('key');
// JSON.parse(value)

let roomMap = {} ////
const createRoom =  async (req, res) => {
    let config = req.body;
    let roomId = uuidv4()
    roomMap[roomId] = {...config, roomId} ////

    await redisClient.set(roomId, JSON.stringify({...config, roomId}));
    redisClient.expire(roomId, ROOM_EXPIRE)
    
    console.log("createRoom, roomMap:",roomMap, )
      
    res.status(200).send({...config, roomId}) ; 
}



module.exports = {
    createRoom,
};