import React from "react";
import { Link } from "react-router-dom";

const FolderPath=(props)=>{
    const {folder}=props;

    return(
        <div className="flex">
            <Link to="/">ROOT</Link>
            {folder.path.map((docs)=>(<span className="text-2xl font-bold font-sans"><Link to={"/folder/"+docs.id}>{docs.name}</Link></span>))}
        </div>
    )
}

export default FolderPath;