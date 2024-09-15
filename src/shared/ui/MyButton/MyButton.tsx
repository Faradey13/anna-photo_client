import cls from './myButton.module.scss'


interface MyButtonProps {
    children: string
    onClick?: () => void
    type?: "button" | "submit" | "reset" | undefined
}

const MyButton = (props:MyButtonProps) => {
    return (
        <button
            className={cls.button}
            onClick={props.onClick}
            type={props.type}
        >
            {props.children}
        </button>
    );
};

export default MyButton;