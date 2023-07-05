import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [taskid, setTaskid] = useState({});
  const [username, setUserTask] = useState("");
  const [userdes, setUserDes] = useState("");
  const findData = async () => {
    try {
      const res = await fetch("https://task-management-system-server.onrender.com/findtheuserdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      // console.log(data);
      setUserData(data);
      if (res.status === 400 || !data || res.status === 401) {
        const error = new Error(res.error);
        throw error;
      }

    }
    catch (err) {
      // console.log(err);
      navigate("/login");
    }
  }


  const changeTheTask = async (e) =>{
    e.preventDefault();
    const res = await fetch(`https://task-management-system-server.onrender.com/api/change/${taskid}`,{
      method:'POST',
      credentials:'include',
      headers:{
        "Origin":['https://task-management-system-server.onrender.com'],
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username,userdes
      })
    })
    const data = res.json();
    if(res.status===401|| !data){
      alert("Change Not Done");
    }
    else{
      alert("Changed Done Successfully");
      window.location.reload();
      setIsEdit(false);
    }
  }
  useEffect(() => {
    findData();
  }, []);
  return (
    <>
     <center><h1>Hi {userData.name}</h1></center> 
      {!isEdit &&
        <div className="tasklist">
          {Array.isArray(userData.tasks) && userData.tasks.map((elem, index) => (
            <div className='task_details'>
              <p>{index+1}</p>
              {
                !elem.taskcompleteornot &&
                <p className='status'><span className='about_task'>Status</span> - Pending</p>

              }

              {
                elem.taskcompleteornot &&
                <div>
                  <p className='status'><span className='about_task'>Status</span> - Completed</p>
                  <button onClick={async () => {
                  const res = await fetch(`https://task-management-system-server.onrender.com/api/edit/${elem._id}`, {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                    "Origin": ["https://task-management-system-server.onrender.com"],
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                  })
                })
                const data = await res.json();
                // console.log(data);
                setUserTask(data.taskname);
                setUserDes(data.taskdes);
                setTaskid(elem._id);
                setIsEdit(true);
                if (res.status === 404 || res.status === 500) {
                  alert("Error");
                }
                // console.log(data);
                // alert("task data Update Successfully");
                // navigate('/addtask')
                  }} className='changebtn1'>Edit</button>
                  <button onClick={async ()=>{
                    const res = await fetch(`https://task-management-system-server.onrender.com/api/delete/${elem._id}`,{
                      method:'DELETE',
                      credentials:"include",
                      headers:{
                        "Origin":['https://task-management-system-server.onrender.com'],
                        "Content-Type":"application/json"
                      }
                    })
                    const data = res.json();
                    if(res.status===404 || res.status ===400|| data.status===404){
                      alert("Not deleted")
                    }
                    else{
                      alert("deleted Successfully");
                      window.location.reload();

                    }
                  }} className='changebtn1'>Delete</button>
                </div>
              }
              <p><span className='about_task'> task Name</span>-{elem.taskname}</p>
              <p><span className='about_task'> task Description</span> -{elem.taskdes}</p>
              <p>Change status on clicking the below button</p>
              <button onClick={async () => {
                const res = await fetch(`https://task-management-system-server.onrender.com/api/model/${elem._id}`, {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                    "Origin": ["https://task-management-system-server.onrender.com"],
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({

                  })
                })
                const data = await res.json();
                // console.log(data);
                // setUserTask(data.taskname);
                // setUserDes(data.taskdes);
                if (res.status === 404 || res.status === 500|| data.status===404) {
                  alert("Error");
                }
                // console.log(data);
                alert("task data Update Successfully");
                // navigate('/addtask')

                window.location.reload();
              }} className='changebtn'>Change</button>
            </div>

          ))}
        </div>
      }
      {isEdit &&
        <div className='login_page my-5'>
          <input type="text" value={username} name='taskname' onChange={(e)=>{setUserTask(e.target.value)}}/><br />
          <input type="text" value={userdes} name="taskdes" onChange={(e)=>{setUserDes(e.target.value)}}/><br />
          <button onClick={changeTheTask}>Change</button>
        </div>
      }
    </>
  )
}

export default Home
