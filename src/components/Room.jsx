import React, { useEffect, useState } from "react";
import { useSocketContext } from "../context/socketContext";
import { LuSendHorizonal } from "react-icons/lu";
import "./roomStyle.css";

const Room = () => {
  const socket = useSocketContext();
  const [inpTxt, setInpTxt] = useState("");
  const [messages, setMessages] = useState([]);

  function sendMsg() {
    socket.emit("user:msg", { msg: inpTxt });
  }

  useEffect(() => {
    socket.on("server:msg", ({ msg, name }) => {
      setMessages((m) => [...m, { msg, name }]);
      setInpTxt('')
    });

  
    socket.on("server:redirect", ({ location }) => {
      window.location.href = location;
    });

    return () => {
      socket.off('server:msg')
      socket.off('server:redirect')
    }
  }, [])
  
  return (
    <div className="outer-container">
      <div className="container">
        <div className="chat">
          {messages.map((val, i) => (
            <p key={i}>
              <span className="name">{val.name}:</span>
              <span>{val.msg}</span>
            </p>
          ))}
        </div>
        <div className="msgContainer">
          <input
            value={inpTxt}
            onChange={(e) => {
              setInpTxt(e.target.value);
            }}
            type="text"
            placeholder="Type anything..."
          />
          <button onClick={sendMsg}>
            <LuSendHorizonal />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
