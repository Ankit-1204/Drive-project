import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useAuth } from "../../context/AuthContest";
import { doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { database } from "../../firebase";
import { useFriends } from "../Hooks/useFriends";
function Navlink(props){
    const {request,friend}=useFriends();
    const {signout,curruser}=useAuth();
    const [friendReq,setFriend]= useState("");
    const [displayFriend,setDisplayFriend]=useState(false);
    const sendFriendRequest=async()=>{
        if(friendReq===""){
            console.log("please enter something")
            return;
        }
        if(friendReq===curruser.email){
            console.log("You entered your own email");
            return;
        }
        
            try{
               const q= query(database.user,where("email","==",friendReq));
               const querySnaps= await getDocs(q);

               querySnaps.forEach(async (snaps)=>{
                    const docRef=doc(database.user,snaps.id);
                    
                    if (!snaps.data().requests.includes(curruser.uid)) {
                        await updateDoc(docRef, {
                            requests: [...snaps.data().requests,{id: curruser.uid,email:curruser.email}]
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
    const handleRequestAccept=async(req)=>{
        const docRef=doc(database.user,curruser.uid);
        const sendRef=doc(database.user,req.id);
        try {
            const userDoc= await getDoc(docRef);
            if(userDoc.exists()){
                const elem={
                    id:req.id,
                    email:req.email
                }
                const seelem={
                    id:curruser.uid,
                    email:curruser.email
                }
                await updateDoc(docRef,{
                    friends:arrayUnion(elem)
                })
                await updateDoc(sendRef,{
                    friends:arrayUnion(seelem)
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    console.log(friend);
    const handleLogOut=async()=>{
        try {
           await signout(); 
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <>    
            <div>
                <button className="flex items-center p-3 hover:bg-slate-950 rounded-lg" onClick={()=>setDisplayFriend(!displayFriend)}> <FaUserFriends className="w-10 h-10 mr-2" /> Friends </button>

                {displayFriend && <div className=" bg-slate-700 p-2 rounded-lg overflow-hidden transition-all duration-300 ease-in-out absolute space-y-2">
                    <div className=" my-2">
                        <input placeholder="Friend Email" className=" text-black p-2 rounded-lg mr-2" value={friendReq} onChange={(e)=>setFriend(e.target.value)} type="text"/>
                        <button className=" bg-slate-800 p-2 rounded-lg" onClick={sendFriendRequest}>Request</button>
                    </div>
                    <div>
                    <span>Friend List</span>
                    {friend.map((f)=>(<div className=" bg-slate-800 rounded-md flex p-4 flex-col" key={f.id}>{f.email} </div> ))}
                    </div>
                    <div>
                    <span>Request List</span>
                    {request.map((req)=>(<div key={req.id} className=" bg-slate-800 rounded-md flex p-4 flex-col"> {req.email} <button onClick={()=>handleRequestAccept(req)}>Accept</button></div>))}
                    </div>
                </div>}
            </div>          
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