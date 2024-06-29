import React, { useState } from "react";
import { useAuth } from "../../context/AuthContest";


const Login= ()=>{
    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const {login}=useAuth();
    const handleLogin= async(e)=>{
        e.preventDefault();
        try{
           await login(email,pass);
        }catch(e){
            console.log(e);
        }
        
    }
    return(
        
            <div className="flex fixed inset-0 justify-center items-center bg-slate-200">
            
            <div className="flex flex-col bg-white max-w-lg w-full md:w-3/5 mx-4 p-4 md:mx-auto rounded-xl border-4 ring-gray-400">
                <form className="">
                <label className=" flex flex-col items-center text-3xl font-serif font-semibold mb-2">Login</label>
                <div className="mt-2 space-y-2">
                    <label className=" text-lg font-light ml-1 ">E-mail</label>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border-2 border-gray-400 rounded-lg border-opacity-20 p-2" placeholder="Email or Username" />
                </div>
                <div className="mt-2 space-y-2">
                    <label className=" text-lg font-light ml-1 ">Password</label>
                    <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} className="w-full border-2 border-gray-400 rounded-lg border-opacity-20 p-2" placeholder="Email or Username" />
                </div>
                
                <div className="flex justify-center mt-6">
                    <button onClick={handleLogin} className=" w-2/4 py-3 bg-blue-500 text-white rounded-lg text-lg">Submit</button>
                </div>

                </form>
            </div>
            
            </div>
    )
}

export default Login;