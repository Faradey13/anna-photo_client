export interface IUser {
    id: number;
    email: string;
    password: string;
}

export interface InitialState {
    user: IUser;
    password: string;
    email: string;
    isAuth: boolean;
    isLoading: boolean;
}

export interface AuthActions  {
    setAuth: (bool: boolean) => void;
    setUser: (user: IUser) => void;
    setPassword: (password: string) => void,
    setEmail: (password: string) => void,
    setIsLoading: (bool: boolean) => void;
    login: (email: string, password: string) => Promise<undefined | boolean>;
    logout: (token: string) => Promise<void>;
    registration :(email: string, password: string, secretKey:string) => Promise<undefined | boolean>;
}

export interface authData {
    user: IUser;
    token: string;
}