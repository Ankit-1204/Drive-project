import React from "react";
import Modal from "react-modal"


const Preview=(props)=>{
    
    return(
        
            <div>
                <h2>{props.file.name}</h2>
                {props.file.type === "application/pdf" && (
                    <embed src={props.file.url} width="100%" height="500px" type="application/pdf" />
                )}
                <button onClick={props.closeFile} className="close-button">Close</button>
            </div>
        
    )
}

export default Preview;