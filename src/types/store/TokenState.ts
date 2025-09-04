export interface TokenState {
    token: string | null
    error: {
        status: string
        message: string
    } | null
    isLoading: boolean
}