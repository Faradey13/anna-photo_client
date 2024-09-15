import cls from "./about.module.scss";
import {useAuthStore} from "../../features/Auth/useAuthStore.ts";
import {useModal} from "../../shared/hooks/useModal/useModal.ts";
import {useChangePhoto} from "../../shared/hooks/usePhoto/useChangePhoto.ts";
import ReplaceImageForm from "../../widjets/ReplaceImageForm/ReplaceImageForm.tsx";
import {API_URL} from "../../app/config/axios.ts";
import Tooltip from "../../widjets/Tooltip/Tooltip.tsx";



const About = () => {

    const {isAuth} = useAuthStore (state => state)
    const {isModalOpen,closeModal, selectedContent, openModal} = useModal()
    const {handleImageChange,handleReplace} =useChangePhoto({selectedContent,closeModal})

    return (
        <div className={cls.about}>
            {isModalOpen && (
                <ReplaceImageForm
                    handleReplace={handleReplace}
                    handleImageChange={handleImageChange}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                />
            )}

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
                    <div className={cls.toolTips}>
                        <Tooltip text={`Добавить блок обо мне"`}>
                            <img className={cls.addText} src="/src/shared/assets/images/icons/addText.svg"
                                 alt=""/>
                        </Tooltip>
                        <Tooltip text={`Изменить первый блок обо мне`}>
                            <img className={cls.addText} src="/src/shared/assets/images/icons/changeText.svg"
                                 alt=""/>
                        </Tooltip>
                    </div>
                    <div>Привет! Меня зовут Аня, и я профессиональный фотограф. Работаю в Москве. С 2016 года я
                        занимаюсь
                        созданием
                        фотографий,
                        которые не просто запечатлевают момент, но и передают настроение и эмоции. Работаю как в студии,
                        так
                        и
                        на природе, что позволяет создавать разнообразные и уникальные образы для каждого человека.
                    </div>
                </div>
                <div>
                    <div className={cls.toolTips}>

                        <Tooltip text={`Удалить второй блок`}>
                            <img className={cls.addText} src="/src/shared/assets/images/icons/bin.svg"
                                 alt=""/>
                        </Tooltip>
                        <Tooltip text={`Изменить второй блок`}>
                            <img className={cls.addText} src="/src/shared/assets/images/icons/changeText.svg"
                                 alt=""/>
                        </Tooltip>
                    </div>
                    <div>Я люблю экспериментировать с творческими идеями и всегда ищу что-то необычное, что придает моим
                        фотографиям особую атмосферу. За эти годы я успела поработать с множеством довольных клиентов,
                        которые часто возвращаются за новыми кадрами, и
                        каждый
                        раз стремлюсь создать что-то особенное. Что бы прийти ко мне на съемку не обязательно быть
                        моделью.
                    </div>
                </div>
                <div>
                    <div className={cls.toolTips}>
                        <Tooltip text={`Удалить третий блок`}>
                            <img className={cls.addText} src="/src/shared/assets/images/icons/bin.svg"
                                 alt=""/>
                        </Tooltip>
                        <Tooltip text={`Изменить третий блок`}>
                            <img className={cls.addText} src="/src/shared/assets/images/icons/changeText.svg"
                                 alt=""/>
                        </Tooltip>
                    </div>
                    <div>Мой надежный помощник — фотоаппарат Sony a7 3, который позволяет мне запечатлеть каждую деталь
                        в
                        идеальном качестве.
                    </div>

                </div>


            </div>


        </div>
    );
};

export default About;