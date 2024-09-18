import {useEffect, useState} from "react";
import {UseText} from "./type.ts";
import $api from "../../../app/config/axios.ts";
import {AxiosResponse} from "axios";
import {useTranslation} from "react-i18next";



export interface CurrentText {
    id: number;
    key: string;
    titleText: string;
    content: [{ contentText: string, id: number, key: string; }]
}

interface useTextProps{
    currentLanguage?: string | null;
    type: string
}

export const useText = ({  type }: useTextProps) => {
    const [ruText, setRuText] = useState<UseText[]>([]);
    const [enText, setEnText] = useState<UseText[]>([]);
    const [currentText, setCurrentText] = useState<CurrentText[]>()
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);



    const {  i18n } = useTranslation();
    const currentLanguage = i18n.language;


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response: AxiosResponse<[UseText[], UseText[]]> = await $api.get(`/text/${type}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                });
                console.log('data', response.data)
                const [ru, en] = response.data;
                setRuText(ru);
                setEnText(en);
                setCurrentText(currentLanguage === 'ru' ? transformTextData(ru) : transformTextData(en));
            } catch (e) {
                setError('Ошибка при загрузке текстов');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);


    useEffect(() => {
        if (currentLanguage === 'ru') {
            setCurrentText(transformTextData(ruText));
        } else {
            setCurrentText(transformTextData(enText));
        }
    }, [currentLanguage, ruText, enText]);


    function transformTextData(data: {id: number, type: string, key: string, text: string }[]) {

        return data.reduce((acc: any[], item) => {
            const [sectionKey, field] = item.key.split('.');

            let section = acc.find(sec => sec.key === sectionKey);

            if (!section) {
                section = { id: null, key: sectionKey, titleText: '', content: [] };
                acc.push(section);
            }

            if (field === 'title') {
                section.id = item.id;
                section.titleText = item.text;
            } else if (field === 'content') {
                const contentItem = { id: item.id, key: item.key, contentText: item.text };

                if (item.type === 'service') {
                    section.content = [...section.content, contentItem];
                } else {
                    section.content = [contentItem];
                }
            }


            return acc;
        }, []);
    }
    const delFetching = async (id: number) => {
        try {
            setLoading(true);
            const response = await $api.delete('/text/delete', {
                data: { id },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (response.status >= 200 && response.status < 300) {
                console.log('Текст успешно удален');
            }
        } catch (e) {
            setError('Ошибка удаления текста');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const removeTextByType = async (type: string) => {
        try {
            setLoading(true);
            const response = await $api.delete('/text/deletetype', {
                data: { type },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            if (response.status >= 200 && response.status < 300) {
                console.log('Текст успешно удален');
            }
        } catch (e) {
            setError('Ошибка удаления текста');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const removeText = async (id: number) => {
        const firstLanguageText = currentLanguage === 'ru' ? ruText : enText;
        const otherLanguageText = currentLanguage === 'ru' ? enText : ruText;
        const item = firstLanguageText.find(item => item.id === id);
        if (!item) {
            console.error('Элемент не найден');
            return;
        }

        const [itemKey, typeKey] = item.key.split('.');

        const position = firstLanguageText.findIndex(item => item.id === id);
        const secondId = otherLanguageText[position].id
        console.log(secondId)
        if (typeKey === 'title') {
            const contentKey = `${itemKey}.content`;
            const ruContent = ruText.filter(item => item.key === contentKey);
            const enContent = enText.filter(item => item.key === contentKey);

            for (const contentItem of [...ruContent, ...enContent]) {
                await delFetching(contentItem.id);
            }
        }

        await delFetching(id);

        if (secondId) {
            await delFetching(secondId);
        }

        console.log('Удалено успешно');
        window.location.reload();
    };


    return { ruText, enText, loading, error, currentText, removeText, removeTextByType };
};