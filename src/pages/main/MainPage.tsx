import {gsap} from "gsap";
import {Fragment, MutableRefObject, useContext, useEffect, useRef} from "react";
import cls from './main.module.scss'
import {useModal} from "../../shared/hooks/useModal/useModal.ts";
import {useChangePhoto} from "../../shared/hooks/usePhoto/useChangePhoto.ts";
import ReplaceImageForm from "../../features/Photo/ReplaceImageForm/ReplaceImageForm.tsx";
import {API_URL} from "../../app/config/axios.ts";
import MainPhotoBlock from "../../features/Photo/MainPhotoBlock/MainPhotoBlock.tsx";
import MainTextBlock from "../../features/Text/MainTextBlock/MainTextBlock.tsx";
import {useText} from "../../shared/hooks/useText/useText.ts";
import MultiStepTextForm from "../../features/Text/MultistepsTextForm/MultistepsTextForm.tsx";
import MyButton from "../../shared/ui/MyButton/MyButton.tsx";
import Tooltip from "../../widjets/Tooltip/Tooltip.tsx";
import ConfirmWindow from "../../widjets/ConfirmWindow/ConfirmWindow.tsx";
import {useConfirmWindow} from "../../shared/hooks/useConfirmWindow.ts";
import {useAuthStore} from "../../features/Auth/useAuthStore.ts";
import {useIsomorphicLayoutEffect} from "../../shared/helpers/isomorphicEffect.ts";
import SmootherContext from "../../app/providers/gsapContext/gsapContext.tsx";
import ScrollTrigger from "gsap/ScrollTrigger";



