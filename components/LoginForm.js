import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers';
import React, {useState, useEffect} from 'react'
import SignForm from './SignForm';
import Register from '../App.js';
import { Link } from 'react-router-dom';

function LoginForm({Login, error}) {
    const [details, setDetails] = useState({username: "", password: ""});
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const submitHandler =  e => {  
        e.preventDefault();
        setFormErrors(validate(details))
        setIsSubmit(true);

        Login(details);
    }
    const submitGuest = e =>{
        e.preventDefault();

        Login({username:'guest', password:'guest'});

    }
    useEffect(() =>{
       // console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            //console.log(details);
        }
    }, [formErrors])
    const validate = (values) =>{
        const errors ={};
        if(!values.username || !values.password){
            errors.fields = "Both username and password are required"
        }else{
            console.log(error);
            if(error.length > 0)
                errors.fields = error;
        }

        return errors;
    }

    const submitSignButton = (e) =>{
        e.preventDefault();
        window.open('/register', '_self');

    }

  return (
        <form>
            <div className="form-inner" >
                <h2>Login</h2>
                <p style={{color:'red'}}>{formErrors.fields}</p>
                <br></br>
                
                <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input type="text" name="username" id="name" onChange={e => setDetails({...details, username:e.target.value})} value = {details.username} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details, password:e.target.value})} value = {details.password}/>
                </div>
                <span className='form-buttons'>
                    <input type="submit" value="LOGIN" onClick={(e) => submitHandler(e)}></input>
                </span>
                <span className='form-buttons'>
                    <input type="submit" value = "LOGIN AS GUEST" onClick={(e) => submitGuest(e)}></input>
                </span>
                <span className='form-buttons'>
                    <input type="submit" value = "REGISTER" onClick={submitSignButton}></input>
                </span>
            </div>
        
         </form>
  )
}

export default LoginForm
