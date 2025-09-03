import "./index.css"
import { testSessions } from "../../const/test/sessions"
import { testUser } from "../../const/test/user"
import type { Session } from "../../types/store/Session"
import { useState } from "react"
import { SESSION_KEYS, STRESS_LEVELS } from "../../const/session"
import { priettifySessionKey } from "../../utils/text"
import StarRating from "../../components/StarRating"

const HomePage = () => {
    const [activeSession, setActiveSession] = useState<Session>()
    const [activeCreateNewModal, setActiveCreateNewModal] = useState(false)
    const [newSessionData, setNewSessionData] = useState<Partial<Session>>({})

    const handleStarChange = (key: keyof Session, value: number) => {
        setNewSessionData((prev) => ({ ...prev, [key]: value }))
    }

    return (
        <div className="flex flex-col justify-center items-center gap-6 p-4">
            <nav className="special-card fixed top-0 left-0 m-10 flex items-center justify-start gap-2 bg-white p-3 w-1/9 rounded-full shadow-md">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 text-lg font-bold border-2 border-yellow-700">
                    U
                </div>
                <span className="text-xl text-yellow-700 ml-5">{testUser.username}</span>
            </nav>

            <div className="flex flex-col items-center justify-center">
                <h1 className="text-7xl m-8">Sessions</h1>

                <div className="flex gap-10 overflow-x-auto w-[60vw] h-[65vh] scrollbar-hide">
                    {testSessions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center">
                            <img
                                className="w-2/5"
                                src="assets/images/sleeping_version.webp"
                                alt="Example Image"
                            />
                            <h1 className="text-3xl">Unfortunately there are no sessions to show</h1>
                        </div>
                    ) : (
                        testSessions.map((session) => (
                            <div className="mb-20" key={session.id} onClick={() =>setActiveSession(session)}>
                                <div className="special-card rounded-xl p-4 shadow-2xl flex-shrink-0 w-80 mb-10">
                                    <h2 className="font-bold text-xl mb-2">Session #{session.id}</h2>
                                    <div className="grid grid-cols-2 gap-4 justify-center items-center">
                                        {SESSION_KEYS.map((key) => (
                                            <div key={key}>
                                                <p className="text-sm font-medium">{priettifySessionKey(key)}</p>
                                                <StarRating value={session[key]} />
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
                    )}
                </div>

                <button
                    className="send-btn w-1/4 h-20 transform transition-transform duration-200 hover:-translate-y-1"
                    onClick={() => setActiveCreateNewModal(true)}
                >
                    Create New Session
                </button>
            </div>

            {activeSession && (
                <div className="gap-10 flex-col fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="special-card rounded-2xl p-8 w-1/3 max-h-[80vh] overflow-y-auto shadow-xl">
                        <h2 className="text-3xl font-bold mb-6">New Session</h2>

                        <div className="grid grid-cols-2 gap-6">
                            {SESSION_KEYS.map((key) => (
                                <div key={key}>
                                    <p className="text-sm font-medium mb-1">{priettifySessionKey(key)}</p>
                                    <StarRating
                                        value={activeSession[key] ?? null}
                                        onChange={(val) => handleStarChange(key, val)}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between gap-4 mt-6">
                            <button
                                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                onClick={() => setActiveSession(undefined)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800"
                                onClick={() => {
                                    console.log("Saving session", newSessionData)
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
                        <button className="flex justify-center items-center w-1/5 h-20 m-10 accent-card p-5 rounded-2xl transform transition-transform duration-200 hover:-translate-y-1">
                            <h1 className="text-3xl text-orange-200">Get Stress Prediction</h1>
                        </button>
                        )
                    }
                </div>
            )}

            {activeCreateNewModal && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="special-card rounded-2xl p-8 w-1/3 max-h-[80vh] overflow-y-auto shadow-xl">
                        <h2 className="text-3xl font-bold mb-6">New Session</h2>

                        <div className="grid grid-cols-2 gap-6">
                            {SESSION_KEYS.map((key) => (
                                <div key={key}>
                                    <p className="text-sm font-medium mb-1">{priettifySessionKey(key)}</p>
                                    <StarRating
                                        value={newSessionData[key] ?? null}
                                        onChange={(val) => handleStarChange(key, val)}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between gap-4 mt-6">
                            <button
                                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                onClick={() => setActiveCreateNewModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800"
                                onClick={() => {
                                    console.log("Saving session", newSessionData)
                                    setActiveCreateNewModal(false)
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomePage
