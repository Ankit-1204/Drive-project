import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../../context/AuthContest";
function Navlink(props){
    const {signout}=useAuth();
    const handleLogOut=async()=>{
        try {
           await signout(); 
        } catch (error) {
            console.log(error)
        }
        
    }
    return(
        <>
            <Link to="/profile" className="flex items-center" ><FaUserCircle className="w-10 h-10 mr-2"/> Profile </Link>
            {/* <Link to="/about" > About </Link> */}
            <button onClick={handleLogOut} className="flex items-center"><IoLogOutOutline className="w-10 h-10 mr-2"/>Logout</button>
        </>
    )
}

function Nav(){
    const [open,isOpen]=useState(true);
    return(
        <>
        <nav className=" w-1/3 flex justify-end text-white text-xl ">
            
            <div className="md:flex w-full hidden justify-around items-center">
                <Navlink margin="mt-6"/>
            </div>
            
            
            <div className="md:hidden">
                <button onClick={()=>{isOpen(!open)}}> {open ?<IoMdArrowDropdownCircle className="w-10 h-10"/> : <IoCloseSharp className="w-10 h-10"/> } </button>
            </div> 
        </nav>
        {!open && <div className="flex flex-col items-center basis-full md:hidden text-white text-xl my-4"><Navlink margin="mb-2"/></div>}
        </>
    )
}

export default Nav;