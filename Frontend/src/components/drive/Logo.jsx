import logo from "../../assets/Designer.webp"
import { Link } from "react-router-dom";
function Logo(){
    return(
        <div className=" logo w-24 l-24 ">
        <Link to="/">
            <img className="rounded-lg" src={logo} alt="Logo"/>
        </Link>
            
        </div>
    )
}
export default Logo;