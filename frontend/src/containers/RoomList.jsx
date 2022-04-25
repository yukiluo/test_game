import '../index.css';
import{BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Room from '../components/roomList/Room';

const frameStyle = {
    width:"70%",
    height:"500px",
    margin:"50px auto",
    position: "relative",
    // backgroundColor:"palegreen",
}
const roomListStyle = {
    width:"90%",
    height:"60%",
    margin:"40px auto 10px",
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap", //| nowrap | wrap-reverse,
    // backgroundColor:"paleturquoise",
}
const divFlexStyle = {
    display: "flex",
    justifyContent: "center", 
    alignItems:"center",
    // marginTop: "20px",
}
const buttonStyle = {
    width:"150px",
    height:"40px",
    margin:"10px 20px",
    boxSizing:"content-box",
    bottom: "10px",
    cursor: "pointer",
    // backgroundColor:"palegreen",
}
const roomStyle = {
    width:"23%",
    height:"50%",
    margin:"3px",
    // backgroundColor:"pink",
}
const roomImgStyle = {
    width:"50%",
    height:"60%",
    margin: "0 auto",
    display:"block"
}

const socket = io(process.env.REACT_APP_SOCKETIO_URL);

const RoomList = () =>{
    const [roomList, setRoomList] = useState([]);
    const [currentRoomId, setCurrentRoomId] = useState("");
    const [allChange, setAllChange] = useState(true);
    let [config, setConfig] = useState({})

    
    useEffect(() =>{
        async function getRoomList(){
            let resData = await axios.get("http://localhost:3000/api/1.0/rooms");
            console.log("roomList: ", resData.data);
            setRoomList(resData.data);
        }
        getRoomList();
        // socket.on("createRoom", (value) => {
        //     console.log(value)
        //     setConfig(value)
        // })

        // return () => {
        //     socket.off("createRoom")
        // }
    },[])

    // useEffect(() => {
    //     let a = [...roomList]
    //     a.push(config)
    //     setRoomList(a)
    //     console.log(roomList)
    // },[config])

    // useEffect(() => {
    //     console.log("bbbbbb")
    //     console.log(roomList)
    // },[roomList])

    
    return (
        <div style={frameStyle} className="frame_border">
            <div style={{textAlign:"center", fontSize:"40px", margin:"10px auto 0px"}}>Rooms</div>
            <div style={roomListStyle} className="frame_border">
                {roomList.map((room, index) => {
                    return <Room 
                        setCurrentRoomId={setCurrentRoomId} 
                        roomBorder={(room.roomId==currentRoomId)? {color:"blue", width:"5px"}: {color:"black", width:"3px"}} 
                        key={room.roomId} 
                        room={room}></Room> 
                })}
                
            </div>
            
            <div style={divFlexStyle}>
                <Link to="/create">
                    <button className="component_border" style={buttonStyle}>創立房間</button>
                </Link>
                <Link to="/game">
                    <button className="component_border" style={buttonStyle}>加入房間</button>
                </Link>
            </div>

            
        </div>
    )
}

export default RoomList;