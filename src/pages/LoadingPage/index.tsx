import { motion } from "framer-motion"
import "./index.css"
import { useSelector } from "react-redux"
import type { RootState } from "../../state/store"

const container: any = {
    animate: {
        transition: {
        staggerChildren: 0.2,
        },
    },
}

const dot: any = {
    initial: { opacity: 0 },
    animate: {
        opacity: [0, 1, 0],
        transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        },
    },
}

const LoadingPage = () => {
    const { message } = useSelector((state: RootState) => state.loading) 

    return (
        <div className="w-full h-full object-cover filter brightness-95  flex flex-col items-center justify-center gap-8">
            <div>
                {message && <div className="text-3xl text-center">{message}</div>}
                <span className="text-3xl text-center">It may take a while...</span>
            </div>
            <img
                className="w-1/2"
                src="assets/images/loading_version.webp"
                alt="Example Image"
            />
            <h1 className="text-7xl flex items-center gap-2">
                Loading
                <motion.span
                    className="flex gap-2"
                    variants={container}
                    initial="initial"
                    animate="animate"
                >
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="text-7xl"
                        variants={dot}
                    >
                    .
                    </motion.span>
                ))}
                </motion.span>
            </h1>
        </div>
    )
}

export default LoadingPage