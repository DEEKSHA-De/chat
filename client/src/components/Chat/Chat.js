import React,{useState,useEffect} from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';

let socket;
const Chat= (location) =>{
    const [name,setName]=useState("");
    const [room,setRoom]=useState("");
    const [message,setMessage]=useState("");
    const [messages,setMessages]=useState([]);
    const ENDPOINT='localhost:5000';
    useEffect(()=>{
        const {name,room}=queryString.parse(window.location.search);

        socket=io(ENDPOINT);
        setName(name)
        setRoom(room)
        socket.emit('join',{name,room},()=>{      
        });
        return ()=>{   //disconnect 
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT,location.search]);
    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
    },[messages]);  

    const sendMessage=(event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }

    console.log(message,messages)

    return(
       <div className="outerContainer">
        <div className="container">
            {/* <input value={message} onChange={(event)=>setMessage(event.target.value)} onKeyDown={event=>event.key==='Enter' ? sendMessage(event) : null}/>     */}
        </div>
       </div>
    )
}
export default Chat;