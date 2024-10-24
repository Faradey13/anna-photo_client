import {useEffect, useState} from 'react';
import i18n from 'i18next';
import cls from './languageToggle.module.scss';
import classNames from "classnames";

const LanguageToggle = () => {
    const [isEnglish, setIsEnglish] = useState(localStorage.getItem('language') === 'en' || i18n.language === 'en')
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const handleToggle = () => {
        const newLang = isEnglish ? 'ru' : 'en';
        i18n.changeLanguage(newLang);
        setIsEnglish(!isEnglish);
        localStorage.setItem('language', newLang)
        // window.location.reload();
    };
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setIsEnglish(savedLanguage === 'en');
            i18n.changeLanguage(savedLanguage);
        }
    }, []);

    const svgFillClasses = classNames({
        [cls.langTogglePath] : !isMobile,
        [cls.langTogglePathMobile] : isMobile
    })

    return (
        <div className={cls.toggleContainer} onClick={handleToggle}>
            <div className={`${cls.svgWrapper} ${isEnglish ? cls.flip : ''}`} >
                <svg className={cls.svgRu}
                      version="1.1"
                     xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px"
                     y="0px" viewBox="0 0 256 256" enableBackground="new 0 0 256 256" xmlSpace="preserve">
                    <g>
                        <g>
                            <g>
                                <path fill="none" className={svgFillClasses}
                                      d="M115.3,10.6c-15.4,1.6-32.1,7.1-46,15.1c-17.5,10-33.6,26.2-43.6,43.6C-0.4,114.8,6.6,172,42.8,209.6c19.3,20,42.9,32,69.9,35.6c9.5,1.3,27.2,0.9,35.9-0.8c24.7-4.7,45.8-15.7,62.9-32.9c17.2-17.1,28.2-38.3,32.9-62.9c1.7-8.7,2.1-26.4,0.8-35.9c-4.6-34.2-23.3-64-52.4-83.5c-10.4-7-25.6-13.4-38.5-16.4C142.7,10.2,127.5,9.3,115.3,10.6z M137.4,31.9c12.7,0.9,28,5.8,40,13c10.8,6.5,22.3,17.1,29.7,27.5c7.7,10.8,13.8,25.5,16.3,39c1.5,8.4,1.6,24.4,0.3,32.1c-6.2,34.5-27.7,61.3-59.4,74.3c-11.9,4.9-22.2,6.8-36.2,6.8c-12.2-0.1-19.2-1.1-30-4.6c-28.8-9.4-52.4-32.9-61.8-61.5c-6.4-19.5-6.3-40.8,0.1-60.7c2.4-7.5,8.3-19.1,13.1-25.8c4.7-6.6,15.7-17.7,22.4-22.4C82.4,42,96.3,36,109.3,33.3c5.9-1.2,16.2-2.1,20.9-1.8C131.7,31.6,134.9,31.8,137.4,31.9z"/>
                                <path
                                    fill="none" className={svgFillClasses}
                                    d="M91,97.1c-9.7,2.1-17.2,9.9-20,20.9c-1.4,5.2-1.4,17.1-0.1,21.4c2.3,7.5,6.7,13.5,12.4,16.8c8.6,5,23.4,4.8,34.4-0.5c5.2-2.5,5-2.2,2.7-7.7c-1.1-2.6-2.1-4.9-2.2-5c-0.1-0.1-2.1,0.6-4.3,1.6c-8.2,3.4-17.1,3.4-21.8,0c-2.5-1.8-4.9-6.2-5.1-9.5l-0.2-2.2l18.3-0.2l18.3-0.1v-6c0-10.6-2.3-17.9-7.4-23.3C110.5,97.4,100.7,94.9,91,97.1z M102.8,110.2c2.4,1.3,4,4.4,4.2,8.4l0.2,3.1H97.1H86.9l0.3-2.1c0.7-3.7,3.1-7.9,5.5-9.2C95.5,108.9,100.1,108.8,102.8,110.2z"/>
                                <path
                                    fill="none" className={svgFillClasses}
                                    d="M161,97.1c-3.7,1-6.9,3-9.8,6.1l-2.2,2.4l-0.4-3.2c-0.2-1.8-0.4-3.6-0.4-4c-0.1-0.7-1.5-0.8-7.9-1l-7.7-0.2V128v30.7h8.4h8.4v-22.5v-22.5l1.8-1.4c2.8-2.2,5.5-3,9.2-3c4,0,6.4,1.2,7.9,3.9c0.9,1.6,1,3.8,1.1,23.6l0.2,21.9h8.4h8.4v-20.2c0-20.5-0.3-24.8-1.9-30c-2.2-7.1-8.4-11.6-16.3-12C165.3,96.3,162.9,96.5,161,97.1z"/>
                            </g>
                        </g>
                    </g>
                </svg>
                <svg
                    className={cls.svgEn} version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlnsXlink="http://www.w3.org/1999/xlink" x="0px"
                     y="0px" viewBox="0 0 256 256" enableBackground="new 0 0 256 256" xmlSpace="preserve">
                    <g>
                        <g>
                            <g>
                                <path  className={svgFillClasses} fill='none'
                                      d="M113.1,10.4c-20.8,2.8-39.1,10.3-56.1,22.8c-6.4,4.7-18.9,17.2-23.7,23.8c-11.9,16.2-19,33-22.4,53.1c-1.3,7.8-1.3,27.8,0,35.7c4.3,26.2,16.1,49,34.8,67c2.9,2.8,6.4,6.1,7.9,7.3c9.4,7.7,25.5,16.4,37.2,20.3c21.6,7.1,46.4,7.8,68.3,1.9c40.8-11.1,73.5-44.3,83.7-85.2c2.8-11.1,3.2-14.9,3.2-29c0-14.2-0.4-18.3-3.2-29.1C231.3,53.2,194,19,146.9,10.9C139.9,9.7,120.3,9.4,113.1,10.4z M137.4,31.5c16.7,1.6,33.2,7.8,46.7,17.4c6.5,4.6,18.4,16.4,23,23c14.8,21,20.7,47.2,16.4,72.6c-7.5,43.7-44.6,77.1-88.5,79.9c-22.2,1.4-42.7-4-60.8-16.1c-40.1-26.8-54.2-79.4-33-122.8c5.3-10.9,11.5-19.4,20.6-28C81.9,38.3,109.9,28.7,137.4,31.5z"/>
                                <path  className={svgFillClasses}
                                      fill='none'
                                      d="M97.4,93.3c-2.9,1.1-5.5,2.8-7.5,5.1l-1.9,2.1l-0.5-3.2l-0.4-3.3l-7.5-0.2l-7.6-0.2v42.6v42.5h8.2h8.2V164v-14.7l2.2,1.9c3.9,3.3,6.4,4.3,12.2,4.5c5.6,0.2,9-0.6,12.8-2.9c5-3.2,9.3-9.9,10.8-17c1.1-5,1-16.7-0.1-22c-1.8-8.9-7-16.5-13.3-19.6c-2.6-1.3-3.9-1.5-8.4-1.6C101.1,92.6,98.7,92.8,97.4,93.3z M104.1,106.6c2.5,1.4,5.3,6.4,6.1,11c0.7,4,0.6,12-0.2,15.5c-1.7,7.1-4.9,10-11,10c-4.1,0-7.1-1.2-9.2-3.7l-1.4-1.8v-13.1c0-12.8,0.1-13.2,1.2-14.9C92.4,105.5,99.6,104,104.1,106.6z"/>
                                <path  className={svgFillClasses}
                                      fill='none'
                                      d="M131.2,94.5c0.2,0.5,5.1,14.3,10.9,30.6l10.5,29.6l-1.3,3.3c-2.6,6.4-5,8.3-10.5,8.3H138l-0.6,3.6c-0.3,2-0.6,4.7-0.7,6l-0.1,2.3l2.9,0.7c3.6,0.9,9.3,0.5,13-0.7c3.4-1.2,7.9-5.6,10.3-10.2c1.3-2.5,25-68.4,26.5-73.7c0.3-0.8-0.3-0.9-8.6-0.8l-8.9,0.2l-4.5,14.9c-7.6,25.2-7.2,24.1-7.7,22.6c-0.3-0.7-2.8-9.5-5.6-19.6l-5.3-18.2h-8.9C131.5,93.6,130.8,93.7,131.2,94.5z"/>
                            </g>
                        </g>
                    </g>
                </svg>


            </div>
        </div>
    );
};


export default LanguageToggle;