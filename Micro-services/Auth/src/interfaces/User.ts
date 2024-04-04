export interface User {
    userId: number;
    username: string;
    password: string;
    registrationDate: Date;
    updatedAt: Date;
    token: string;
    tokenExpiration: Date;
    refreshToken: string;
    refreshTokenExpiration: Date;
}