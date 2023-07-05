import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/login.css'

const Addtask = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        taskname:"",taskdes:""
    });
    let name ,value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }
    const Addthetask =async (e) =>{
        e.preventDefault();
        const {taskname ,taskdes}=user;
        const res = await fetch("https://task-management-system-server.onrender.com/addtask",{
            method:'POST',
            credentials:'include',
            headers:{
              'Origin':`https://task-management-system-server.onrender.com`,
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
                taskname,taskdes
            })
        })
        const data = res.json();
        if(res.status===400||!data){
            window.alert("Task Not added");
            // console.log("Task Not added");
        }
        else{
            window.alert("Task  added");
            // console.log("Task  added");
            navigate("/");
        }
    }
  return (
    <>
    <div className='login_page_start'>
      <div className="login_page">
      <h1>Add Task</h1>
        <input type="text" name='taskname'  placeholder='Enter the task Name' value={user.taskname} onChange={handleInputs}/> <br />
        <input type="text" name='taskdes' placeholder='Enter the Task Description' value={user.taskdes} onChange={handleInputs}/> <br />
        <button onClick={Addthetask}>Add Task</button>
      </div>
      </div>
    </>
  )
}

export default Addtask
