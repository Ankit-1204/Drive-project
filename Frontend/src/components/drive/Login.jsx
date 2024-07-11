import React, { useState } from "react";
import { useAuth } from "../../context/AuthContest";
import { Link } from "react-router-dom";
import logo from "../../assets/Designer.png"

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
        
            <div className="flex fixed inset-0 justify-around items-center  bg-white [background:radial-gradient(125%_125%_at_50%_10%,gray,black)] flex-col md:flex-row  px-10">
            <div className=" max-w-lg w-2/5 md:w-3/5 mx-5">
                
                    <img className="" src={logo} alt="Logo"/>
                
            </div>
            <div className="flex flex-col bg-slate-300 max-w-lg w-full md:w-3/5  p-4 rounded-xl ring-4 ring-opacity-50 ring-blue-900 mx-5">
                <form className="">
                <label className=" flex flex-col items-center text-3xl font-serif font-semibold mb-2">Login</label>
                <div className="mt-2 space-y-2">
                    <label className=" text-lg  ml-1 font-semibold">E-mail</label>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border-2 border-gray-400 rounded-lg border-opacity-20 p-2" placeholder="Email or Username" />
                </div>
                <div className="mt-2 space-y-2">
                    <label className=" text-lg ml-1 font-semibold">Password</label>
                    <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} className="w-full border-2 border-gray-400 rounded-lg border-opacity-20 p-2" placeholder="Password" />
                </div>
                
                <div className="flex justify-center mt-6 pb-4 border-b-2">
                    <button onClick={handleLogin} className=" w-2/4 py-3 bg-blue-500 text-white rounded-lg text-lg">Submit</button>
                </div>
                <div className="flex justify-center m-2 p-2 font-serif">
                    <Link className=" text-lg hover:text-blue-700 hover:font-bold" to={"/signup"}>Are You New here?</Link>
                </div>
                </form>
            </div>
            </div>
    )
}

export default Login;