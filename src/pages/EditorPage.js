import React,{useState,useRef,useEffect} from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor';
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import { useLocation } from "react-router-dom";
const EditorPage = () => {
  const socketRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      // socketRef.current.emit(ACTIONS.JOIN, {
      //   roomId,
      //   username: location.state?.username,
      // });
    };
    init();
  }, []);
  const [clients,setClient]=useState([
    {socketId:1,username:'rakesh k'},
     { socketId:2,username:'nancy k'}
  ])
  return (
    <div className="mainWrap">
      <div className='aside'>
        <div className='asideInner'>
        <div className='logo'>
          <img className="logoImage"
          src="/code-editor.png" 
          alt="code-sync-logo"/>

        </div>
      <h3>Connected</h3>
      <div className='clientList'>
        {
          clients.map((client)=>(
            <Client key={client.socketId} 
            username={client.username}/>
          ))
        }
      </div>
        </div>
        
        <button className='btn copyBtn'>Copy ROOM ID</button>
        <button className='btn leaveBtn'>Leave</button>
        </div>
      <div className='editorWrap'>
        <Editor/>

      </div>
    </div>
  )
}

export default EditorPage
