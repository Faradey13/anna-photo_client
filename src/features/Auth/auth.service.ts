import {authData} from "./types.ts";

import {jwtDecode} from 'jwt-decode';
import $api from "../../app/config/axios.ts";


export const login = async (email: string, password: string) => {
    try {
        return await $api.post<authData>('/login', {email, password})
    }
    catch (error) {
        console.log(error)
    }

}

export const register = async (email: string, password: string, secretKey: string) => {
    try {
        return await $api.post<authData>('/registration', {email, password, secretKey})
    }
    catch (error) {
        console.log(error)
    }
}

export const checkTokenExpiration = async (token: string) => {
    if (!token) return false;
    try {
        const decodedToken: any =  jwtDecode(token)
        const currentTime = Math.floor(Date.now() / 1000)
        return decodedToken.exp > currentTime
    } catch (e) {
        return false;
    }

}
export async function verifyTokenOnServer() {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
        const response = await $api.post('/verify-token');
        return response.status >= 200 && response.status < 300;
    } catch (error) {
        console.error('Error during token verification:', error);
        return false;
    }
}

export const verifyToken = async (setAuth: (bool: boolean) => void) => {
    const token = localStorage.getItem('token');
    if (token && await checkTokenExpiration(token) && await verifyTokenOnServer()) {
        setAuth(true)
        return
    }
    setAuth(false)
};


