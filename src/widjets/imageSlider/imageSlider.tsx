import {useEffect, useState} from 'react';
import Modal from "../Modal/modal.tsx";
import {API_URL} from "../../app/config/axios.ts";
import cls from './imageSlider.module.scss'

interface ImageSliderProps {
    loadedPhotos: { path_l: string }[];
    isModalOpen: boolean;
    closeModal: () => void;
    currentIndex: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ loadedPhotos, isModalOpen, closeModal, currentIndex }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(currentIndex);
    const [preloadedImages, setPreloadedImages] = useState<string[]>([]);

    useEffect(() => {
        if (isModalOpen) {
            preloadImages(currentIndex);
        }
    }, [currentIndex, isModalOpen]);

    // Предзагрузка трёх изображений (предыдущее, текущее, следующее)
    const preloadImages = (index: number) => {
        const prevIndex = index === 0 ? loadedPhotos.length - 1 : index - 1;
        const nextIndex = (index + 1) % loadedPhotos.length;

        setPreloadedImages([
            `${API_URL}${loadedPhotos[prevIndex].path_l}`,
            `${API_URL}${loadedPhotos[index].path_l}`,
            `${API_URL}${loadedPhotos[nextIndex].path_l}`,
        ]);
    };

    const changeImage = (direction: 'left' | 'right') => {
        const newIndex =
            direction === 'right'
                ? (currentImageIndex + 1) % loadedPhotos.length
                : currentImageIndex === 0
                    ? loadedPhotos.length - 1
                    : currentImageIndex - 1;

        setCurrentImageIndex(newIndex);
        preloadImages(newIndex);
    };

    return (
        <>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onLeftClick={() => changeImage('left')}
                    onRightClick={() => changeImage('right')}
                >
                    <div className={cls.slider}>
                        <div className={cls.imageWrapper}>
                            <img src={preloadedImages[0]} alt="Previous" className={cls.prevImage} />
                            <img src={preloadedImages[1]} alt="Current" className={cls.currentImage} />
                            <img src={preloadedImages[2]} alt="Next" className={cls.nextImage} />
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ImageSlider;