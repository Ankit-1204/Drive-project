import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../../context/AuthContest";
import { doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { database } from "../../firebase";
function Navlink(props){
    const {signout,curruser}=useAuth();
    const [friend,setFriend]= useState("");
    const handleLogOut=async()=>{
        try {
           await signout(); 
        } catch (error) {
            console.log(error)
        }
    }
    const sendFriendRequest=async()=>{
        if(friend===""){
            console.log("please enter something")
            return;
        }
        if(friend===curruser.email){
            console.log("You entered your own email");
            return;
        }
        
            try{
               const q= query(database.user,where("email","==",friend));
               const querySnaps= await getDocs(q);

               querySnaps.forEach(async (snaps)=>{
                    const docRef=doc(database.user,snaps.id);
                    
                    if (!snaps.data().requests.includes(curruser.uid)) {
                        await updateDoc(docRef, {
                            requests: [...snaps.data().requests, curruser.uid]
                        });
                        console.log("Request sent successfully!");
                    } else {
                        console.log("Request already exists.");
                    }
               });
               setFriend("");
            }catch(e){
                console.log(e);
            }
            
        
    }
    
    return(
        <>  
            <div>
                <input placeholder="Friend Email" className=" text-black" value={friend} onChange={(e)=>setFriend(e.target.value)} type="text"/>
                <button onClick={sendFriendRequest}>Request</button>
            </div>
            <Link to="/profile" className="flex items-center p-3 hover:bg-slate-950 rounded-lg" ><FaUserCircle className="w-10 h-10 mr-2"/> Profile </Link>
            
            <button onClick={handleLogOut} className="flex items-center p-3 hover:bg-slate-950 rounded-lg"><IoLogOutOutline className="w-10 h-10 mr-2"/>Logout</button>
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
            
            
            <div className="md:hidden flex items-center">
                <button onClick={()=>{isOpen(!open)}}> {open ?<IoMdArrowDropdownCircle className="w-10 h-10"/> :<IoCloseSharp className="w-10 h-10"/> } </button>
            </div> 
        </nav>
        {!open && <div className="flex flex-col items-center basis-full md:hidden text-white text-xl my-4"><Navlink margin="mb-2"/></div>}
        </>
    )
}

export default Nav;