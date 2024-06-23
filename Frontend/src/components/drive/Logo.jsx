import logo from "../../assets/Designer.webp"
function Logo(){
    return(
        <div className=" logo w-24 l-24 ">
            <img className="rounded-lg" src={logo} alt="Logo"/>
        </div>
    )
}
export default Logo;