/** Тип токена. */
export interface TokenType {
    access_token: string
}

/** Тип объекта передачи данных для входа. */
export interface LoginDto {
    login: string
    password: string
}

/** Тип токена. */
export interface AuthStateType {
    hasToken: boolean
    isLogged: boolean
    isAuthChecked: boolean
}
