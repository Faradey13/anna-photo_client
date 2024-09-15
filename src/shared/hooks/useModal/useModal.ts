import {useState} from "react";

interface contentObj {
    keyUniq: string;
    type: string
}

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState('');
    const [selectedContentObj, setSelectedContentObj] = useState<contentObj>({keyUniq: '', type: ''});
    const [isTextEditForm, setIsTextEditForm] =useState(false)
    const [isTextCreateForm, setIsTextCreateEditForm] =useState(false)
    const [isKey, setIsKey] = useState<boolean>(false);


    const openModal = (contentKey: string) => {
        setSelectedContent(contentKey);
        setIsModalOpen(true);
    };

    const openTextEditModal = (contentKey: string) => {
        setSelectedContent(contentKey);
        setIsTextEditForm(true)
    };

    const openTextCreateModal = (selectedContentObj: contentObj) => {
        setSelectedContentObj(selectedContentObj);
        setIsTextCreateEditForm(true)
        if(isKey) setIsKey(false)
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setIsTextCreateEditForm(false)
        setIsTextEditForm(false)
        setSelectedContent('');
    };
    return {isModalOpen, selectedContent, openModal, closeModal, openTextEditModal, openTextCreateModal, isTextCreateForm, isTextEditForm, selectedContentObj,isKey, setIsKey};
}