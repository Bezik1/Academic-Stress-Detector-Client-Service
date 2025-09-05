import { useState } from "react";
import type { User } from "../../types/User";
import { LogoutBtn } from "../svg/LogoutBt";
import { logout } from "../../state/token/tokenSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }: { user: User | null }) =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);

    const onLogout = () => {
        dispatch(logout());
        navigate("/")
    };

    return (
        <nav 
            className={`${!open && "cursor-pointer"} special-card fixed top-0 left-0 m-10 flex items-center justify-start gap-2 bg-white p-3 w-1/9 rounded-full shadow-md`}
            onClick={() => setOpen(!open)}
        >
            <div
                className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 text-lg font-bold border-2 border-yellow-700"
            >
                U
            </div>

            <span
                className="text-xl text-yellow-700 ml-5 select-none"
            >
                {user?.username}
            </span>

            {open && (
            <div className="w-full text-yellow-700 special-card absolute top-full left-0 p-3 -mt-5 pt-10 bg-white rounded-bl-xl rounded-br-xl shadow-lg -z-10">
                <div className="cursor-pointer text-xl flex gap-5 items-center transform transition-transform duration-500 hover:-translate-y-1">
                    <LogoutBtn className="pl-1 w-10 h-10"/>
                    <button
                        onClick={() => {
                            setOpen(false);
                            onLogout();
                        }}
                        className="pl-2"
                    >
                        Logout
                    </button>
                </div>
            </div>
            )}
        </nav>
    );
}

export default Navbar