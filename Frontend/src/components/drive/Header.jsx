import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
function Header(){
    return(
        <header className=" bg-slate-800 sticky z-20 flex flex-wrap justify-between top-0 w-full py-2 px-4">
            <Logo />
            <Nav />
            
        </header> 
    )
    
}
export default Header;