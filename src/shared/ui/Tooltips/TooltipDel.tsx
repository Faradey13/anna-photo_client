
import cls from "./toolltips.module.scss";
import Tooltip from "../../../widjets/Tooltip/Tooltip.tsx";
import {FC} from "react";
import {tooltipProps} from "./TooltipEdit.tsx";


const TooltipDel:FC<tooltipProps> = ({text, onClick}) => {
    return (
        <Tooltip text={text}>
            <img onClick={onClick} className={cls.tooltipImage} src="/src/shared/assets/images/icons/bin.svg"
                 alt=""/>
        </Tooltip>
    );
};

export default TooltipDel;