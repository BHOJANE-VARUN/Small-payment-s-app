import React, { useEffect, useRef, useState } from "react";
import UserComp from "./UserComp";
import axios from "axios"
function Dashboard() {
  const [balance,setbalance] = useState();
  const [userdata,setuserdata] = useState([]);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");
  useEffect(  ()=>{
    const getdata = async ()=>{
      const getuser = await axios.get("http://localhost:3001/api/v1/account/balance",{
        headers:{
          authentication:token,
        } 
      })
      setbalance(getuser.data.Balance);
    }
    getdata();
    handlechange();
  },[])
    const searchtxt = useRef(null);
    const handlechange = async ()=>{
        const raw = await axios.get("http://localhost:3001/api/v1/user/bulk",{
          headers:{
            authentication:token,
            filter:searchtxt.current.value,
          } 
        });
        setuserdata(raw.data.users);
    }
  return (
    <div className="w-[100%] h-[100%]">
      <div className="w-full flex  justify-between mb-4">
        <span className="text-xl font-bold">Payments Apps</span>
        <div className="w-[8%] h-10 mr-5 text-lg font-semibold flex justify-between items-center">
          <span>Hi, {" " + user}</span>
          <span className="border-2 bg-blue-400 rounded-full w-10 h-10 flex justify-center items-center">
            {user[0]}
          </span>
        </div>
      </div>
      <div className="mb-4 w-full flex  text-xl font-bold">
        <span>Your Balance: {balance}</span>
      </div>
      <div className="mb-4 w-full flex  text-xl font-bold">
        Users
      </div>
      <div className="w-[100%] flex justify-evenly mb-2">
        <input
          ref={searchtxt}
          type="text"
          placeholder="Search users"
          className="w-[80%] ml-8 h-10 pb-1 mb-2 border-2 pl-3 border-black"
        />
        <button className="bg-black w-[7%] border-0 rounded-lg h-10 text-white" onClick={handlechange}>Search</button>
      </div>
      <div className="w-[100%] h-[70%] overflow-y-scroll flex flex-col justify-start items-center  border-2 border-black">
        {userdata.map((data)=> <UserComp id={data.user_id} firstname={data.firstname} lastname={data.lastname}/>)}
      </div>
    </div>
  );
}

export default Dashboard;
