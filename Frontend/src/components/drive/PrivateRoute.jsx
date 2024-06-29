import { Navigate, Route, redirect } from "react-router-dom";
import React from "react";
import { useAuth } from "../../context/AuthContest";
import Home from "./Home";
export const PrivateRoute=({children})=>{
    const {curruser}=useAuth();
    return(
        curruser ?children: <Navigate to="/signup" />
    )
}

export const PublicRoute=({children})=>{
    const {curruser}=useAuth();
    return(
        curruser===null?children:<Navigate to="/" />
    )
}