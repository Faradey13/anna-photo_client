import cls from './price.module.scss'
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {useModal} from "../../shared/hooks/useModal/useModal.ts";
import {useChangePhoto} from "../../shared/hooks/usePhoto/useChangePhoto.ts";
import ReplaceImageForm from "../../widjets/ReplaceImageForm/ReplaceImageForm.tsx";
import {API_URL} from "../../app/config/axios.ts";
import {useText} from "../../shared/hooks/useText/useText.ts";
import ChangeTextForm from "../../widjets/ChangeTextForm/ChangeTextForm.tsx";
import CreateTextForm from "../../widjets/CreteTextForm/CreateTextForm.tsx";
import TooltipCreate from "../../shared/ui/Tooltips/TooltipCreate.tsx";
import TooltipDel from "../../shared/ui/Tooltips/TooltipDel.tsx";
import TooltipEdit from "../../shared/ui/Tooltips/TooltipEdit.tsx";
import ConfirmWindow from "../../widjets/ConfirmWindow/ConfirmWindow.tsx";
import {useConfirmWindow} from "../../shared/hooks/useConfirmWindow.ts";

interface CreateItem {
    title: string,
    type: string,
    key: string
}
const Price = () => {
    const isAuth = true

    const {
        openModal,
        isModalOpen,
        closeModal,
        selectedContent,
        openTextEditModal,
        isTextCreateForm,
        isTextEditForm,
        selectedContentObj,
        isKey,
        openCreateModalWithKey,
        openTextCreateModal
    } = useModal()
    const {handleImageChange, handleReplace} = useChangePhoto({selectedContent, closeModal})
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const iconRef = useRef<SVGSVGElement[]>([])
    const listRefs = useRef<HTMLUListElement[]>([])
    const {currentText, ruText, enText, removeText} = useText({type: 'service'})
    const [titleForm, setTitleForm] = useState('')
    const {isConfirmWindowOpen,openConfirmWindow,confirmFunction,title} = useConfirmWindow()
    const addToRefs = (el: HTMLUListElement | null) => {
        if (el && !listRefs.current.includes(el)) {
            listRefs.current.push(el);
        }
    };
    console.log(currentText)
    const addToRefsLogo = (el: SVGSVGElement | null) => {
        if (el && !iconRef.current.includes(el)) {
            iconRef.current.push(el);
        }
    };

    const toggleList = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        iconRef.current.forEach((element, index) => {
            if (openIndex === index) {
                gsap.to(
                    element,
                    {rotation: 90, duration: 0.3, ease: 'linear'}
                )
            } else {
                gsap.to(
                    element,
                    {rotation: 0, duration: 0.3, ease: 'linear'}
                )
            }
        })
    }, [openIndex]);

    useEffect(() => {
        listRefs.current.forEach((element, index) => {
            if (openIndex === index) {
                gsap.fromTo(
                    element,
                    {height: 0, opacity: 0, display: 'block'},
                    {height: 'auto', opacity: 1, duration: 0.3, ease: 'linear'}
                );
            } else {
                gsap.to(element, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'linear',
                    onComplete: () => {
                        if (element) element.style.display = 'none';
                    },
                });
            }
        });
    }, [openIndex]);




    const keySplitter = (str: string) => {
        const [keyValue] = str.split('.');
        return keyValue
    }
    const handleCreateItem = (props: CreateItem) => {
        setTitleForm(props.title)
        openCreateModalWithKey({keyUniq: props.key,type: props.type})
    }
    const handleCreateSubItem = (props: CreateItem) => {
        setTitleForm(props.title)
        openTextCreateModal({type: props.type, keyUniq: props.key})
    }

    return (
        <div className={cls.prises}>
            {isConfirmWindowOpen && <ConfirmWindow
                isOpenConfirmWindow={isConfirmWindowOpen}
                title={title}
                onConfirm={confirmFunction}
            />}
            {isModalOpen && (
                <ReplaceImageForm
                    handleReplace={handleReplace}
                    handleImageChange={handleImageChange}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                />
            )}
            {isTextEditForm && <ChangeTextForm
                id={Number(selectedContent)}
                ruText={ruText}
                closeModal={closeModal}
                isModalOpen={isTextEditForm}
                engText={enText}
            />}
            {
                isTextCreateForm && <CreateTextForm
                    isModalOpen={isTextCreateForm}
                    closeModal={closeModal}
                    keyUniq={selectedContentObj.keyUniq}
                    type={selectedContentObj.type}
                    isKey={isKey}
                    title={titleForm}
                />
            }
            <div className={cls.textBlock}>
                <div style={{position: "relative", width: "100%", height: "100%"}}>
                    <TooltipCreate text={'Добавить пунк в FAQ'} onClick={() => handleCreateItem({type: 'service', key:'.title', title:'Добавить пунк в FAQ на 2х языках'})}/>
                </div>


                {currentText?.map((section, index) => (
                    <div key={index} className={cls.text}>
                        <div onClick={() => toggleList(index)} className={cls.headListBlock}>
                            <div className={cls.toolTips}>
                                <TooltipCreate text={`Добавить подпунк в "${section.titleText}"`}
                                               onClick={() => handleCreateSubItem({type: 'service',key: `${keySplitter(section.key)}.content`, title: `Добавьте подпунк в "${section.titleText}"`}
                                               )}/>
                                <TooltipDel text={`Удалить "${section.titleText}"`}
                                            onClick={() => {
                                                openConfirmWindow(() => removeText(section.id),  `Удалить "${section.titleText}"?`
                                                )
                                            }}/>
                                <TooltipEdit text={`Изменить "${section.titleText}"`}
                                             onClick={() => openTextEditModal(String(section.id))}/>
                            </div>

                            <h2 className={cls.h2}>{section.titleText}</h2>
                            <svg
                                ref={addToRefsLogo}

                                className={cls.iconCross}
                                fill="none"
                                width="30px"
                                height="30px"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5 c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4 C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
                            </svg>
                        </div>

                        <ul ref={addToRefs} className={cls.textList}
                            style={{overflow: 'hidden', height: 0, display: 'none'}}>
                            {Array.isArray(section.content) ? section.content.map((item, idx) => (

                                <div className={cls.li} key={idx}>
                                    <div className={cls.toolTips}>
                                        <div className={cls.toolTips}>
                                            <TooltipDel text={`Удалить подпункт`}
                                                        onClick={() => {
                                                            openConfirmWindow(() => removeText(item.id),  `Удалить "${item.contentText}"?`
                                                            )
                                                        }}/>
                                            <TooltipEdit text={`Изменить подпункт`}
                                                         onClick={() => openTextEditModal(String(item.id))}/>
                                        </div>
                                        {item.contentText}
                                    </div>
                                </div>

                            )) : ''}
                        </ul>
                        <hr className={cls.line}/>
                    </div>
                ))}
            </div>

            <div className={cls.imageContainer}>
                {isAuth &&
                    <img className={cls.replace}
                         src="/src/shared/assets/images/icons/replace.svg"
                         alt=""
                         onClick={() => openModal('service3_s.jpg')}
                    />
                }
                <img className={cls.image} src={`${API_URL}/images/main/service3_s.jpg`} alt="work_photo"/>
            </div>


        </div>
    );
};

export default Price;