import cls from './tooltip.module.scss'

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {



    return (
        <div className={cls.tooltipContainer}>
            {children}
            <span className={cls.tooltipText}>{text}</span>
        </div>
    );
};

export default Tooltip;