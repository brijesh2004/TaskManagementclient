import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({});
  let ind = 0;
  let ind1 = 0;

  const findData = async () => {
    try {
      const res = await fetch("https://task-management-system-server.onrender.com/findtheuserdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setUserData(data);

      if (res.status === 400 || !data || res.status === 401) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    findData();
  }, []);

  return (
    <>
      <center><h1>DashBoard</h1></center>
      <center><h2>{userdata.name}</h2></center>
      {Array.isArray(userdata.tasks) && userdata.tasks.map((elem, index) => {
        if (elem.taskcompleteornot === 0) {
          ind++;
        } else {
          ind1++;
        }
        return null; // Return null to prevent the evaluation of elem.taskcompleteornot
      })}
      <div className="bigbox">
      <div className='box'>
        <h3>total task Added - {ind + ind1}</h3>
      </div>
      <div className='box'>
       <h3>total task Pending - {ind}</h3> 
      </div>
      <div className='box'>
       <h3> total task Complete - {ind1}</h3>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
