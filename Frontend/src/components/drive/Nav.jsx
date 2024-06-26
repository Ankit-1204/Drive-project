import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
function Navlink(props){
    return(
        <>
            <Link to="/profile" className={props.margin}> Profile </Link>
            <Link to="/about" className={props.margin}> About </Link>
        </>
    )
}

function Nav(){
    const [open,isOpen]=useState(true);
    return(
        <>
        <nav className=" w-1/5 flex justify-end text-white text-lg ">
            
            <div className="md:flex w-full hidden justify-around">
                <Navlink margin="mt-6"/>
            </div>
            
            
            <div className="md:hidden">
                <button onClick={()=>{isOpen(!open)}}> {open ?<IoMdArrowDropdownCircle className="w-10 h-10"/> : <IoCloseSharp className="w-10 h-10"/> } </button>
            </div> 
        </nav>
        {!open && <div className="flex flex-col items-center basis-full md:hidden text-white text-lg my-4"><Navlink margin="mb-2"/></div>}
        </>
    )
}

export default Nav;