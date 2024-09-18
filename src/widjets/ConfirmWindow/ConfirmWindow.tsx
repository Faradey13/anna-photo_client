import cls from './confirmWindow.module.scss'
import MyButton from "../../shared/ui/MyButton/MyButton.tsx";
import {FC, useEffect, useState} from "react";
import {Portal} from "../Portal/portal.tsx";
import classNames from "classnames";

interface ConfirmWindowProps {
    title: string;
    onConfirm?: () => void;
    isOpenConfirmWindow: boolean;
}

const ConfirmWindow: FC<ConfirmWindowProps> = ({onConfirm,title,isOpenConfirmWindow}) => {
    const [isMounted, setIsMounted] = useState(false)

    const  handleConfirm =  async () => {
        if (onConfirm) await onConfirm()
        setIsMounted(false)
    }

    const handleCancel = () => {
        setIsMounted(false)
    }

    const confirmClasses = classNames({
        [cls.confirm] : true,
        [cls.opened] : isMounted,
        [cls.close] : !isMounted
    })
    useEffect(() => {
        if(isOpenConfirmWindow){
            setIsMounted(true)
        }
    }, [isOpenConfirmWindow]);

    return (
        <Portal>
            <div className={confirmClasses}>
                <h3>{title}</h3>
                <div className={cls.buttons}>
                    <MyButton onClick={handleConfirm}>Да</MyButton>
                    <MyButton onClick={handleCancel}>Нет</MyButton>
                </div>

            </div>
        </Portal>

    );
};

export default ConfirmWindow;