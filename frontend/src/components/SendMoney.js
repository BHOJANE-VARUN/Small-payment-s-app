import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
function SendMoney({firstname,lastname,id,setamount,amount,setsend}) {

    const token = localStorage.getItem('token');
    const handletransfer = async ()=>{

        const responce = await axios.post("http://localhost:3001/api/v1/account/transfer",
          {
            to:id,
            amount,
          },{
          headers:{
            authentication:token,
          }
        })
        setsend(true); 
    }
    
  return (
    <div className="w-80 h-80 border-2  flex flex-col justify-evenly bg-white shadow-lg">
    <span className="text-3xl text-center font-bold">Send Money</span>
    <div className="h-44 flex flex-col justify-between items-center">
      <div className="w-[80%] ml-[1%] flex justify-start h-[10%]">
        <span className="border-2 bg-green-600 text-white rounded-full font-semibold text-lg flex justify-center items-center w-10 h-10">
          {firstname[0]+lastname[0]}
        </span>
        <span className="font-bold pl-4 pt-0.5 text-2xl">
          {firstname + " " + lastname}
        </span>
      </div>
      <span className="text-start w-64 mt-2 ml-2">Amount (in Rs)</span>
      <input
        onChange={(e)=> setamount(e.target.value)}
        type="number"
        placeholder="Enter amount"
        className="border-2 border-black w-72 h-11 pl-3"
      />
      <button onClick={handletransfer} className="w-32 h-10 bg-green-600 text-white border-0 rounded-lg">
        Initiate Transfer
      </button>
    </div>
  </div>
  )
}

export default SendMoney