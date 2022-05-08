import '../index.css';
import{BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import 'wired-elements';
import '../css/wierd.css';
import { MdEdit } from "react-icons/md";

const frameStyle = {
    width:"80%",
    minWidth: "600px",
    height:"500px",
    // margin:"50px auto",
    // backgroundColor:"palegreen",
}

const innerBoxStyle = {
    width:"50%",
    margin:"100px auto 10px",
    padding:"10px",
    // backgroundColor:"palegreen",
}
const divFlexStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center", 
    alignItems:"center",
    marginBottom: "10px",
    // marginTop: "20px",
}
const stick = {
    height:"300px",
    width:"0px",
    borderStyle: "solid",
    borderWidth: "0px 4px 0px 0px",
    borderColor: "black",
    marginTop: "100px",
    boxSizing: "border-box"
}
const labelStyle = {
    // width:"20%",
    textAlign:"center",
    width: "30%",
    marginRight: "10px",
}
const inputStyle = {
    width: "50%",
    height:"40px",
    // margin:"10px 10px",
    fontSize:"20px",
    textAlign:"center",
    // backgroundColor:"palegreen",
}
const buttonStyle = {
    // minWidth: "90px",
    // width: "50%",
    height:"40px",
    margin:"10px 10px",
    boxSizing:"content-box",
    bottom: "10px",
    cursor: "pointer",
    // backgroundColor:"palegreen",
    //
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    color: "black",
}

const Home = ({setUser}) =>{
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function getUserIdAndSetUser(){
        let resData = await axios.get("http://localhost:3000/api/1.0/user/userId");
        let userId = resData.data.userId  + "-" + userName;
        let user = {userId, userName, email, password};
        setUser(user);
    }

    async function joinGame(){
        if(userName == ""){
            alert("請輸入暱稱");
            return
        }
        await getUserIdAndSetUser();
        try{
            let roomData = await axios.get("http://localhost:3000/api/1.0/room/random");
            navigate(`/game/${roomData.data.roomId}`);
        }catch(err){
            console.log("game page: ", err.response.data);
            alert("房間已滿， \r\n請稍等一下或建立新房間。")
        }
    }

    async function goRoomList(){
        if(userName == ""){
            alert("請輸入暱稱");
            return
        }
        await getUserIdAndSetUser();
        navigate(`/rooms`);
    }
    return(
        // <div className="frame_border" style={frameStyle}>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <h1 style={{color:"#50514F", fontSize:"60px", textAlign:"center"}}>Fun.io</h1>
        <wired-card elevation="5" style={frameStyle}>
            <div style={{display:"flex"}}>
                <div style={innerBoxStyle}>
                    <div style={divFlexStyle}>
                        <wired-image style={{width:"150px", height:"150px", padding: "5px"}} src="https://avatars.dicebear.com/api/male/john.svg?mood[]=happy&mood[]=sad"></wired-image>
                        {/* <img src="https://avatars.dicebear.com/api/male/john.svg?mood[]=happy&mood[]=sad" style={{width:"100px", height:"100px", margin:"20px"}}></img> */}
                        <wired-icon-button style={{position:"relative",top:"-70px",left:"-20px"}}>
                            <MdEdit className="edit-icon"/>
                        </wired-icon-button>
                    </div>
                    <div style={divFlexStyle}>
                        <label style={labelStyle}>暱稱 </label>
                        {/* <wired-input style={inputStyle} type="text" onChange={(e)=>setUserName(e.target.value)} ></wired-input> */}
                        <input style={inputStyle} className="wired-rendered" type="text" onChange={(e)=>setUserName(e.target.value)} />
                    </div>
                    <div style={divFlexStyle}>
                        <wired-button elevation="5" style={buttonStyle}  onClick={goRoomList}>創建房間</wired-button>
                        <wired-button elevation="5" style={buttonStyle}  onClick={joinGame}>快速加入</wired-button>
                        {/* <Link to="/rooms"> */}
                            {/* <button  className="component_border" style={buttonStyle} onClick={goRoomList}>創建房間</button> */}
                        {/* </Link> */}
                        {/* <Link to="/game"> */}
                            {/* <button  className="component_border" style={buttonStyle} onClick={joinGame} >快速加入</button> */}
                        {/* </Link> */}
                    </div>                    
                </div>
                <div style={stick}></div>
                <div style={innerBoxStyle}>
                    <div style={divFlexStyle} >
                        <label style={labelStyle}>name </label>
                        {/* <wired-input placeholder="Enter Name" style={inputStyle}></wired-input> */}
                        <input  className="wired-rendered" placeholder="Enter Name" type="email" style={inputStyle}/>
                    </div> 
                    <div style={divFlexStyle} >
                        <label style={labelStyle}>e-mail </label>
                        {/* <wired-input type="email" placeholder="Enter Email" style={inputStyle} onChange={(e)=>setEmail(e.target.value)}></wired-input> */}
                        <input  className="wired-rendered" placeholder="Enter Email" type="email" style={inputStyle} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div style={divFlexStyle} >
                        <label style={labelStyle} >password </label>
                        {/* <wired-input type="password" placeholder="Enter Password" style={inputStyle} onChange={(e)=>setPassword(e.target.value)}></wired-input> */}
                        <input  className="wired-rendered" placeholder="Enter Password" type="email" style={inputStyle} onChange={(e)=>setPassword(e.target.value)} />
                    </div> 
                    <div style={divFlexStyle}>
                        <wired-button style={buttonStyle}>Sign in</wired-button>
                        <wired-button style={buttonStyle}>Sign up</wired-button>
                        {/* <Link className="component_border" style={buttonStyle} to="/rooms"> */}
                            {/* Sign in */}
                            {/* <button className="component_border" style={buttonStyle}>登入</button> */}
                        {/* </Link> */}
                        {/* <Link className="component_border" style={buttonStyle} to="/rooms"> */}
                            {/* Sign up */}
                            {/* <button className="component_border" style={buttonStyle}>註冊</button> */}
                        {/* </Link> */}
                    </div>
                </div>
            </div>    
        </wired-card>
        </div>       
    )
}

export default Home