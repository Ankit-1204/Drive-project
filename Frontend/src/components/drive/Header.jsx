import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
function Header(){
    return(
        <header className=" bg-gradient-to-r from-green-400 to-blue-500 sticky z-20 flex flex-wrap justify-between mx-auto top-0 w-full p-10">
            <Logo />
            <Nav />
            
        </header> 
    )
    
}
export default Header;