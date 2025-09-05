import type { Session } from "../Session";

export interface SessionsState {
    sessions: Session[] | null
    isLoading: boolean;
    error: {
        status: string
        message: string
    } | null
}