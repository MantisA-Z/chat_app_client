import {io} from 'socket.io-client'
import { createContext, useContext, useMemo } from 'react'

const socketContext = createContext(null);

function useSocketContext(){
    const socket = useContext(socketContext);
    return socket
}

function SocketContextProvider({children}){
    const socket = useMemo(() => io(process.env.REACT_APP_SERVER_URL), [])
    console.log(process.env.REACT_APP_SERVER_URL)

    return(
    <socketContext.Provider value={socket}>
        {children}
    </socketContext.Provider>
    )
}

export {useSocketContext, SocketContextProvider}