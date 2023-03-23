import React,{useState} from 'react'
import {v4 as uuidV4} from 'uuid';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Home = () => {
  const navigate = useNavigate();
  const [roomId,setRoomId]=useState('');
  const [userName,setUserName]=useState('');
  const createNewRoom=(e)=>{
e.preventDefault();
const id=uuidV4();

//console.log(id);
setRoomId(id);
toast.success('Created a new room');
  }
  const joinRoom=()=>{
    
    if(!roomId||!userName)
    {
      toast.error('ROOM ID & username is required');
      return;
    }

    //Redirect
    navigate(`/editor/${roomId}`,{
      state:{
        userName,
      },
    })
  }
  const handleInputEnter=(e)=>{
    if(e.code==='Enter')
    {
      joinRoom();
    }
  }
  return (
    <div className='homePageWrapper'>
        <div className='formWrapper'>
            <img className="homePageLogo"src="/code-editor.png" alt="code-sync-logo"/>
            <h4 className='mainlabel'>Paste invitation ROOM ID</h4>
            <div className='inputGroup'>
                <input type="text" 
                className="inputBox"
                placeholder="ROOM ID"
                onChange={(e)=>setRoomId(e.target.value)}
                value={roomId}
                onKeyUp={handleInputEnter}
                />
              <input type="text" 
                className="inputBox"
                placeholder="USERNAME"
                onChange={(e)=>setUserName(e.target.value)}
                value={userName}
                onKeyUp={handleInputEnter}/>
                <button onClick={joinRoom}className='btn joinBtn'>Join</button>
               <span className='createInfo'>
                If you don't have an invite then create &nbsp;
                <a onClick={createNewRoom}href="" className='createNewBtn'>
                    new room
                </a>
               </span>
            </div>
        </div>
        <footer>
            <h4>Built by <a href="https://github.com/n865c">nancy</a></h4>
        </footer>
    </div>
  )
}

export default Home
