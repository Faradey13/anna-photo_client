import cls from "./replaceImage.module.scss";
import Modal from "../../../widjets/Modal/modal.tsx";



interface ReplaceImageFormProps {
    isModalOpen: boolean,
    closeModal: () => void,
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleReplace: () => void
}

const ReplaceImageForm = (props: ReplaceImageFormProps) => {

    if(!props.isModalOpen)return null

    return (
        <Modal
            isOpen={props.isModalOpen}
            onClose={props.closeModal}
        >
            <div className={cls.modalInput}>
                <p className={cls.modalText}> Выберете изображение на замену</p>
                <input
                    type="file"
                    onChange={props.handleImageChange}
                />
                <button className={cls.modalButton} onClick={props.handleReplace}>Заменить</button>
            </div>
        </Modal>
    );
};

export default ReplaceImageForm;