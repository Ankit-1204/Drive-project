import { Navigate, Route, redirect } from "react-router-dom";
import React from "react";
import { useAuth } from "../../context/AuthContest";
import Home from "./Home";
const PrivateRoute=({component:Component ,...rest})=>{
    const {curruser}=useAuth();
    return(
        <Route {...rest} element={curruser ?<Component />: <Navigate to={"/login"} />} />
    )
}
export default PrivateRoute;