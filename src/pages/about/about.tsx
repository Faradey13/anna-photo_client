import cls from "./about.module.scss";
import {useAuthStore} from "../../features/Auth/useAuthStore.ts";
import {useModal} from "../../shared/hooks/useModal/useModal.ts";
import {useChangePhoto} from "../../shared/hooks/usePhoto/useChangePhoto.ts";
import ReplaceImageForm from "../../widjets/ReplaceImageForm/ReplaceImageForm.tsx";
import {API_URL} from "../../app/config/axios.ts";

import {useText} from "../../shared/hooks/useText/useText.ts";
import TooltipCreate from "../../shared/ui/Tooltips/TooltipCreate.tsx";
import TooltipDel from "../../shared/ui/Tooltips/TooltipDel.tsx";
import TooltipEdit from "../../shared/ui/Tooltips/TooltipEdit.tsx";
import ChangeTextForm from "../../widjets/ChangeTextForm/ChangeTextForm.tsx";
import CreateTextForm from "../../widjets/CreteTextForm/CreateTextForm.tsx";
import {useConfirmWindow} from "../../shared/hooks/useConfirmWindow.ts";
import ConfirmWindow from "../../widjets/ConfirmWindow/ConfirmWindow.tsx";


const About = () => {
    const {isConfirmWindowOpen, openConfirmWindow , confirmFunction, title
    } = useConfirmWindow()
    const {isAuth} = useAuthStore(state => state)
    const {
        isModalOpen,
        closeModal,
        selectedContent,
        openModal,
        openCreateModalWithKey,
        openTextEditModal,
        isTextEditForm,
        isTextCreateForm,
        selectedContentObj,
        isKey
    } = useModal()
    const {handleImageChange, handleReplace,} = useChangePhoto({selectedContent, closeModal})
    const {currentText, ruText, enText, removeText} = useText({type: 'about'})

    return (
        <div className={cls.about}>
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
                    title={'Добавьте текст в раздел обо мне на 2х языках'}
                />
            }

            <div className={cls.imageContainer}>
                {isAuth &&
                    <img className={cls.replace}
                         src="/src/shared/assets/images/icons/replace.svg"
                         alt=""
                         onClick={() => openModal('about_s.jpg')}
                    />
                }
                <img className={cls.image}
                     src={`${API_URL}/images/main/about_s.jpg`}
                     alt="anna_gipp_about"
                />
            </div>
            <div className={cls.textBlock}>
                <div>
                    <div style={{position: "relative", width: "100%", height: "100%"}}>
                        <TooltipCreate text={'Добавить пунк обо мне'}
                                       onClick={() => openCreateModalWithKey('about', '.title')}/>
                    </div>
                    <div className={cls.toolTips}>
                        {currentText?.map((section, index) => (
                            <div key={index}>
                                <div className={cls.toolTips}>
                                    <TooltipDel text={`Удалить блок"`}
                                                onClick={() => {
                                                    openConfirmWindow(() => removeText(section.id), 'Удалить этот блок?')
                                                }}/>
                                    <TooltipEdit text={`Изменить блок`}
                                                 onClick={() => openTextEditModal(String(section.id))}/>
                                </div>
                                <div>{section.titleText}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;