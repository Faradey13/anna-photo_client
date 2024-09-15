import {Portal} from "../Portal/portal.tsx";
import React, {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import cls from './modal.module.scss'
import {gsap} from "gsap";
import {useSwipeable} from "react-swipeable";


interface ModalProps {
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    isLazy?: boolean;
    onLeftClick?: () => void;
    onRightClick?: () => void;
    id?: string;
    touchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
    touchMove?: (e: React.TouchEvent<HTMLDivElement>) => void;
    touchEnd?: (e: React.TouchEvent<HTMLDivElement>) => void;
    IsMobileMenu?: boolean;

}


const Modal = (props: ModalProps) => {
    const {
        isOpen,
        children,
        isLazy,
        onClose,
        onRightClick,
        onLeftClick,
        touchEnd,
        touchMove,
        touchStart,
        IsMobileMenu,

    } = props


    const ANIMATION_DELAY = 300;
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>()
    const [isMobileMenu, setIsMobileMenu] = useState(false);
    const modalRef = useRef(null);

    const slideInFromRight = (element: HTMLElement | null) => {

        gsap.fromTo(element,
            {x: '100%'},
            {x: '0%', duration: 1.3, ease: 'power3.inOut', onComplete:() =>{
                console.log('111')
        }}
        );
    };


    const slideOutToRight = (element: HTMLElement | null) => {

        if (element)
            gsap.to(element,
                {
                    x: 200, duration: 0.3, ease: 'power3.inOut'
                }
            );
    };

    useEffect(() => {
        if (isMobileMenu && isOpen && modalRef.current) {
            slideInFromRight(modalRef.current);
        }
    }, [isOpen]);


    const closeHandler = useCallback(() => {
        if (onClose) {
            console.log('closeHandler');
            if (modalRef.current) {
                slideOutToRight(modalRef.current);
                console.log('1')
            }
            console.log('2')
            setIsClosing(true);
            console.log(modalRef.current);


            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onContentClick = (event: React.MouseEvent) => {
        event.stopPropagation();


    }


    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeHandler()
        }
    }, [closeHandler])

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);


        } else {
            setIsMounted(false);

        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }
        return () => {
            window.removeEventListener('keydown', onKeyDown)
            clearTimeout(timerRef.current)
        }
    }, [isOpen, onKeyDown]);

    useEffect(() => {
        if (IsMobileMenu) {
            setIsMobileMenu(true)
        }
    }, [IsMobileMenu]);


    const modalClasses = classNames({

        [cls.Modal]: !isMobileMenu,
        [cls.opened]: isMounted,
        [cls.close]: isClosing,
        [cls.ModalMobMenu]: isMobileMenu
    })

    const overlayClasses = classNames({
        [cls.overlay]: !isMobileMenu,
        [cls.mobileMenuOverlay]: isMobileMenu,
    })

    const contentClasses = classNames({
        [cls.content]: !isMobileMenu,
        [cls.mobileMenuContent]: isMobileMenu,

    })

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (onRightClick) onRightClick();
        },
        onSwipedRight: () => {
            if (IsMobileMenu && onClose) {
                onClose();
            } else if (onLeftClick) {
                onLeftClick();
            }
        },
        onSwipedUp: () => {
            if (!IsMobileMenu && onClose) {
                onClose();
            }
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
    });


    if (isLazy && !isMounted)
        return null


    if (onRightClick && onLeftClick)
        return (
            <Portal>
                <div  ref={modalRef} className={modalClasses}>
                    <div {...handlers}
                        onClick={onClose}
                        className={overlayClasses}>

                        <div className={cls.arrowLeft}
                             onClick={(e) => {
                                 e.stopPropagation();
                                 onLeftClick();
                             }}

                        >
                            &lt;
                        </div>
                        <div className={cls.arrowRight} onClick={(e) => {
                            e.stopPropagation()
                            onRightClick()
                        }}>
                            &gt;
                        </div>
                        <div
                            className={contentClasses}
                            onClick={onContentClick}
                            onTouchStart={touchStart}
                            onTouchMove={touchMove}
                            onTouchEnd={touchEnd}

                        >
                            {children}
                        </div>
                    </div>

                </div>
            </Portal>
        )
    return (
        <Portal>
            <div  onClick={isMobileMenu ? onClose : undefined} className={modalClasses}>
                <div {...handlers}
                    className={overlayClasses}
                    onClick={isMobileMenu ? onContentClick : onClose}

                >
                    <div className={contentClasses} onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>

            </div>
        </Portal>
    );
};

export default Modal;