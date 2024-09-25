import cls from './Navbar.module.scss'
import {gsap} from "gsap";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import {useEffect, useRef, useState} from "react";
import Modal from "../Modal/modal.tsx";
import {useTranslation} from "react-i18next";
import {useModal} from "../../shared/hooks/useModal/useModal.ts";
import LanguageToggle from "../../shared/ui/LanguageToggle/LanguageToggle.tsx";
import ThemeToggle from "../../shared/ui/ToggleTheme/ToggleTheme.tsx";
import Tooltip from "../Tooltip/Tooltip.tsx";

const Navbar = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const navigate = useNavigate();
    const [isActiveMenu, setIsActiveMenu] = useState(false)
    const {openModal, isModalOpen, closeModal} = useModal();
    const[isExamples, setIsExamples] = useState(false)
    const examplesRef = useRef<HTMLDivElement>(null)
    const navbarRef = useRef<HTMLDivElement>(null)
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const {t} = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY || document.documentElement.scrollTop;
            if (currentScroll > lastScrollTop && currentScroll > 300) {
                if (!gsap.isTweening(navbarRef.current)) {
                    setIsExamples(false);
                    gsap.to(navbarRef.current, {
                        top: -80,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'linear'
                    });
                }
            } else if (currentScroll < lastScrollTop ) {
                if (!gsap.isTweening(navbarRef.current)) {
                    setIsExamples(false);
                    gsap.to(navbarRef.current, {
                        top: 0,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'linear'
                    });
                }
            }

            setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
        };

        const handleClick = (event: MouseEvent) => {
            if (event.clientY < 50) {
                gsap.to(navbarRef.current,
                    { top: 0, opacity: 1, duration: 0.3, ease: 'power3.in'})
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClick);


        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClick);
        };
    }, [lastScrollTop]);

    useEffect(() => {
        if (examplesRef.current) {
            if (isExamples) {
                gsap.fromTo(examplesRef.current,
                    { height: 0, opacity: 0, display: 'block' },
                    { height: 'auto', opacity: 1, duration: 0.3, ease: 'linear' }
                );
            } else {
                gsap.to(examplesRef.current,
                    { height: 0, opacity: 0, duration: 0.3, ease: 'linear', onComplete: () => {

                            if (examplesRef.current) examplesRef.current.style.display = 'none';
                        }}
                );
            }
        }
    }, [isExamples]);


    const openMobileMenu = () => {
        openModal('')
        setIsActiveMenu(!isActiveMenu)
    }

    const closeMobileMenu = () => {
        setIsActiveMenu(!isActiveMenu)
        closeModal()
    }

    const handleMobileLink = (link:string) => {
        if (isExamples) {
            navigate(link)
            setIsExamples(false);
        }
        else {
        navigate(link)
        closeMobileMenu()
        }
    }

    const hamClasses = classNames({
        [cls.ham3]: true,
        [cls.active]: isActiveMenu,
    })



    if (isMobile)
        return (
            <div  ref={navbarRef} className={cls.navbarMenu}>
                <div
                    className={cls.logo}
                    onClick={() => navigate('/')}
                >
                    <svg className={cls.svg}  width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={cls.svg} fillRule="evenodd" clipRule="evenodd"
                              d="M7.59843 4.48666C7.86525 3.17678 9.03088 2.25 10.3663 2.25H13.6337C14.9691 2.25 16.1347 3.17678 16.4016 4.48666C16.4632 4.78904 16.7371 5.01086 17.022 5.01086H17.0384L17.0548 5.01157C18.4582 5.07294 19.5362 5.24517 20.4362 5.83558C21.0032 6.20757 21.4909 6.68617 21.871 7.24464C22.3439 7.93947 22.5524 8.73694 22.6524 9.70145C22.75 10.6438 22.75 11.825 22.75 13.3211V13.4062C22.75 14.9023 22.75 16.0835 22.6524 17.0258C22.5524 17.9903 22.3439 18.7878 21.871 19.4826C21.4909 20.0411 21.0032 20.5197 20.4362 20.8917C19.7327 21.3532 18.9262 21.5567 17.948 21.6544C16.9903 21.75 15.789 21.75 14.2634 21.75H9.73657C8.21098 21.75 7.00967 21.75 6.05196 21.6544C5.07379 21.5567 4.26731 21.3532 3.56385 20.8917C2.99682 20.5197 2.50905 20.0411 2.12899 19.4826C1.65612 18.7878 1.44756 17.9903 1.34762 17.0258C1.24998 16.0835 1.24999 14.9023 1.25 13.4062V13.3211C1.24999 11.825 1.24998 10.6438 1.34762 9.70145C1.44756 8.73694 1.65612 7.93947 2.12899 7.24464C2.50905 6.68617 2.99682 6.20757 3.56385 5.83558C4.46383 5.24517 5.5418 5.07294 6.94523 5.01157L6.96161 5.01086H6.978C7.26288 5.01086 7.53683 4.78905 7.59843 4.48666ZM10.3663 3.75C9.72522 3.75 9.18905 4.19299 9.06824 4.78607C8.87258 5.74659 8.021 6.50186 6.99633 6.51078C5.64772 6.57069 4.92536 6.73636 4.38664 7.08978C3.98309 7.35452 3.63752 7.6941 3.36906 8.08857C3.09291 8.49435 2.92696 9.01325 2.83963 9.85604C2.75094 10.7121 2.75 11.8156 2.75 13.3636C2.75 14.9117 2.75094 16.0152 2.83963 16.8712C2.92696 17.714 3.09291 18.2329 3.36906 18.6387C3.63752 19.0332 3.98309 19.3728 4.38664 19.6375C4.80417 19.9114 5.33844 20.0756 6.20104 20.1618C7.07549 20.2491 8.20193 20.25 9.77778 20.25H14.2222C15.7981 20.25 16.9245 20.2491 17.799 20.1618C18.6616 20.0756 19.1958 19.9114 19.6134 19.6375C20.0169 19.3728 20.3625 19.0332 20.6309 18.6387C20.9071 18.2329 21.073 17.714 21.1604 16.8712C21.2491 16.0152 21.25 14.9117 21.25 13.3636C21.25 11.8156 21.2491 10.7121 21.1604 9.85604C21.073 9.01325 20.9071 8.49435 20.6309 8.08857C20.3625 7.6941 20.0169 7.35452 19.6134 7.08978C19.0746 6.73636 18.3523 6.57069 17.0037 6.51078C15.979 6.50186 15.1274 5.74659 14.9318 4.78607C14.8109 4.19299 14.2748 3.75 13.6337 3.75H10.3663ZM12 10.75C10.7574 10.75 9.75 11.7574 9.75 13C9.75 14.2426 10.7574 15.25 12 15.25C13.2426 15.25 14.25 14.2426 14.25 13C14.25 11.7574 13.2426 10.75 12 10.75ZM8.25 13C8.25 10.9289 9.92893 9.25 12 9.25C14.0711 9.25 15.75 10.9289 15.75 13C15.75 15.0711 14.0711 16.75 12 16.75C9.92893 16.75 8.25 15.0711 8.25 13ZM17.25 10C17.25 9.58579 17.5858 9.25 18 9.25H19C19.4142 9.25 19.75 9.58579 19.75 10C19.75 10.4142 19.4142 10.75 19 10.75H18C17.5858 10.75 17.25 10.4142 17.25 10Z"
                              fill="none"/>
                    </svg>
                </div>
                <svg className={hamClasses} viewBox="0 0 100 100" width="80" onClick={openMobileMenu}>
                    <path className={cls.top}
                          d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"/>
                    <path className={cls.middle} d="m 30,50 h 40"/>
                    <path className={cls.bottom}
                          d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"/>
                </svg>
                {isActiveMenu && (
                    <Modal
                        isOpen={isModalOpen}
                        onClose={closeMobileMenu}
                        IsMobileMenu={true}
                    >
                        <div className={cls.mobileMenu}>
                            <div className={cls.toggles}>
                                <LanguageToggle/>
                                <ThemeToggle/>
                            </div>
                            <div>
                                <p
                                    className={cls.navbarLink}
                                    onClick={() => handleMobileLink('/about')}
                                >{t('Обо мне')}</p>
                                <p
                                    className={cls.navbarLink}
                                    onClick={() => setIsExamples(!isExamples)}
                                >{t('Примеры работ')}</p>
                                <div ref={examplesRef} className={cls.examples}
                                     style={{overflow: 'hidden', height: 0, display: 'none'}}>
                                    <p onClick={() => handleMobileLink('/individual')}
                                       className={cls.examplesLink}>{t('Индивидуальная')}</p>
                                    <p onClick={() => handleMobileLink('/family')}
                                       className={cls.examplesLink}>{t('Семейная')}</p>
                                    <p onClick={() => handleMobileLink('/thematic')}
                                       className={cls.examplesLink}>{t('Тематическая')}</p>
                                    <p onClick={() => handleMobileLink('/love')}
                                       className={cls.examplesLink}>{t('Романтическая')}</p>
                                    <p onClick={() => handleMobileLink('/thing')}
                                       className={cls.examplesLink}>{t('Предметная')}</p>
                                </div>

                                <p
                                    className={cls.navbarLink}
                                    onClick={() => handleMobileLink('/service')}
                                >{t('Услуги')}</p>
                                <p
                                    className={cls.navbarLink}
                                    onClick={() => handleMobileLink('/contact')}
                                >{t('Контакты')}</p>
                            </div>

                        </div>

                    </Modal>

                )
                }
            </div>
        )

    return (
        <div  ref={navbarRef} className={cls.navbar}>
            <Tooltip text={t('На главную страницу')}>
                <div
                    className={cls.logo}
                    onClick={() => navigate('/')}
                >
                    <svg className={cls.svg} width="50px" height="50px" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path className={cls.svgPath} fillRule="evenodd" clipRule="evenodd"
                              d="M7.59843 4.48666C7.86525 3.17678 9.03088 2.25 10.3663 2.25H13.6337C14.9691 2.25 16.1347 3.17678 16.4016 4.48666C16.4632 4.78904 16.7371 5.01086 17.022 5.01086H17.0384L17.0548 5.01157C18.4582 5.07294 19.5362 5.24517 20.4362 5.83558C21.0032 6.20757 21.4909 6.68617 21.871 7.24464C22.3439 7.93947 22.5524 8.73694 22.6524 9.70145C22.75 10.6438 22.75 11.825 22.75 13.3211V13.4062C22.75 14.9023 22.75 16.0835 22.6524 17.0258C22.5524 17.9903 22.3439 18.7878 21.871 19.4826C21.4909 20.0411 21.0032 20.5197 20.4362 20.8917C19.7327 21.3532 18.9262 21.5567 17.948 21.6544C16.9903 21.75 15.789 21.75 14.2634 21.75H9.73657C8.21098 21.75 7.00967 21.75 6.05196 21.6544C5.07379 21.5567 4.26731 21.3532 3.56385 20.8917C2.99682 20.5197 2.50905 20.0411 2.12899 19.4826C1.65612 18.7878 1.44756 17.9903 1.34762 17.0258C1.24998 16.0835 1.24999 14.9023 1.25 13.4062V13.3211C1.24999 11.825 1.24998 10.6438 1.34762 9.70145C1.44756 8.73694 1.65612 7.93947 2.12899 7.24464C2.50905 6.68617 2.99682 6.20757 3.56385 5.83558C4.46383 5.24517 5.5418 5.07294 6.94523 5.01157L6.96161 5.01086H6.978C7.26288 5.01086 7.53683 4.78905 7.59843 4.48666ZM10.3663 3.75C9.72522 3.75 9.18905 4.19299 9.06824 4.78607C8.87258 5.74659 8.021 6.50186 6.99633 6.51078C5.64772 6.57069 4.92536 6.73636 4.38664 7.08978C3.98309 7.35452 3.63752 7.6941 3.36906 8.08857C3.09291 8.49435 2.92696 9.01325 2.83963 9.85604C2.75094 10.7121 2.75 11.8156 2.75 13.3636C2.75 14.9117 2.75094 16.0152 2.83963 16.8712C2.92696 17.714 3.09291 18.2329 3.36906 18.6387C3.63752 19.0332 3.98309 19.3728 4.38664 19.6375C4.80417 19.9114 5.33844 20.0756 6.20104 20.1618C7.07549 20.2491 8.20193 20.25 9.77778 20.25H14.2222C15.7981 20.25 16.9245 20.2491 17.799 20.1618C18.6616 20.0756 19.1958 19.9114 19.6134 19.6375C20.0169 19.3728 20.3625 19.0332 20.6309 18.6387C20.9071 18.2329 21.073 17.714 21.1604 16.8712C21.2491 16.0152 21.25 14.9117 21.25 13.3636C21.25 11.8156 21.2491 10.7121 21.1604 9.85604C21.073 9.01325 20.9071 8.49435 20.6309 8.08857C20.3625 7.6941 20.0169 7.35452 19.6134 7.08978C19.0746 6.73636 18.3523 6.57069 17.0037 6.51078C15.979 6.50186 15.1274 5.74659 14.9318 4.78607C14.8109 4.19299 14.2748 3.75 13.6337 3.75H10.3663ZM12 10.75C10.7574 10.75 9.75 11.7574 9.75 13C9.75 14.2426 10.7574 15.25 12 15.25C13.2426 15.25 14.25 14.2426 14.25 13C14.25 11.7574 13.2426 10.75 12 10.75ZM8.25 13C8.25 10.9289 9.92893 9.25 12 9.25C14.0711 9.25 15.75 10.9289 15.75 13C15.75 15.0711 14.0711 16.75 12 16.75C9.92893 16.75 8.25 15.0711 8.25 13ZM17.25 10C17.25 9.58579 17.5858 9.25 18 9.25H19C19.4142 9.25 19.75 9.58579 19.75 10C19.75 10.4142 19.4142 10.75 19 10.75H18C17.5858 10.75 17.25 10.4142 17.25 10Z"
                              fill="#fafafa"/>
                    </svg>
                </div>
            </Tooltip>

            <div className={cls.info}
            >
                    <p
                        className={cls.navbarLink}
                        onClick={() => {
                            navigate('/about')
                        }}
                    >{t('Обо мне')}</p>

                <div className={cls.portfolio}>
                    <p
                        className={cls.navbarLink}
                        onClick={() => setIsExamples(!isExamples)}
                    >{t('Примеры работ')}</p>
                    <div ref={examplesRef} className={cls.examplesMain}
                         style={{overflow: 'hidden', height: 0, display: 'none'}}>
                        <p onClick={() => handleMobileLink('/individual')}
                           className={cls.examplesLink}>{t('Индивидуальная')}</p>
                        <p onClick={() => handleMobileLink('/family')}
                           className={cls.examplesLink}>{t('Семейная')}</p>
                        <p onClick={() => handleMobileLink('/thematic')}
                           className={cls.examplesLink}>{t('Тематическая')}</p>
                        <p onClick={() => handleMobileLink('/love')}
                           className={cls.examplesLink}>{t('Романтическая')}</p>
                        <p onClick={() => handleMobileLink('/thing')}
                           className={cls.examplesLink}>{t('Предметная')}</p>
                    </div>
                </div>

                <p
                    className={cls.navbarLink}
                    onClick={() => {
                        navigate('/service')
                    }}
                >{t('Услуги')}</p>
                <p
                    className={cls.navbarLink}
                    onClick={() => {
                        navigate('/contact')
                    }}
                >{t('Контакты')}</p>
                    <div className={cls.toggles}>
                        <Tooltip text={t('Изменить язык')}>
                            <LanguageToggle/>
                        </Tooltip>
                        <Tooltip text={t('Изменить тему')}>
                            <ThemeToggle/>
                        </Tooltip>
                    </div>


            </div>

        </div>
    );
};

export default Navbar;