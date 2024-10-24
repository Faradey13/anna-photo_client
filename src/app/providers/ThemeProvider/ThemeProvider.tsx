import {FC, ReactNode, useEffect, useMemo, useState} from "react";
import {LOCAL_STORAGE_THEME_KEY, ThemeContext, Themes} from "./lib/ThemeContext";

export interface ThemeProviderProps {
    children: ReactNode
}

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Themes || Themes.LIGHT


const ThemeProvider:FC<ThemeProviderProps> = ({children}) => {

    useEffect(() => {
        document.body.className =  defaultTheme
    },[])
    const [theme, setTheme] = useState<Themes>(defaultTheme)

    const defaultProps = useMemo(() => ({
        theme,
        setTheme
    }),[theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;