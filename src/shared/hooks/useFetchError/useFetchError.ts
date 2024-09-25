import { useState } from 'react';
import {AxiosResponse} from "axios";
type ErrorFetchHook<T> = {
    error: string | null;
    executeWithError: (fn: () => Promise<AxiosResponse<T>>) => Promise<T | void>;
};

const useFetchError = <T = any>(): ErrorFetchHook<T> => {
    const [error, setError] = useState(null);

    const executeWithError = async (fn: () => Promise<AxiosResponse<T>>): Promise<T | void> => {
        try {
            const result = await fn();
            return result.data;
        } catch (err: any) {
            const message = err.response
                ? `Error: ${err.response.status} ${err.response.statusText}`
                : err.message || 'An error occurred';
            setError(message);
            console.error("Error caught in hook: ", err);
            throw err;
        }
    };

    return { error, executeWithError };
};

export default useFetchError;