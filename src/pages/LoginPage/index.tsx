import "./index.css"

const LoginPage = () => {
    return (
    <div className="w-full h-screen flex justify-center items-center">
        <img
            className="w-2/5"
            src="assets/images/working_version.webp"
            alt="Example Image"
        />
        <div className="flex flex-col justify-center items-center h-full w-1/2  mb-[10vh]">
            <h1 className="special-text text-2xl mb-4">Sign in</h1>
            <form className="flex flex-col gap-10 w-3/4 justify-center items-center">
                <input
                    type="email"
                    placeholder="Email"
                    className="input-btn p-2 w-3/4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input-btn p-2 w-3/4"
                />
                <button className="login-btn send-btn w-1/2 transform transition-transform duration-200 hover:-translate-y-1">
                    Login
                </button>
            </form>
        </div>
    </div>
    )
}

export default LoginPage