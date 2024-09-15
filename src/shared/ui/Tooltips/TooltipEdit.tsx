
import cls from "./toolltips.module.scss";
import Tooltip from "../../../widjets/Tooltip/Tooltip.tsx";
import {FC} from "react";
export interface tooltipProps{
    text: string;
    onClick: () => void
}

const TooltipEdit:FC<tooltipProps> = ({onClick,text}) => {
    return (
            <Tooltip text={text}>
                <img onClick={onClick} className={cls.tooltipImage} src="/src/shared/assets/images/icons/changeText.svg"
                     alt=""/>
            </Tooltip>
    );
};

export default TooltipEdit;