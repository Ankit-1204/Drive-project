import React from "react";
import Modal from "react-modal"

Modal.setAppElement("#root");
const Preview=(props)=>{
  const downloadFile = async (file) => {
    try {
        const response = await fetch(props.file.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", props.file.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); 
    } catch (error) {
        console.log(error);
    }
};
    return(
        <div className="flex fixed inset-0 z-50 items-center justify-center ">
            <div className=" flex w-full h-full min-h-screen flex-col p-4 justify-center">
            <div className="flex justify-around items-center flex-row"><h2>{props.file.name}</h2> <button onClick={()=>downloadFile(props.file)}>Download</button></div>
            
            {props.file.type === "application/pdf" && (<div className="flex flex-grow justify-center">
                <embed src={props.file.url} width="80%" height="100%" type="application/pdf" />
                </div>
            )}
            {props.file.type.startsWith("video/") && (<div className="flex flex-grow justify-center">
            <video width="320" height="100%" controls>
              <source src={props.file.url} type={props.file.type} />
              Your browser does not support the video tag.
            </video>
            </div>
            )}

            {props.file.type.startsWith("text/") && (<div className="flex flex-grow justify-center">
            <iframe src={props.file.url} title={props.file.name} width="500" height="375" className="max-w-full h-auto"></iframe></div>
          )}

            <div className="flex justify-center"><button onClick={props.closeFile} className="close-button">Close</button></div>
            
            </div>
        </div>
        
    )
}

export default Preview;