export interface LoginResponsePayload {
    authToken: String,
    expiredAt: Date,
    refreshToken: String,
    username: String
}