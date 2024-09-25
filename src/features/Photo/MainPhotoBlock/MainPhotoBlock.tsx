import cls from "./mainPhotoBlock.module.scss";
import {useNavigate} from "react-router-dom";
import {forwardRef} from "react";
import {API_URL} from "../../../app/config/axios.ts";


interface MainPhotoBlockProps {
    isAuth: boolean,
    openModal: (arg0: string) => void,
    speed?: number,
    type: string


}

const MainPhotoBlock = forwardRef<HTMLDivElement, MainPhotoBlockProps>(
    ({isAuth, openModal, speed, type }, ref) => {
    const navigate = useNavigate();

    return (

        <div
            ref={ref}
            data-speed={speed}
            className={cls.galleryImage}
        >
            {isAuth &&
                <img
                    className={cls.replace}
                    src="/src/shared/assets/images/icons/replace.svg"
                    alt=""
                    onClick={() => openModal(`${type}_s.jpg`)}
                />

            }
            <img
                src={`${API_URL}/images/main/${type}_s.jpg`}
                alt={`${type}_photo`}
                className={cls.image}
                onClick={() => navigate(`/${type}`)}

            />
        </div>

    );
}
)
export default MainPhotoBlock;