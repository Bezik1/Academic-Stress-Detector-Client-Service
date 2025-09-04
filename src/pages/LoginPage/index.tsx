import { useState } from "react"
import "./index.css"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../state/store"
import { getToken } from "../../state/token/tokenSlice"
import { useNavigate } from "react-router-dom"
import { setError } from "../../state/error/errorSlice"

const LoginPage = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        try {
            await dispatch(getToken({ email, password })).unwrap()
            navigate("/home")
        } catch(err) {
            dispatch(setError({
                status: "400",
                message: err as string
            }))
            navigate("/error")
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <img
                className="w-2/5"
                src="assets/images/working_version.webp"
                alt="Example Image"
            />
            <div className="flex flex-col justify-center items-center h-full w-1/2  mb-[10vh]">
                <h1 className="special-text text-2xl mb-4">Sign in</h1>
                <form className="flex flex-col gap-10 w-3/4 justify-center items-center" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="input-btn p-2 w-3/4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="input-btn p-2 w-3/4"
                    />
                    <button type="submit" className="login-btn send-btn w-1/2 transform transition-transform duration-200 hover:-translate-y-1">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage