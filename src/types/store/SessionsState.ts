import type { Session } from "../Session";

export interface SessionsState {
    sessions: Session[]
    isLoading: boolean;
    error: string | null;
}