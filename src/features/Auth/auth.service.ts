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

export const isTokenValid = async (token: string) => {
    try {
        const decodedToken: any =  jwtDecode(token)
        const currentTime = Math.floor(Date.now() / 1000)
        return decodedToken.exp > currentTime
    } catch (e) {
        return false;
    }

}
export async function verifyTokenOnServer() {
    try {
        const response = await $api.post('/verify-token');


        if (response.status >= 200 && response.status < 300) {

            return response.data;
        } else {
            throw new Error('Token verification failed');
        }
    } catch (error) {
        console.error('Error during token verification:', error);
        return null;
    }
}


