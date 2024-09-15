import Modal from "../Modal/modal.tsx";
import MyButton from "../../shared/ui/MyButton/MyButton.tsx";
import MyTextarea from "../../shared/ui/MyTextArea/MyTextarea.tsx";
import {FC, useEffect, useState} from "react";
import {UseText} from "../../shared/hooks/useText/type.ts";
import $api from "../../app/config/axios.ts";
import {useTranslation} from "react-i18next";


interface CTFProps {
    engText: UseText[];
    ruText: UseText[];
    id: number;
    isModalOpen: boolean;
    closeModal: () => void;


}

interface IFetchingForm {
    ru: string;
    en: string;
    idRu?: number;
    idEn?: number;
}


const ChangeTextForm: FC<CTFProps> = ({ engText, ruText, id, isModalOpen, closeModal }) => {
    const [valueRu, setValueRu] = useState('');
    const [valueEn, setValueEn] = useState('');
    const [secondId, setSecondId] = useState<number | undefined>();



    const {  i18n } = useTranslation();
    const lang = i18n.language;
    useEffect(() => {
        const Position = lang === 'ru'
            ? ruText.findIndex(item => item.id === id)
            : engText.findIndex(item => item.id === id);

        if (Position !== -1) {
            console.log(ruText[Position].text)
            setValueRu(ruText[Position].text);
            setValueEn(engText[Position].text);
            setSecondId(engText[Position].id);

        }
    }, [lang, id, ruText, engText]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (lang === 'ru'){
            const formData: IFetchingForm = {
                ru: valueRu,
                en: valueEn,
                idRu: id,
                idEn: secondId || -2000,
            };
            try {
                const response = await $api.post(`/text/edit`, formData, {
                    headers: {
                        'Accept': 'application/json',

                    },
                });
                if (response.status >= 200 && response.status < 300) {
                    console.log('Текст успешно изменен');
                    closeModal()
                    window.location.reload();
                }


            } catch (e) {
                console.log(e);
            }
        }


    };

    const handleRuChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueRu(e.target.value);
    };

    const handleEnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueEn(e.target.value);
    };

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
                <MyButton>Изменить текст</MyButton>
            </form>
        </Modal>
    );

};
export default ChangeTextForm;