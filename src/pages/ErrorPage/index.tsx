import { useSelector } from "react-redux"
import "./index.css"
import type { RootState } from "../../state/store"

const ErrorPage = () => {
    const error = useSelector((state: RootState) => state.error.error)
    
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-7xl">Error {error?.status}</h1>
            <img
                className="w-3/5"
                src="assets/images/error_version.webp"
                alt="Example Image"
            />
            <div>
                <span className="text-4xl">Oh no you got on error</span>
                <div className="text-4xl text-center">
                    {error?.message}
                </div>
            </div>
        </div>
    )
}

export default ErrorPage