import React from 'react';
import './UserInPanel.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faComment } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import axios from 'axios';
import App from '../App';

const UserInPanel = (props) =>{
    const {username, muted, userType, userId} = props;
    const [muteColor, setMuteColor] = useState(muted==1 ? "red" : "green");
    const [isMuted, setIsMuted] = useState(muted);
    const changeColor = () =>{
        if(muteColor === "green"){
            setMuteColor("red");
        }else{
            setMuteColor("green");
        }
        if(isMuted == 1){
            setIsMuted(0);
        }
        else{
            setIsMuted(1)
        }
        updateMuted();

    }
    const updateMuted = async =>{
        let params = new FormData();
		params.append('userId', userId);
		params.append('muted', isMuted == 1 ? 0 : 1);
        axios.post('http://localhost/_libs/test/muteUsers.php/', params).then((response) =>{
    })
    }

    const updateType = (type) =>{
        let params = new FormData();
		  params.append('username', username);
		  params.append('type', type);
		axios.post('http://localhost/_libs/test/changePermissions.php/', params).then((response)=>{
		})
    }

        return (
            <div className='user'>
                <span className='user-content'>
                    <div className='name-class'>{username}</div>
                    <select class="form-select" aria-label="Default select example"  data-drop-auto="false" onChange={e => updateType(e.target.value)}> 
                        <option selected>{userType}</option>
                        {userType !== "admin" ? (<option >admin</option>): ""}
                        {userType !== "user" ? (<option >user</option>): ""}
                        {userType !== "guest" ? (<option >guest</option>): ""}
                    </select> 
                    <input class="form-check-input" type="checkbox" id="checkboxNoLabel"  onChange={changeColor}
                     checked={isMuted==1 ? 'checked' : ''}></input>
                    <label class="form-check-label">
                        <span style={{color:muteColor, width:"100px"}}><FontAwesomeIcon icon={faComment} className='mute-button' /></span>
                    </label>
                </span>
            </div>
          )
  
}

export default UserInPanel
