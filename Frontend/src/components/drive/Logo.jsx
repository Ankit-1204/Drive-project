import logo from "../../assets/Designer.png"
import { Link } from "react-router-dom";
function Logo(){
    return(
        <div className=" pl-5 w-24 l-24 flex flex-row items-center">
        <Link className="flex flex-row items-center" to="/">
            <img className="rounded-lg" src={logo} alt="Logo"/>
            <span className="text-white text-2xl font-bold ml-2" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>LockBox</span>
        </Link>
            
        </div>
    )
}
export default Logo;