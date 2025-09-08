export const AUTH_URL = "https://academic-stress-detector-auth-service.onrender.com/auth"
export const LOGIN_URL = `${AUTH_URL}/login`
export const REGISTER_URL = `${AUTH_URL}/register`

export const USER_SERVICE_URL = "https://academic-stress-detector-user-service.onrender.com/api"

export const USERS_URL = `${USER_SERVICE_URL}/users`
export const ME_URL = `${USERS_URL}/me`

export const SESSIONS_URL = `${USER_SERVICE_URL}/sessions`
export const USER_SESSIONS_URL = `${SESSIONS_URL}/user`
export const PREDICT_URL = `${SESSIONS_URL}/predict`