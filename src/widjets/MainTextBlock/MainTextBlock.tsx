import cls from "./mainTextBlock.module.scss";
import {forwardRef} from "react";
import {useNavigate} from "react-router-dom";
import Tooltip from "../Tooltip/Tooltip.tsx";
import {useAuthStore} from "../../features/Auth/useAuthStore.ts";
import {useModal} from "../../shared/hooks/useModal/useModal.ts";
import ChangeTextForm from "../ChangeTextForm/ChangeTextForm.tsx";
import {useText} from "../../shared/hooks/useText/useText.ts";
import TooltipEdit from "../../shared/ui/Tooltips/TooltipEdit.tsx";

interface MainTextBlockProps {
    speed?: number,
    type: string,
    head: string,
    text: string,
    idTitle: number,
    idContent: number
}


const MainTextBlock = forwardRef<HTMLDivElement, MainTextBlockProps>(({
                                                                          text,
                                                                          type,
                                                                          idTitle,
                                                                          idContent,
                                                                          head,
                                                                          speed,
                                                                      }, ref) => {

        const {openTextEditModal, isTextEditForm, selectedContent, closeModal} = useModal()
        const {ruText, enText} = useText({type: 'main'})

        const navigate = useNavigate()
        // const {isAuth} = useAuthStore(state => state)
        const isAuth = true
        return (
            <div ref={ref} data-speed={speed}

                 className={cls.galleryText}
                 // onClick={() => navigate(`/${type}`)}
            >
                {isTextEditForm && (
                    <ChangeTextForm
                        id={Number(selectedContent)}
                        ruText={ruText}
                        closeModal={closeModal}
                        isModalOpen={isTextEditForm}
                        engText={enText}
                    />
                )}
                <div className={cls.galleryTextBlock}>
                    <div className={cls.textContainer}>
                        <h2 className={cls.galleryText_h}>{head}</h2>
                        {isAuth && <div className={cls.toolTips}>
                            <TooltipEdit text={`Изменить "${head}"`}
                                         onClick={() => openTextEditModal(String(idTitle))}/>
                        </div>}
                    </div>
                    <div className={cls.textContainer}>
                        <p className={cls.galleryText_p}>
                            {text}
                        </p>
                        {isAuth && <div className={cls.toolTips}>
                            <TooltipEdit text={`Изменить описание`}
                                         onClick={() => openTextEditModal(String(idContent))}/>
                        </div>}
                    </div>


                </div>

            </div>
        );

    }
)
export default MainTextBlock;