const MainPage = () => {

    const {isAuth} = useAuthStore(state => state);
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const {openModal, isModalOpen, closeModal, selectedContent} = useModal();
    const {handleReplace, handleImageChange} = useChangePhoto({closeModal, selectedContent});
    const headerRef = useRef(null);
    const {currentText, removeTextByType, loading} = useText({type: 'main'})
    const {openConfirmWindow, isConfirmWindowOpen, confirmFunction, title} = useConfirmWindow()
    const {smootherReady} = useContext(SmootherContext);
    const leftRefs = useRef<HTMLDivElement[]>([]);
    leftRefs.current = [];

    const rightRefs = useRef<HTMLDivElement[]>([]);
    rightRefs.current = [];
    const keySeparator = (someKey: string) => {
        const [keyUni] = someKey.split('.')
        return keyUni
    }

    const triggerResize = () => {
        const resizeEvent = new Event('resize');
        window.dispatchEvent(resizeEvent);
        if (!isMobile) {
            document.body.style.overflow = 'visible'
        }
    };

    useEffect(() => {
        if (loading === false) {
            setTimeout(() => {
                ScrollTrigger.refresh();
            },700)
            ScrollTrigger.refresh();
        }
    }, [loading]);

    useEffect(() => {
        setTimeout(triggerResize, 200);
    }, []);

    const addToRefs = <T extends HTMLElement>(refArray: MutableRefObject<T[]>) => (el: T | null) => {
        if (el && !refArray.current.includes(el)) {
            refArray.current.push(el);
        }
    };
    useIsomorphicLayoutEffect(() => {
        if (!smootherReady) return;
        const ctx = gsap.context(() => {
            const headElement = headerRef.current;

            gsap.fromTo(
                headElement,
                { opacity: 1 },
                {
                    opacity: 0,
                    scrollTrigger: {
                        trigger: headElement,
                        start: 'center',
                        end: 'bottom',
                        scrub: true
                    }
                }
            );

            if (leftRefs.current.length) {
                leftRefs.current.forEach((element) => {
                    if (element) {
                        gsap.fromTo(
                            element,
                            { x: -100, opacity: 0 },
                            {
                                x: 0, opacity: 1,
                                scrollTrigger: {
                                    trigger: element,
                                    start: 'top bottom',
                                    end: 'top center',
                                    scrub: true,
                                },
                            }
                        );
                    }
                });
            }

            if (rightRefs.current.length) {
                rightRefs.current.forEach((element) => {
                    if (element) {
                        gsap.fromTo(
                            element,
                            { x: 100, opacity: 0 },
                            {
                                x: 0, opacity: 1,
                                scrollTrigger: {
                                    trigger: element,
                                    start: 'top bottom',
                                    end: 'top center',
                                    scrub: true,
                                },
                            }
                        );
                    }
                });
            }
        }, document.body);

        return () => ctx.revert();
    }, [smootherReady, location, leftRefs.current, rightRefs.current]);


    const removeTexts = async () => {
        await removeTextByType('main');
    };


    if (isMobile) {
        return (
            <div className={cls.wrapper}>
                {isModalOpen && (
                    <ReplaceImageForm
                        handleReplace={handleReplace}
                        handleImageChange={handleImageChange}
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                    />
                )}
                <header ref={headerRef} className={cls.header}>
                    <div className={cls.imageContainer}>
                        {isAuth &&
                            <img className={cls.replace}
                                 src="/src/shared/assets/images/icons/replace.svg"
                                 alt=""
                                 onClick={() => openModal('main_s.webp')}
                            />
                        }
                        <img className={cls.annaImage}
                             src={`${API_URL}/images/main/main_s.webp`}
                             alt="anna_gipp_photo"
                        />
                    </div>


                    <div className={cls.container}>
                        <div className={cls.headerName}>
                            <h1 className={cls.name}>anna gipp</h1>
                            <h5 className={cls.discr}>photographer</h5>
                        </div>
                    </div>
                </header>

                <section className={cls.portfolio}>
                    <div className={cls.container}>
                        <section className={cls.gallery}>
                            {currentText?.length === 5 && currentText?.map((item, index) => (
                                <Fragment key={index}>
                                    <MainPhotoBlock
                                        type={keySeparator(item.key)}
                                        isAuth={isAuth}
                                        openModal={openModal}
                                        ref={addToRefs(leftRefs)}
                                    />
                                    <MainTextBlock
                                        type={keySeparator(item.key)}
                                        head={item.titleText}
                                        text={item.content[0].contentText}
                                        ref={addToRefs(rightRefs)}
                                        idTitle={item.id}
                                        idContent={item.content[0].id}
                                    />
                                </Fragment>
                            ))
                            }

                        </section>
                    </div>
                </section>
            </div>
        )
    }

    return (
        <div className={cls.wrapper}>
            {isModalOpen && (
                <ReplaceImageForm
                    handleReplace={handleReplace}
                    handleImageChange={handleImageChange}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                />
            )}
            {isConfirmWindowOpen && <ConfirmWindow
                title={title}
                isOpenConfirmWindow={isConfirmWindowOpen}
                onConfirm={confirmFunction}
            />}
            <header id={'header'} ref={headerRef} className={cls.header}>
                <div data-speed={.8} className={cls.headerName}>
                    <h1 className={cls.name}>anna gipp</h1>
                    <h5 className={cls.discr}>photographer</h5>
                </div>
                <div data-speed={0.6} className={cls.annaImage}>
                    {isAuth &&
                        <img onClick={() => openModal('main_s.webp')}
                             className={cls.replace}
                             src="src/shared/assets/images/icons/replace.svg"
                             alt=""/>}
                    <img className={cls.annaImage_content}
                         src={`${API_URL}/images/main/main_s.webp`}
                         alt="anna_gipp_photo"
                    />
                </div>
            </header>

            <section id={'portfolio'} className={cls.portfolio}>
                <div className={cls.container}>
                    <section className={cls.gallery}>
                        <div className={cls.galleryLeft}>

                            {isAuth &&
                                <div className={cls.textButtons}>
                                    <Tooltip
                                        text={'В случае ошибки отображения элементов и перед повторным их добавлением обязательно нажать эту кнопку'}>
                                        <MyButton onClick={() => {
                                            openConfirmWindow(removeTexts, 'Действитель удалить все блоки с текстом со страницы?')
                                        }}>Удалить текст в случае ошибки</MyButton>

                                    </Tooltip>
                                    <Tooltip
                                        text={'Форма добавления текста галлереии, перед добавлением обязательно удалить старые элементы сосдней кнопкой'}>
                                        <MultiStepTextForm/>
                                    </Tooltip>
                                </div>
                            }
                            {currentText?.length === 5 && currentText?.map((item, index) => {
                                if (index % 2 === 0) {
                                    return (
                                        <MainPhotoBlock
                                            key={index}
                                            ref={addToRefs(leftRefs)}
                                            type={keySeparator(item.key)}
                                            openModal={openModal}
                                            isAuth={isAuth}
                                            speed={.9}
                                        />
                                    )
                                }

                                return (
                                    <MainTextBlock
                                        idTitle={item.id}
                                        key={index}
                                        idContent={(item.content[0].id)}
                                        type={keySeparator(item.key)}
                                        text={item.content[0].contentText}
                                        head={item.titleText}
                                        speed={1.1}
                                        ref={addToRefs(leftRefs)}
                                    />
                                )
                            })
                            }

                        </div>
                        <div className={cls.galleryRight}>

                            {currentText?.length === 5 && currentText?.map((item, index) => {
                                if (index % 2 !== 0) {
                                    return (
                                        <MainPhotoBlock
                                            key={index}
                                            ref={addToRefs(rightRefs)}
                                            type={keySeparator(item.key)}
                                            openModal={openModal}
                                            isAuth={isAuth}
                                            speed={.9}
                                        />
                                    )
                                }
                                return (
                                    <MainTextBlock
                                        key={index}
                                        type={keySeparator(item.key)}
                                        text={item.content[0].contentText}
                                        head={item.titleText}
                                        speed={1.1}
                                        ref={addToRefs(rightRefs)}
                                        idTitle={item.id}
                                        idContent={(item.content[0].id)}

                                    />
                                )
                            })

                            }

                        </div>
                    </section>
                </div>

            </section>


        </div>


    );
};

export default MainPage;