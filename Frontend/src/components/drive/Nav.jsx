import { useState } from "react";
import { Link } from "react-router-dom";

function Navlink(){
    return(
        <>
            <Link to="/profile"> Profile </Link>
            <Link to="/about"> About </Link>
        </>
    )
}

function Nav(){
    const [open,isOpen]=useState(true);
    return(
        <nav className=" w-1/5 flex justify-end">
            
            <div className="md:flex w-full hidden justify-between">
                <Navlink/>
            </div>
            
            
            <div className="md:hidden">
                <button onClick={()=>{isOpen(true)}}> X </button>
            </div> 
            
            
        </nav>
    )
}

export default Nav;