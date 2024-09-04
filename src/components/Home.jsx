import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../context/socketContext";
import './homeStyle.css'

const Home = () => {
  const [roomName, setRoomName] = useState("");
  const [name, setName] = useState("");
  const socket = useSocketContext();
  const navigate = useNavigate();

  function onSubmitHandler(e) {
    e.preventDefault();

    socket.emit('user:join-room', {roomName, name});
    navigate(`/room/${roomName}`)
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="room_name">Room name:</label>
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          type="text"
          id="room_name"
        />
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default Home;
