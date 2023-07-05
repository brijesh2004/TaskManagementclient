import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../style/login.css'

const Signup = () => {
    const navigate = useNavigate();
    const [user , setUser] = useState({
        name:"",email:"",password:"",confirmpassword:""
    })
    let name,value;
    const handleinputs = (e)=>{
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }

    const postData = async (e)=>{
        e.preventDefault();
        const {name,email,password,confirmpassword} = user;

        const res = await fetch("http://localhost:7000/register",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,password,confirmpassword
            })
        })
        const data = await res.json();
        if(res.status === 422 || !data){
            window.alert("Invalid Registration");
            // console.log("Invalid Registration");
        }
        else{
            window.alert(" Registration Successfull");
            // console.log("Registration Successfull");
            navigate("/login");
        }
    }
  return (
    <>
    <div className='login_page_start'>
      <div className="login_page">
      <h2>Register</h2>
        <input type="text" placeholder='Enter Your Name' name='name' value={user.name} onChange={handleinputs}/> <br />
        <input type="email" placeholder='Enter Your Email' name='email' value={user.email} onChange={handleinputs}/><br />
        <input type="text" placeholder='Create Strong Password' name='password' value={user.password} onChange={handleinputs}/><br />
        <input type="text" placeholder='Enter Password Again' name='confirmpassword' value={user.confirmpassword} onChange={handleinputs}/><br />
        <button onClick={postData}>Sign Up</button>
      </div>
      </div>
    </>
  )
}

export default Signup
