export interface Profile {
    id: number;
    email: string;
    fullName: string;
    status: boolean;
    jwtId: string;
    securityMethod: string;
    accountStatus: string;
    type: string;
    phoneNumber: string;
    avatar: string;
    permissions: string[];
    roles: string[];
}

export interface JwtPayload {
    exp: number
    iat: number
    jti: string
    iss: string
    typ: string
    azp: string
    sid: string
    scope: string
    permissions: string[]
    roles: string[]
    sub?: string
    email?: string
    name?: string
    preferred_username?: string
}

export interface AuthState {
    accessToken: string | null
    refreshToken: string | null
    profile: Profile
}
