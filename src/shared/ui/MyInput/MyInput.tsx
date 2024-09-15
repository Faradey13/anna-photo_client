import React, {forwardRef} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';
import cls from './myInput.module.scss'

interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    placeholder: string;
    register?: UseFormRegisterReturn;
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(({
                                                                type,
                                                                placeholder,
                                                                register,
                                                                ...otherProps
                                                            }, ref) => {
    return (
        <input
            className={cls.input}
            type={type}
            placeholder={placeholder}
            {...(register ? register : {})}
            ref={ref}
            {...otherProps}
        />
    );
});

export default MyInput;