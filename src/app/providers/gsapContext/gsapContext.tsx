import { createContext, ReactNode, useState } from 'react';

interface SmootherContextType {
    smootherReady: boolean;
    smoother: any;
    toggleSmootherReady: (value: boolean, newSmoother?: ScrollSmoother | null) => void; // Функция для изменения состояния
}


const SmootherContext = createContext<SmootherContextType>({
    smootherReady: false,
    smoother: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggleSmootherReady: () => {},
});


interface SmootherProviderProps {
    children: ReactNode;
}


export const SmootherProvider = ({ children }: SmootherProviderProps) => {
    const [smootherReady, setSmootherReady] = useState(false);
    const [smoother, setSmoother] = useState<any>(null);

    const toggleSmootherReady = (value: boolean, newSmoother: ScrollSmoother | null = null) => {
        setSmootherReady(value);
        if (newSmoother) {
            setSmoother(newSmoother);
        }
    };

    return (
        <SmootherContext.Provider
            value={{
                smootherReady,
                smoother,
                toggleSmootherReady,
            }}
        >
            {children}
        </SmootherContext.Provider>
    );
};

export default SmootherContext;