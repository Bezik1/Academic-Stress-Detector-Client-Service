import "./index.css"
import type { Session } from "../../types/Session"
import { useEffect, useState } from "react"
import { SESSION_KEYS, STRESS_LEVELS } from "../../const/session"
import { priettifySessionKey } from "../../utils/text"
import StarRating from "../../components/StarRating"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../state/store"
import { getUser } from "../../state/user/userSlice"
import Sessions from "../../components/Sessions"
import CreateSessionModal from "../../components/CreateSessionModal"
import { PREDICT_URL, SESSIONS_URL, USER_SESSIONS_URL } from "../../const/api"
import { getUserSessions } from "../../state/sessions/sessionsSlice"
import { useNavigate } from "react-router-dom"
import { setError } from "../../state/error/errorSlice"
import { CloseBtn } from "../../components/svg/CloseBtn"

const HomePage = () => {
    const [activeSession, setActiveSession] = useState<Session>()
    const [activeCreateNewModal, setActiveCreateNewModal] = useState(false)
    const [newSessionData, setNewSessionData] = useState<Partial<Session>>({})

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()
    const { sessions, error: sessionsError } = useSelector((state: RootState) => state.sessions)
    const { token, error: tokenError } = useSelector((state: RootState) => state.token)
    const { user, error: userError } = useSelector((state: RootState) => state.user)

    useEffect(() =>{
        if(userError || tokenError) {
            switch(true) {
                case userError != null:
                    dispatch(setError(userError))
                    break
                case tokenError != null:
                    dispatch(setError(tokenError))
                    break
                case sessionsError != null:
                    dispatch(setError(sessionsError))
                    break
            }
            navigate("/error")
        }
    }, [userError, tokenError])

    useEffect(() => {
        if (token) {
            dispatch(getUser({ token }))
        }
    }, [token, dispatch])

    const handleStarChange = (key: keyof Session, value: number) => {
        setNewSessionData((prev) => ({ ...prev, [key]: value }))
    }

    const predictStressLevel = async (sessionId: string) => {
        if (!user || !token) {
            dispatch(setError({
                status: "400",
                message: "User or Token are invalid",
            }))
            navigate("/error")
            return
        }

        try {
            const res = await fetch(`${PREDICT_URL}/${sessionId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })

            const data = await res.text()

            if (res.ok) {
                setActiveSession(undefined)
                await dispatch(getUserSessions({ token, user }))
            } else {
                
                dispatch(setError({
                    status: res.status.toString(),
                    message: data,
                }))
                navigate("/error")
            }
        } catch (err) {
            dispatch(setError({
                status: "400",
                message: err instanceof Error ? err.message : String(err),
            }))
            navigate("/error")
        }
    }

    const createNewSession = async () => {
        try {
            if (!user || !token) throw new Error("User or Token are invalid")

            const { id, stressLevel, ...newSession } = newSessionData

            const res = await fetch(`${USER_SESSIONS_URL}/${user.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newSession),
            })

            const data = await res.text()

            if (res.ok) {
                dispatch(getUserSessions({ token, user }))
            } else {
                dispatch(setError({
                    status: res.status.toString(),
                    message: data,
                }))
                navigate("/error")
            }
        } catch (err) {
            dispatch(setError({
                status: "400",
                message: err instanceof Error ? err.message : String(err),
            }))
            navigate("/error")
        }
    }

    const removeSession = async (session: Session) =>{
        try {
            if (!user || !token) throw new Error("User or Token are invalid")

            const res = await fetch(`${SESSIONS_URL}/${session.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })

            const data = await res.text()

            if (res.ok) {
                setActiveSession(undefined)
                dispatch(getUserSessions({ token, user }))
            } else {
                dispatch(setError({
                    status: res.status.toString(),
                    message: data,
                }))
                navigate("/error")
            }
        } catch (err) {
            dispatch(setError({
                status: "400",
                message: err instanceof Error ? err.message : String(err),
            }))
            navigate("/error")
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-6 p-4">
            <nav className="special-card fixed top-0 left-0 m-10 flex items-center justify-start gap-2 bg-white p-3 w-1/9 rounded-full shadow-md">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 text-lg font-bold border-2 border-yellow-700">
                    U
                </div>
                <span className="text-xl text-yellow-700 ml-5">{user?.username}</span>
            </nav>

            <div className="flex items-center justify-between m-[5vw] mr-[10vw]">
                <img
                    className="w-3/7"
                    src="assets/images/headphones_working_version.webp"
                    alt="Example Image"
                />
                <div className="flex flex-col items-center justify-center w-2/5 h-[95vh]">
                    <h1 className="text-7xl m-8">Sessions</h1>
                    <Sessions sessions={sessions} setActiveSession={setActiveSession} />

                    <button
                        className="send-btn w-1/2 h-20 transform transition-transform duration-200 hover:-translate-y-1"
                        onClick={() => setActiveCreateNewModal(true)}
                    >
                        Create New Session
                    </button>
                </div>

                {activeSession && (
                    <div className="gap-10 flex-col fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="special-card rounded-2xl p-8 w-1/3 max-h-[80vh] overflow-y-auto shadow-xl">
                            <div className="flex justify-end items-center">
                                <CloseBtn
                                    className="cursor-pointer transform transition-transform duration-200 hover:scale-130"
                                    onClick={() => setActiveSession(undefined)}
                                />
                            </div>
                            <h2 className="text-3xl font-bold mb-6">New Session</h2>

                            <div className="grid grid-cols-2 gap-6">
                                {SESSION_KEYS.map((key) => (
                                    <div key={key}>
                                        <p className="text-sm font-medium mb-1">{priettifySessionKey(key)}</p>
                                        <StarRating
                                            value={activeSession[key] ?? null}
                                            onChange={(val) => handleStarChange(key, val)}
                                            max={key === "socialSupport" ? 3 : 5}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between gap-4 mt-6">
                                <button
                                    className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                    onClick={() => removeSession(activeSession)}
                                >
                                    Remove
                                </button>
                                <button
                                    className="px-6 py-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800"
                                    onClick={() => {
                                        setActiveSession(undefined)
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                        {activeSession.stressLevel != null 
                            ? (
                            <div className="flex justify-center items-center w-1/5 h-20 accent-card p-5 rounded-2xl">
                                <h1 className="text-3xl text-orange-200">Stess Level: {STRESS_LEVELS[activeSession.stressLevel]}</h1>
                            </div>
                            )
                            : (
                            <button onClick={() => predictStressLevel(activeSession.id.toString())} className="flex justify-center items-center w-1/5 h-20 m-10 accent-card p-5 rounded-2xl transform transition-transform duration-200 hover:-translate-y-1">
                                <h1 className="text-3xl text-orange-200">Get Stress Prediction</h1>
                            </button>
                            )
                        }
                    </div>
                )}

                {activeCreateNewModal && (
                    <CreateSessionModal
                        handleStarChange={handleStarChange}
                        newSessionData={newSessionData}
                        setActiveCreateNewModal={setActiveCreateNewModal}
                        createNewSession={createNewSession}
                    />
                )}
            </div>
        </div>
    )
}

export default HomePage
