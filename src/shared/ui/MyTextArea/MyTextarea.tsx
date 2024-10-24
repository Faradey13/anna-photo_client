import React, {ChangeEventHandler, ForwardedRef, useRef} from 'react';
import {UseFormRegisterReturn} from "react-hook-form";
import cls from './myTextarea.module.scss'

interface MyTextareaProps {
    value?: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    placeholder?: string;
    register?: UseFormRegisterReturn;
    defaultValue?: string;
}

const MyTextarea = React.forwardRef<HTMLTextAreaElement, MyTextareaProps>(
    ({placeholder,register, value, onChange }, ref: ForwardedRef<HTMLTextAreaElement>) => {
        const textareaRef = useRef<HTMLTextAreaElement>(null);


        React.useEffect(() => {
        if (textareaRef.current) {

            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]); // Запуск эффекта при изменении значения

    return (
        <textarea
            className={cls.area}
            {...(register ? register : {})}
            ref={textareaRef || ref}
            value={value}
            onChange={onChange}
            placeholder={placeholder}


        />
    );
    }
);

export default MyTextarea;