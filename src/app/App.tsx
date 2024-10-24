import ScrollTrigger from "gsap/ScrollTrigger";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ScrollSmoother from "../shared/lib/smoothScroll/ScrollSmoother.js";
import {gsap} from "gsap";
import './styles/App.scss'
import {useLocation, useNavigate} from "react-router-dom";
import {Suspense, useCallback, useContext, useEffect} from "react";
import {useAuthStore} from "../features/Auth/useAuthStore.ts";
import {verifyToken} from "../features/Auth/auth.service.ts";
import i18n from "../shared/lib/i18n/i18n.ts";
import Navbar from "../widjets/Navbar/Navbar.tsx";
import AppRoutes from "./providers/routes/AppRoutes.tsx";
import Footer from "../widjets/Footer/Footer.tsx";
import Loader from "../shared/ui/Loader/Loader.tsx";
import SmootherContext from "./providers/gsapContext/gsapContext.tsx";
import {useIsomorphicLayoutEffect} from "../shared/helpers/isomorphicEffect.ts";
import LayoutWrapper from "../widjets/LayoutWrapper/LayoutWrapper.tsx";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const {setAuth} = useAuthStore(state => state)
    const {smootherReady} = useContext(SmootherContext);
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.altKey && event.key === 'a'|| event.metaKey && event.altKey && event.key === 'a') {
            navigate('/alohomora');
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [navigate]);

    const checkToken = useCallback(async () => {
        await verifyToken(setAuth);
    }, [setAuth])

    useEffect(() => {
        checkToken()
        window.addEventListener('pageshow', checkToken);

        return () => {
            window.removeEventListener('pageshow', checkToken);
        };
    }, []);


    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, []);

    useIsomorphicLayoutEffect(() => {
        if (!smootherReady) return;
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline();
            timeline.fromTo('.page_wrapper', {opacity: 0}, {opacity: 1, duration: 1});

        });
        return () => ctx.revert();
    }, [location]);


    return (
        <Suspense fallback={<Loader/>}>
            <div>
                <Navbar/>
                <LayoutWrapper>
                    <div className={'page_wrapper'}>
                        <div className={'appContent'}>
                            <AppRoutes/>
                            <Footer/>
                        </div>
                    </div>
                </LayoutWrapper>
            </div>

        </Suspense>

    )
}

export default App
