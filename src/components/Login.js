import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../style/login.css';
const Login = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        email:"",password:""
    })
    let name,value;
    const handleInputs = (e) =>{
    name=e.target.name;
    value = e.target.value;
    setUser({...user , [name]:value});
    }

    const Login =async (e)=>{
        e.preventDefault();
        const {email,password} = user;
        const res = await fetch("http://localhost:7000/login",{
            method:'POST',
            credentials:'include',
            headers:{
              'Origin':`http://localhost:7000`,
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
        })
        const data = await res.json();
        // console.log(data);
        if(res.status === 400 || !data){
            window.alert("Invalid details");
            // console.log("Invalid details");
        }
        else{
            window.alert(" Sign In Successfull");
            // console.log("Sign In Successfull");
             navigate("/")
        }
    }
  return (
    <>
    <div className='login_page_start'>
      <div className="login_page">
      <h2>Login</h2>
        <input type="email" name="email" placeholder='enter the register email' value={user.email} onChange={handleInputs}/><br />
        <input type="password" name='password' placeholder='enter your password' value={user.password} onChange={handleInputs}/><br />
        <button onClick={Login}>Sign In</button>
      </div>
      </div>
    </>
  )
}

export default Login
