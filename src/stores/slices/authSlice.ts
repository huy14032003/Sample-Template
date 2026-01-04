import { CookieExpiry, CookieKey } from '@/constants/fetchBaseCustom.constant'
import { AuthState } from '@/features/auth'
import { decodeToken } from '@/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'




const storedToken = Cookies.get(CookieKey.ACCESS_TOKEN)
const initialTokenInfo = storedToken ? decodeToken(storedToken) : { permissions: [], roles: [], email: '', name: '' }

const initialState: AuthState = {
    accessToken: storedToken ?? null,
    refreshToken: '',
    profile: {
        id: 0,
        email: initialTokenInfo.email,
        fullName: initialTokenInfo.name,
        status: true,
        jwtId: '',
        securityMethod: '',
        accountStatus: '',
        type: '',
        phoneNumber: '',
        avatar: '',
        permissions: initialTokenInfo.permissions,
        roles: initialTokenInfo.roles
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            Cookies.set(CookieKey.ACCESS_TOKEN, action.payload, { expires: CookieExpiry.ACCESS_TOKEN_MINUTES / 1440 })
            state.accessToken = action.payload
            // Decode và lấy permissions, roles từ token
            const tokenInfo = decodeToken(action.payload)
            state.profile.permissions = tokenInfo.permissions
            state.profile.roles = tokenInfo.roles
            state.profile.email = tokenInfo.email
            state.profile.fullName = tokenInfo.name
        },
        savePermissions: (state, action: PayloadAction<string[]>) => {
            state.profile.permissions = action.payload
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            Cookies.set(CookieKey.REFRESH_TOKEN, action.payload, { expires: CookieExpiry.REFRESH_TOKEN_MINUTES / 1440 })
            state.refreshToken = action.payload
        },
        logout() {
            Cookies.remove(CookieKey.ACCESS_TOKEN)
            Cookies.remove(CookieKey.REFRESH_TOKEN)
            Cookies.remove('sidebar_state')
            return {
                ...initialState,
                accessToken: null
            }
        },

    },
})

export const { setAccessToken, setRefreshToken, logout } = authSlice.actions
export default authSlice.reducer
