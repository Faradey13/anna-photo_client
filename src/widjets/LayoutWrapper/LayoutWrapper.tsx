import {FC, useContext} from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ScrollSmoother } from '../../shared/lib/smoothScroll/ScrollSmoother.js';
import {gsap} from "gsap";
import SmootherContext from "../../app/providers/gsapContext/gsapContext.tsx";
import {useIsomorphicLayoutEffect} from "../../shared/helpers/isomorphicEffect.ts";
import {useLocation} from "react-router-dom";
interface LayoutWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const LayoutWrapper: FC<LayoutWrapperProps> = ({ children, ...props }) => {
    const { toggleSmootherReady } = useContext(SmootherContext);
    const location = useLocation()
    useIsomorphicLayoutEffect(() => {

        const ctx = gsap.context(() => {
            const smootherInstance = ScrollSmoother.create({
                wrapper: '#smooth-wrapper',
                content: '#smooth-content',
                smooth: 1.5,
                effects: true,
                smoothTouch: 0,
            });
            toggleSmootherReady(true, smootherInstance);
            return smootherInstance;

        });


        return () => {
            toggleSmootherReady ( false );
            ctx.revert (); } }, [location.pathname]);

    return (
        <div id="smooth-wrapper" {...props}>
            <div id="smooth-content">{children}</div>
        </div>
    );
};

export default LayoutWrapper;
