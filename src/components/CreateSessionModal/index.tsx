import { SESSION_KEYS } from "../../const/session"
import type { Session } from "../../types/Session"
import { priettifySessionKey } from "../../utils/text"
import StarRating from "../StarRating"

interface CreateSessionModalProps {
    newSessionData: Partial<Session>
    setActiveCreateNewModal: (state: boolean) => void
    handleStarChange: (key: keyof Session, value: number) => void
    createNewSession: () => Promise<void>
}

const CreateSessionModal = (props : CreateSessionModalProps) =>{
    const { handleStarChange, setActiveCreateNewModal, createNewSession, newSessionData } = props

    return (
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
                            setActiveCreateNewModal(false)
                            createNewSession()
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateSessionModal