import React from "react";
import { useAuth } from "../../context/AuthContest";
import { database } from "../../firebase";
import { addDoc, arrayUnion, getDoc, updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";

export const Friend=(props)=>{
    const {curruser}= useAuth()
    const {friend,request}= props;
    const handleAccept=async(req)=>{
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
    return(
        <div className="flex fixed inset-0 z-50 items-center justify-center ">
            <div className=" flex w-full flex-row p-4 justify-center">
                {friend.map((f)=>(<div className=" bg-white rounded-md flex p-4 flex-col" key={f.id}>{f.email} </div> ))}
                {request.map((req)=>(<div key={req.id} className=" bg-white rounded-md flex p-4 flex-col"> {req.email} <button onClick={()=>handleAccept(req)}>Accept</button></div>))}
            </div>

        </div>
    )
}