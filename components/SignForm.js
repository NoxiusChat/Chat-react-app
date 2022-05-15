import React, {useState, useEffect} from 'react'
import LoginForm from './LoginForm';


function SignForm({Register, error}) {
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [details, setDetails] = useState({username: "", email: "", password: "", repeat: ""});
    const submitSign = e=>{
        e.preventDefault();
        const errostemp = validate(details)

        setFormErrors(validate(details))
        setIsSubmit(true);
        console.log(details);
        if(Object.keys(errostemp).length === 0)
            Register(details);
    }
    const backToLogin = e =>{
        e.preventDefault();
        window.open('./', '_self');
    }
    useEffect(() =>{
        // console.log(formErrors);
         if(Object.keys(formErrors).length === 0 && isSubmit){
             console.log(details);
         }
     }, [formErrors])
     const validate = (values) =>{
         const errors ={};
         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
         if(!values.username ){
             errors.username = "Please enter a username!"
         }
         else{
             if(values.username.length <= 3 )
                
               errors.username = "Your username must be at least 4 characters long!";
             else{
                 if(!values.username[0].match(/[a-z]/i))
                 errors.username = "Your username must start with a letter!";
                 
             }
         }
         if(!values.email ){
            errors.email = "Please enter an email!";

        }else{
            if(!regex.test(values.email))
            errors.email = "Please enter a valid email!";
        }
        if(!values.password ){
            errors.password = "Please enter a password!";
        }else{
            if(values.password.length <6 && values.password.length >21 ){
             
            errors.password = "Your password is too short or too long!";}
            else{
                if(!/\d/.test(values.password) ){
            
                errors.password = "Your password must have at least 1 number!";}
            }
        }
        if(!values.repeat ){
            errors.repeat = "Please re-enter the password!";
        }
        else{
            if(values.password !== values.repeat){
              
            errors.repeat = "Passwords don't match!";}
        }
        if(error.length > 0)
            errors.fields = error;
        return errors;
     }
    return (
        
        <form>
            <div className="form-inner">
                <h2>Register</h2>
                <p style={{color:'red'}}>{validate(details).fields} {error=""}</p>
                
                 <div className="form-group">
                     <label htmlFor="username">Username:</label>
                     <input  type="text" name="username" id="username" onChange={e => setDetails({...details, username:e.target.value})} value = {details.username} />
                 </div>

                 <p style={{color:'red'}}>{formErrors.username}</p>


                 <div className="form-group">
                     <label htmlFor="email">Email:</label>
                     <input type="email" name="email" id="email" onChange={e => setDetails({...details, email:e.target.value})} value = {details.email}/>
                 </div>

                 <p style={{color:'red'}}>{formErrors.email}</p>


                 <div className="form-group">
                     <label htmlFor="password">Password:</label>
                     <input type="password" name="password" id="password" onChange={e => setDetails({...details, password:e.target.value})} value = {details.password}/>
                 </div>

                 <p style={{color:'red'}}>{formErrors.password}</p>


                 <div className="form-group">
                     <label htmlFor="password">Repeat password:</label>
                     <input type="password" name="repeat" id="repeat" onChange={e => setDetails({...details, repeat:e.target.value})} value = {details.repeat}/>
                 </div>

                 <p style={{color:'red'}}>{formErrors.repeat}</p>

                 <span className='form-buttons'>
                     <input type="submit" value="REGISTER" onClick={submitSign}></input>
                 </span>
                 <span className='form-buttons'>
                     <input type="submit" value = "LOG IN" onClick={backToLogin}></input>
                 </span>
            </div>
            
        </form>
       )
}
export default SignForm