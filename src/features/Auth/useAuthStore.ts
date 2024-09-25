import {create} from "zustand";
import {AuthActions, InitialState, IUser} from "./types.ts";
import {combine} from "zustand/middleware";
import {login, register} from "./auth.service.ts";


export const useAuthStore = create<InitialState & AuthActions>(
    combine<InitialState, AuthActions>({
        user: {} as IUser,
        isAuth: false,
        isLoading: false,
        password: '',
        email: '',

    },
        (set) => ({
            setAuth: (bool: boolean) => set({isAuth: bool}),
            setUser: (user: IUser) => set({user}),
            setIsLoading: (bool: boolean) => set({isLoading: bool}),
            setPassword: (password: string) => set({password}),
            setEmail: (email: string) => set({email}),

            registration: async (email: string, password: string, secretKey: string) => {
                try {
                    set({ isLoading: true });
                    const response = await register(email, password, secretKey);

                    if(response) {
                        const token = response.data.token;
                        set({ isAuth: true});
                        localStorage.setItem('token', token);
                        window.location.reload()
                    }
                } catch (error) {
                    console.log(error);
                    return false;
                } finally {
                    set({ isLoading: false });

                }
            },

            login: async (email: string, password: string) => {
                try {
                    set({ isLoading: true });
                    const response = await login(email, password);

                    if (response) {
                        const token = response.data.token;
                        set({ isAuth: true });
                        localStorage.setItem('token', token);
                        return true;
                    }
                } catch (error) {
                    console.log(error);
                    return false;
                } finally {
                    set({ isLoading: false });
                }
            },
            logout: async () => {
                try {
                    set({user: {} as IUser})
                    set({isAuth: false});
                    localStorage.removeItem('token')
                }
                catch (error) {
                    console.log(error)
                }
            }
        })
    )
)