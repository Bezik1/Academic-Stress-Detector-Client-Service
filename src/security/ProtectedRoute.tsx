import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../state/store'

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = useSelector((state: RootState) => state.token.token)

    if (!token) {
        return <Navigate to="/error" replace />
    }
    return <>{children}</>
}

export default ProtectedRoute