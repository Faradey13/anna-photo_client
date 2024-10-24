import {UseText} from "./type.ts";
import {useState} from "react";
import $api from "../../../app/config/axios.ts";


export const useCreateOrEditText = (props: UseText) => {
    const [newRuText, setNewRuText] = useState<string>('');
    const [newEnText, setNewEnText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const uploadText = async () => {
        try {
            setLoading(true);
            setError(null);


            if (newRuText && newEnText) {
                await $api.post(
                    `/text/create`,
                    {
                        key: props.key,
                        type: props.type,
                        ru: newRuText,
                        en: newEnText,
                    },
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    }
                );
            } else {
                throw new Error('Оба текста должны быть заполнены');
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Ошибка при загрузке текстов');
        } finally {
            setLoading(false);
        }
    };

    return { setNewRuText, setNewEnText, loading, error, uploadText };
};