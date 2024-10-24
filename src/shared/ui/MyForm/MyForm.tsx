import cls from './myForm.module.scss'

interface MyFormProps {
    children: React.ReactNode;
    onSubmit: () => void;
}

const MyForm = (props: MyFormProps) => {
    return (
        <form className={cls.form} onSubmit={props.onSubmit}>
            {props.children}
        </form>
    );
};

export default MyForm;