import { Link } from "react-router-dom"
import "./index.css"
import { RegisterBlob } from "../../components/svg/RegisterBlob"
import { LoginBlob } from "../../components/svg/LoginBlob"

const WelcomePage = () =>{
    return (
        <div className="flex justify-center items-center gap-30">
            <Link to="/login" className="z-2 relative text-6xl transform transition-transform duration-200 hover:scale-110">
                <span>Login</span>
                <LoginBlob className="absolute -top-30 -right-30 -z-1 w-[20vw]" />
            </Link>
            <img
                className="w-3/7"
                src="assets/images/welcome_version.webp"
                alt="Example Image"
            />
            <Link to="/register" className="z-2 relative text-6xl transform transition-transform duration-200 hover:scale-110">
                <span>Register</span>
                <RegisterBlob className="absolute -top-30 -left-20 -z-1 w-[20vw]" />
            </Link>

        </div>
    )
}

export default WelcomePage