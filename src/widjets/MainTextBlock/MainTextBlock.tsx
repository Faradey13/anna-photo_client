import cls from "./mainTextBlock.module.scss";
import {forwardRef} from "react";
import {useNavigate} from "react-router-dom";
import Tooltip from "../Tooltip/Tooltip.tsx";
import {useAuthStore} from "../../features/Auth/useAuthStore.ts";

interface MainTextBlockProps {
    speed?: number,
    type: string,
    head: string,
    text: string,
}


const MainTextBlock = forwardRef<HTMLDivElement, MainTextBlockProps>(({
                                                                          text,
                                                                          type,
                                                                          head,
                                                                          speed,
                                                                      }, ref) => {

    const navigate = useNavigate()
    const {isAuth} = useAuthStore(state => state)
        return (
            <div ref={ref} data-speed={speed}
                 className={cls.galleryText}
                 onClick={() => navigate(`/${type}`)}
            >
                <div  className={cls.galleryTextBlock}>
                    <div className={cls.textContainer}>
                        <h2 className={cls.galleryText_h}>{head}</h2>
                        {isAuth && <div className={cls.toolTips}>

                            <Tooltip text={`Удалить "${head}"`}>
                                <img className={cls.addText} src="/src/shared/assets/images/icons/bin.svg"
                                     alt=""/>
                            </Tooltip>
                            <Tooltip text={`Изменить "${head}"`}>
                                <img className={cls.addText} src="/src/shared/assets/images/icons/changeText.svg"
                                     alt=""/>
                            </Tooltip>
                        </div>}
                    </div>
                    <div className={cls.textContainer}>
                        <p className={cls.galleryText_p}>
                            {text}
                        </p>
                        {isAuth && <div className={cls.toolTips}>

                            <Tooltip text={`Изменить`}>
                                <img className={cls.addText} src="/src/shared/assets/images/icons/changeText.svg"
                                     alt=""/>
                            </Tooltip>
                        </div>}
                    </div>


                </div>

            </div>
        );

    }
)
export default MainTextBlock;