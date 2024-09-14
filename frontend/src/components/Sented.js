import React from 'react'

function Sented({lastname,firstname,amount,setsend}) {
  return (
    <div className="w-80 h-80 border-2  flex flex-col justify-evenly bg-white shadow-lg items-center">
    <span className="text-3xl text-center font-bold">{amount}₹ sended to {firstname + " " + lastname}</span>
    <button onClick={()=> setsend(false)} className='w-32 h-10 bg-green-600 text-white border-0 rounded-lg'>OK</button>
  </div>
  )
}

export default Sented