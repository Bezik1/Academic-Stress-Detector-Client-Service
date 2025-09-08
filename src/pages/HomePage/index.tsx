import "./index.css"
import type { Session } from "../../types/Session"
import { useEffect, useState } from "react"
import { initialNewSessionState, SESSION_KEYS, STRESS_LEVELS } from "../../const/session"
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
import Navbar from "../../components/Navbar"
import { setLoading } from "../../state/loading/loadingSlice"

const HomePage = () => {
    const [activeSession, setActiveSession] = useState<Session>()
    const [activeCreateNewModal, setActiveCreateNewModal] = useState(false)
    const [newSessionData, setNewSessionData] = useState<Partial<Session>>(initialNewSessionState)

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { sessions, error: sessionsError } = useSelector((state: RootState) => state.sessions)
    const { token, error: tokenError } = useSelector((state: RootState) => state.token)
    const { user, error: userError } = useSelector((state: RootState) => state.user)
    const { loading } = useSelector((state: RootState) => state.loading)

    const handleError = (status: string, message: string) => {
        dispatch(setError({ status, message }))
        navigate("/error", { replace: true })
    }

    useEffect(() => {
        if (userError || tokenError || sessionsError) {
        if (userError) handleError(userError.status, userError.message)
        else if (tokenError) handleError(tokenError.status, tokenError.message)
        else if (sessionsError) handleError(sessionsError.status, sessionsError.message)
        }
    }, [userError, tokenError, sessionsError])

    useEffect(() => {
        if (sessions) return
        const getUserAsyncSessions = async () => {
            if (token && user) {
                dispatch(setLoading({ loading: true, message: "Getting User Sessions" }))
                navigate("/loading", { replace: true })
                try {
                    const resultAction = await dispatch(getUserSessions({ token, user }))
                    if (getUserSessions.rejected.match(resultAction)) {
                        handleError(resultAction.payload?.status ?? "400", resultAction.payload?.message ?? "Failed to fetch sessions")
                    }
                } finally {
                    dispatch(setLoading({ loading: false, message: null }))
                    if (!loading) navigate("/home")
                }
            }
        }
        getUserAsyncSessions()
    }, [token, user?.id])

    useEffect(() => {
        if (user) return
        const getUserAsyncInfo = async () => {
            if (!token && location.pathname !== "/") {
                handleError("401", "Token not found")
                return
            }
            dispatch(setLoading({ loading: true, message: "Getting User Info" }))
            navigate("/loading", { replace: true })
            try {
                if (token) {
                    const resultAction = await dispatch(getUser({ token }))
                if (getUser.rejected.match(resultAction)) {
                    handleError(resultAction.payload?.status ?? "400", resultAction.payload?.message ?? "Failed to fetch user info")
                }
                }
            } finally {
                dispatch(setLoading({ loading: false, message: null }))
                navigate("/home")
            }
        }
        getUserAsyncInfo()
    }, [])

    const handleStarChange = (key: keyof Session, value: number) => {
        setNewSessionData(prev => ({ ...prev, [key]: value }))
    }

    const callApi = async <T = any>(
        url: string,
        method: string,
        body?: any,
        actionName?: string
    ): Promise<T | null> => {
        if (!user || !token) {
            handleError("400", "User or token invalid")
            return null
        }

        dispatch(setLoading({ loading: true, message: actionName ?? null }))
        navigate("/loading", { replace: true })

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: body ? JSON.stringify(body) : undefined,
            })

            const textData = await res.text()
            let data: any
            try {
                data = JSON.parse(textData)
            } catch {
                data = textData
            }

            if (!res.ok) {
                const errorMessage = String(`${data?.message}: ${data?.error}`) ?? textData ?? "An unexpected error occurred"
                handleError(res.status.toString(), errorMessage)
                return null
            }

            return data as T
        } catch (err) {
            handleError("400", err instanceof Error ? err.message : String(err))
            return null
        } 
    }


    const predictStressLevel = async (sessionId: string) => {
        if(token == null || user == null) {
            handleError("401", "Unauthorized token")
            return
        }

        await callApi(`${PREDICT_URL}/${sessionId}`, "POST", undefined, "Predicting Stress Level")
        setActiveSession(undefined)
        await dispatch(getUserSessions({ token, user }))
        navigate("/home", { replace: true })
    }

    const createNewSession = async () => {
        if (!token || !user) {
            handleError("401", "Unauthorized token")
            return
        }

        const { id, stressLevel, ...newSession } = newSessionData

        try {
            const result = await callApi(`${USER_SESSIONS_URL}/${user.id}`, "POST", newSession, "Creating New Session" )

            if (!result) return

            setNewSessionData(initialNewSessionState)
            const refreshAction = await dispatch(getUserSessions({ token, user }))
            if (getUserSessions.rejected.match(refreshAction)) {
                handleError(
                    refreshAction.payload?.status ?? "400",
                    refreshAction.payload?.message ?? "Failed to refresh sessions"
                )
            }
            dispatch(setLoading({ loading: false, message: null }))
        } finally {
            dispatch(setLoading({ loading: false, message: null }))
            navigate("/home", { replace: true })
        }
    }

    const removeSession = async (session: Session) => {
        if(token == null || user == null) {
            handleError("401", "Unauthorized token")
            return
        }

        await callApi(`${SESSIONS_URL}/${session.id}`, "DELETE", undefined, "Removing Session")
        setActiveSession(undefined)
        await dispatch(getUserSessions({ token, user }))
        navigate("/home", { replace: true })
    }

    return (
        <div className="flex flex-col justify-center items-center gap-6 p-4">
            <Navbar user={user} />

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
