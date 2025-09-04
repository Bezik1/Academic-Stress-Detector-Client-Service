import type { Session } from "../Session";

export interface SessionsState {
    sessions: Session[]
    isLoading: boolean;
    error: {
        status: string
        message: string
    } | null
}