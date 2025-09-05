import { useState } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../state/store";
import { getToken } from "../../state/token/tokenSlice";
import { useNavigate } from "react-router-dom";
import { setError } from "../../state/error/errorSlice";
import { setLoading } from "../../state/loading/loadingSlice";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleError = (status: string, message: string | object) => {
        let userMessage = typeof message === "string" ? message : "An unexpected error occurred";
        if (typeof message === "object" && message !== null && "message" in message) {
            userMessage = (message as any).message;
        }
        dispatch(setError({ status, message: userMessage }));
        navigate("/error", { replace: true });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            dispatch(setLoading({ loading: true, message: "Signing in" }));
            navigate("/loading", { replace: true });

            await dispatch(getToken({ email, password })).unwrap();

            dispatch(setLoading({ loading: false, message: null }));
            navigate("/home");
        } catch (err) {
            handleError("400", err instanceof Error ? err.message : String(err));
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center w-1/2">
                <h1 className="special-text text-2xl mb-4">Sign in</h1>
                <form
                    className="flex flex-col gap-10 w-3/4 justify-center items-center"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-btn p-2 w-3/4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-btn p-2 w-3/4"
                    />
                    <button
                        type="submit"
                        className="login-btn send-btn w-1/2 transform transition-transform duration-200 hover:-translate-y-1"
                    >
                        Login
                    </button>
                </form>
            </div>
            <img
                className="w-1/2"
                src="assets/images/working_version.webp"
                alt="Example Image"
                loading="lazy"
            />
        </div>
    );
};

export default LoginPage;
