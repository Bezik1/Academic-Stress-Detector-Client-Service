import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { REGISTER_URL } from "../../const/api";
import { setError } from "../../state/error/errorSlice";
import { useDispatch } from "react-redux";
import { setLoading } from "../../state/loading/loadingSlice";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
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
            dispatch(setLoading({ loading: true, message: "Signing up" }));
            navigate("/loading", { replace: true });

            const res = await fetch(REGISTER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const textData = await res.text();
            let data: any;
            try {
                data = JSON.parse(textData);
            } catch {
                data = textData;
            }

            if (!res.ok) {
                const errorMessage = data?.message ?? textData ?? "Failed to register";
                handleError(res.status.toString(), errorMessage);
                return;
            }

            dispatch(setLoading({ loading: false, message: null }));
            navigate("/login");
        } catch (err) {
            handleError("400", err instanceof Error ? err.message : String(err));
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <img
                className="w-1/2"
                src="assets/images/awake_version.webp"
                alt="Example Image"
            />
            <div className="flex flex-col justify-center items-center h-full w-1/2 mb-[10vh]">
                <h1 className="special-text text-2xl mb-4">Sign up</h1>
                <form
                    className="flex flex-col gap-8 w-3/4 justify-center items-center"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-btn p-2 w-3/4"
                    />
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
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
