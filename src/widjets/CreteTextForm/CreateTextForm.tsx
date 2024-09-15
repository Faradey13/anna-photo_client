import Modal from "../Modal/modal.tsx";
import MyButton from "../../shared/ui/MyButton/MyButton.tsx";
import MyTextarea from "../../shared/ui/MyTextArea/MyTextarea.tsx";
import {FC, useState} from "react";
import $api from "../../app/config/axios.ts";
import MyInput from "../../shared/ui/MyInput/MyInput.tsx";


interface CTFProps {
    isModalOpen: boolean;
    closeModal: () => void;
    type: string;
    keyUniq: string;
    isKey: boolean


}

interface IFetchingForm {
    ru: string;
    en: string;
    type: string;
    keyUniq: string;
}

const CreateTextForm: FC<CTFProps> = ({isModalOpen, closeModal, type, keyUniq,isKey}) => {
    const [valueRu, setValueRu] = useState('');
    const [valueEn, setValueEn] = useState('');
    const [valueKey, setValueKey] = useState('');



    console.log(`keй......${keyUniq}`)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let unitedKey = ''
        if(isKey){
            unitedKey = valueKey+keyUniq
        } else {
            unitedKey = keyUniq
        }
        const formData: IFetchingForm = {
            ru: valueRu,
            en: valueEn,
            type: type,
            keyUniq: unitedKey,
        };
        try {
            const response = await $api.post(`/text/create`, formData, {
                headers: {
                    'Accept': 'application/json',

                },
            });
            if (response.status >= 200 && response.status < 300) {
                console.log('Текст добавлен');
                closeModal()
                window.location.reload();
            }


        } catch (e) {
            console.log(e);
        }


    };

    const handleRuChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueRu(e.target.value);
    };

    const handleEnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueEn(e.target.value);
    };
    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueKey(e.target.value)
    }

    if (!isModalOpen) return null;

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <form onSubmit={handleSubmit}>
                <MyTextarea
                    placeholder="Русский текст"
                    value={valueRu}
                    onChange={handleRuChange}
                />
                <MyTextarea
                    placeholder="Английский текст"
                    value={valueEn}
                    onChange={handleEnChange}
                />
                {isKey && <MyInput
                    placeholder={'добавьте уникальный ключ записи'}
                    type={'text'}
                    value={valueKey}
                    onChange={handleKeyChange}
                />}
                <MyButton>Добавить текст</MyButton>
            </form>
        </Modal>
    );

};
export default CreateTextForm;