import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
function Signup() {
    const [username,setusername] = useState("");
    const [password,setpass] = useState("");
    const [firstname,setfirst] = useState("");
    const [lastname,setlast] = useState("");
    const [messager,setmessager] = useState("");
    const navigate = useNavigate();
    const handlealredy = ()=>{
        navigate("/Signin");
    }
    const submit  = async ()=>{
        try {
            const responce = await axios.post("http://localhost:3001/api/v1/user/signup",{
                username,
                firstname,
                lastname,
                password,
            })
            navigate("/signin")
        } catch (error) {
            setmessager(error.response.data.message);
        }
        
    }
  return (
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
            ZETPAY    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div>
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
            <h1 className='text-red-600'>
                {messager}
              </h1>
            </div> 
              <form class="space-y-4 md:space-y-6" onSubmit={(e)=> e.preventDefault()}>
                    
                  <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                      <input onChange={(e)=> setusername(e.target.value)} type="username" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g sage@love" required=""/>
                  </div>
                  <div>
                      <label for="Firstname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                      <input onChange={(e)=> setfirst(e.target.value)} type="Firstname" name="Firstname" id="Firstname" placeholder="e.g Ritviz" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label for="Lastname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                      <input onChange={(e)=> setlast(e.target.value)} type="Lastname" name="Lastname" id="Lastname" placeholder="e.g Srivastava" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input onChange={(e)=> setpass(e.target.value)} type="password" name="password" id="password" placeholder="••••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button onClick={submit} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={handlealredy}>Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
 ) 
}

export default Signup