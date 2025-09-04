import { useDispatch, useSelector } from "react-redux"
import { SESSION_KEYS, STRESS_LEVELS } from "../../const/session"
import type { Session } from "../../types/Session"
import { priettifySessionKey } from "../../utils/text"
import StarRating from "../StarRating"
import type { AppDispatch, RootState } from "../../state/store"
import { useEffect } from "react"
import { getUserSessions } from "../../state/sessions/sessionsSlice"

const Sessions = ({ sessions, setActiveSession } : { sessions: Session[], setActiveSession: (session: Session) => void }) =>{
    const dispatch = useDispatch<AppDispatch>()
    
    const token = useSelector((state: RootState) => state.token.token)
    const user = useSelector((state: RootState) => state.user.user)

    useEffect(() =>{
        if(token && user) {
            dispatch(getUserSessions({ token, user }))
        }
    }, [token, user?.id, dispatch,])

    return (
        <div className="flex items-start justify-center gap-5 overflow-x-auto w-[50vw] h-[65vh] scrollbar-hide">
            {sessions.length > 0 
                ? (sessions.map((session) => (
                <div
                    className="cursor-pointer mb-5 transform transition-transform duration-500 hover:translate-y-5"
                    key={session.id}
                    onClick={() => setActiveSession(session)}
                >
                    <div className="special-card rounded-xl p-4 shadow-2xl flex-shrink-0 w-80 mb-10">
                        <h2 className="font-bold text-xl mb-2">Session #{session.id}</h2>
                        <div className="grid grid-cols-2 gap-4 justify-center items-center">
                            {SESSION_KEYS.map((key) => (
                                <div key={key}>
                                    <p className="text-sm font-medium">{priettifySessionKey(key)}</p>
                                    <StarRating max={key === "socialSupport" ? 3 : 5} value={session[key]} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {session.stressLevel != null && (
                        <div className="flex justify-center items-center">
                            <span className="text-xl">{STRESS_LEVELS[session.stressLevel]}</span>
                        </div>
                    )}
                </div>
                ))
                )
                : (
                <div className="flex flex-col items-center justify-center">
                    <img
                        className="w-2/5"
                        src="assets/images/sleeping_version.webp"
                        alt="Example Image"
                    />
                    <h1 className="text-3xl">Unfortunately there are no sessions to show</h1>
                </div>
                )
            }
        </div>
    )
}

export default Sessions