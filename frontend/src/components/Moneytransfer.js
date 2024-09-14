import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SendMoney from "./SendMoney";
import Sented from "./Sented";
function Moneytransfer() {
  const [params,setparams] = useSearchParams(); 
  const firstname = params.get("firstname");
  const lastname = params.get("lastname");
  const id = params.get("id");
  const [send,setsend] = useState(false);
  const [amount,setamount] = useState(null);
  
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center bg-gray-100">
      {!send?<SendMoney firstname={firstname} lastname={lastname} id={id} setamount={setamount} amount={amount} setsend={setsend}/>:<Sented lastname={lastname} firstname={firstname} amount={amount} setsend={setsend}/>}
    </div>
  );
}

export default Moneytransfer;
