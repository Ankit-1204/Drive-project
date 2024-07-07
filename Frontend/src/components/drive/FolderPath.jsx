import React from "react";
import { Link } from "react-router-dom";

const FolderPath=(props)=>{
    const {folder}=props;

    return(
        <div className="flex">
            <span className="text-2xl font-bold font-sans"><Link to="/">ROOT/</Link></span>
            {folder.path.map((docs)=>(<span key={docs.id} className="text-2xl font-bold font-sans"><Link to={"/folder/"+docs.id}>{docs.name}/</Link></span>))}
            {folder.name!=="root" && <span className="text-2xl font-bold font-sans text-gray-500">{folder.name}</span>}
        </div>
    )
}

export default FolderPath;