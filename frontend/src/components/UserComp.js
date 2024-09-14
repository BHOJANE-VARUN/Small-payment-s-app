import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserComp({id,firstname,lastname}) {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-between w-[95%] mt-5">
          <div className="w-[80%] ml-[1%] flex justify-start h-[10%]">
            <span className="border-2 border-black rounded-full font-semibold text-lg pt-1 pl-2 w-10 h-10">
              {firstname[0]+lastname[0]}
            </span>
            <span className="font-bold pl-4 pt-0.5 text-2xl">{firstname + " " + lastname}</span>
          </div>
          <button onClick={()=>{
            navigate("/Moneytransfer?firstname=" + firstname+"&lastname="+lastname + "&id="+id);
          }} className="bg-black text-white w-[8%] pb-1 text-lg font-semibold mr-2 border-0 rounded-md">
            Send Money
          </button>
        </div>
  )
}

export default UserComp