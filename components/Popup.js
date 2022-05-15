import React, {useEffect} from 'react'
import {Button} from 'react-chat-engine';
import UserInPanel from './UserInPanel';
import axios from 'axios';
import { useState } from 'react';


const Popup = props => {

    const [userTable,setUserTable] = useState({});
    useEffect(() => {
        axios.post('http://localhost/_libs/test/bringUsers.php/', "").then((response) =>{
        setUserTable(response.data);
    })
    
    },[props.trigger])

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <div className='popup-inner-inner'>
                {userTable.map((user) => <UserInPanel {...user}></UserInPanel>)}
         
                </div>
            <Button className="cls-button"
                            value="CLOSE" 
                            theme='danger'
                            icon='delete'
                            id='ce-delete-chat-button'
                            style={{ width: '20%', marginBottom: '3px', float:'right' }}
                            onClick={() =>{props.setTrigger(false)}}
            />
            {props.children}
            </div>
            
        
        </div>
  ) :"";
}

export default Popup
