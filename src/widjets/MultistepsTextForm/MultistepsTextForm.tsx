import {FC, useState} from 'react';
import CreateTextForm from "../CreteTextForm/CreateTextForm.tsx";
import {useModal} from "../../shared/hooks/useModal/useModal.ts";
import MyButton from "../../shared/ui/MyButton/MyButton.tsx";


const MultiStepTextForm: FC = () => {
    const keysArray = ['individual', 'family', 'love', 'thematic', 'thing'];

    const [currentStep, setCurrentStep] = useState(0);
    const [currentFormType, setCurrentFormType] = useState('title'); // 'title' или 'content'
    const {openTextCreateModal, selectedContentObj, closeModal, isTextCreateForm} = useModal()



    const handleTextAdded = () => {
        if (currentFormType === 'title') {
            setCurrentFormType('content');
            openTextCreateModal({type: 'main', keyUniq: `${keysArray[currentStep]}.content`});
        } else {
            setCurrentFormType('title');
            setCurrentStep((prevStep) => prevStep + 1);

            if (currentStep + 1 < keysArray.length) {
                openTextCreateModal({type: 'main', keyUniq: `${keysArray[currentStep + 1]}.title`});
            }
        }
    };


    const open = () => {
        openTextCreateModal({type: 'main', keyUniq: `${keysArray[currentStep]}.title`})
    }




    if (currentStep >= keysArray.length) {
        return null;
    }


    return (
        <div>

            <MyButton onClick={open}>open</MyButton>
            <CreateTextForm
                title={`Добавь ${currentFormType ==='title' ? 'заголовок' : 'текст'} для блока ${keysArray[currentStep]}`}
                isModalOpen={isTextCreateForm}
                closeModal={closeModal}
                type={selectedContentObj.type}
                keyUniq={selectedContentObj.keyUniq}
                isKey={false}
                onTextAdded={handleTextAdded}
            />
        </div>
    );
};

export default MultiStepTextForm;