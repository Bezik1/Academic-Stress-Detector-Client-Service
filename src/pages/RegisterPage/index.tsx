import { useState } from "react"
import "./index.css"
import { useNavigate } from "react-router-dom"
import { REGISTER_URL } from "../../const/api"
import { setError } from "../../state/error/errorSlice"
import { useDispatch } from "react-redux"

const RegisterPage = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        
        try {
            const res = await fetch(REGISTER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            })

            if(res.ok) {
                dispatch(setError({
                    status: res.statusText,
                    message: await res.text()
                }))
                navigate('/login')
            }
        } catch(err) {
            dispatch(setError({
                status: "400",
                message: err as string
            }))
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <img
                className="w-2/5"
                src="assets/images/awake_version.webp"
                alt="Example Image"
            />
            <div className="flex flex-col justify-center items-center h-full w-1/2  mb-[10vh]">
                <h1 className="special-text text-2xl mb-4">Sign up</h1>
                <form className="flex flex-col gap-8 w-3/4 justify-center items-center" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="input-btn p-2 w-3/4"
                    />
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
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage