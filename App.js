
import { ChatEngine } from 'react-chat-engine';
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import OptionsSettings from './components/OptionsSettings';

import LoginForm from './components/LoginForm';
import axios from 'axios';
import SignForm from './components/SignForm';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';

import './App.css';
import './components/Popup.css';
import ChatFeed from './components/ChatFeed';

const App = () => {
	
	const [user, setUser] = useState({username: "", secret:""});
	const [type, setType] = useState("");
	const [muted, setMuted] = useState("");
	const [error, setError] = useState("");
	const Login = async details =>{
		if (details.password === "guest"){
		  setUser({
			username: details.username,
			secret:details.password
		  });
		  setType("guest");
		  
		}else{
		  let params = new FormData();
		  params.append('email', details.email);
		  params.append('username', details.username);
		  params.append('password', details.password);
		  axios.post('http://localhost/_libs/test/index.php/', params).then((response) =>{
		  if(response.data.length > 0){
			setUser({
				username:details.username,
				secret:details.password
			  });
			setType(response.data[0].userType);
			console.log(response.data[0].userType)
		  }else{
			setError("Your username or password may be incorrect.");
		  }})
		  
		}
	  }
	  const Register = async details =>{

		let params = new FormData();
		params.append('username', details.username);
		params.append('email', details.email);
		params.append('password', details.password);
		 await axios.post('http://localhost/_libs/test/register.php/', params).then((response)=>{
		  if(response.data.length > 0){
			setError("Your username already exists, please choose another one");
		  }
		  else{
			setError("");
			var axios = require('axios');
			let chatParams = new FormData();
			chatParams.append('username', details.username);
			chatParams.append('secret', details.password);
			chatParams.append('email', details.email);
			chatParams.append('first_name', details.username);
			chatParams.append('last_name', "");
			chatParams.append('custom_json', {"userType":"user"});

			var data = {
				"username": details.username,
				"secret": details.password,
				"email": details.email,
				"first_name": details.username,
				"custom_json": JSON.stringify({"userType":"user"})
			};

			var config = {
				method:'post',
				url: 'https://api.chatengine.io/users/',
				headers: {
					'PRIVATE-KEY': '{{b52760f8-5ea2-447d-b446-32f7063d3aa8}}'
				},
				data : data
			};

			axios(config).then((response) => {console.log(JSON.stringify(response.data));})
			.catch(console.log('error'));

		  }
		})
	  }
	  
	    const ChangePermissions = (userType) =>{
		  let params = new FormData();
		  params.append('username', user.username);
		  params.append('type', userType);
		  console.log(userType);
		  axios.post('http://localhost/_libs/test/changePermissions.php/', params).then((response)=>{
		  if(response.data.length > 0){
			setType({type:userType})
		  }
		})
	  }
	  const Logout = () => {
		setUser({username:"", secret:""});
		setType("");
		setError("");
	  }
	  if(user.username === ""){
		return (<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginForm  Login={Login} error={error} />}/>
					<Route path = "Register" element={<SignForm Register={Register} error={error} />}/>      
				</Routes>
			</BrowserRouter>
		</div>
			);
	}
	return (
		<div>
			<div className="ChatBar">
			 <button className="LogoutButton" onClick={Logout}>LOGOUT</button>
			</div>
			<ChatEngine
			height='100vh'
			userName={user.username}
			userSecret={user.secret}
			projectID='788b9314-17c5-4a48-9b47-9145d61ce75b'
			renderOptionsSettings={(creds,chat) => <OptionsSettings {...{creds, chat}} />}
			renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} userType={type} />}
			renderPhotosSettings={(creds, chat) => {}}
			//renderChatList={(chatAppState) => {chatAppState.length = 0}}
			/>
			
		</div>
		
	);
}

export default App;
