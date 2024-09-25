import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap-trial/ScrollSmoother";
import {gsap} from "gsap";
import './styles/App.scss'
import {useLocation, useNavigate} from "react-router-dom";
import {Suspense, useCallback, useEffect, useRef, useState} from "react";
import {useAuthStore} from "../features/Auth/useAuthStore.ts";
import {verifyToken} from "../features/Auth/auth.service.ts";
import i18n from "../shared/lib/i18n/i18n.ts";
import Navbar from "../widjets/Navbar/Navbar.tsx";
import AppRoutes from "./providers/routes/AppRoutes.tsx";
import Footer from "../widjets/Footer/Footer.tsx";
import ButtonUp from "../shared/ui/ButtonUp/ButtonUp.tsx";


function App() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const navigate = useNavigate();
    const location = useLocation();
    const smootherRef = useRef<ScrollSmoother | null>(null)
    const {setAuth} = useAuthStore(state => state)
    const [isTop, setIsTop] = useState<boolean>()


    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.altKey && event.key === 'a') {
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
    },[setAuth])

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

    useEffect(() => {

        const timeline = gsap.timeline();
        timeline.fromTo('.page_wrapper', {opacity: 0}, {opacity: 1, duration: 1});
    }, [location]);


    useEffect(() => {
        gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
        const disabledRoutes = ['/contact', '/about', '/service'];

        if (disabledRoutes.includes(location.pathname)) {
            if (smootherRef.current) {
                smootherRef.current.kill();
                smootherRef.current = null;
            }
            return;
        }

        if (smootherRef.current || isMobile) {
            return;
        }

        smootherRef.current = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.5,
            effects: true,
        });

        document.body.style.overflow = 'auto';
        document.body.style.position = 'relative';

        return () => {
            if (smootherRef.current) {
                smootherRef.current.kill();
                smootherRef.current = null;
            }
        };
    }, [location.pathname]);


    useEffect(() => {
        const trigger = ScrollTrigger.create({
            trigger: document.documentElement,
            start: "top top",
            onEnter: () => {
                console.log(`is top  ${isTop}`);
                setIsTop(true);
            },
            onLeaveBack: () => {
                setIsTop(false);
            },
        });

        return () => {
            trigger.kill();
        };
    }, [location]);

    return (
        <Suspense fallback={''}>
            <div id={'smooth-wrapper'}>
                <Navbar/>
                <div id={'smooth-wrapper'}>
                    <div className={'appContent'} id={'smooth-content'}>
                        <AppRoutes/>
                        <Footer/>
                    </div>
                </div>
                {isTop && <ButtonUp/>}
            </div>

        </Suspense>

    )
}

export default App
