import type { User } from "../User";

export interface UserState {
    user: User | null;
    isLoading: boolean;
    error: {
        status: string
        message: string
    } | null
}