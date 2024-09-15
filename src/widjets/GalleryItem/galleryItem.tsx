import cls from './gallery.module.scss';
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import ScrollTrigger from "gsap/ScrollTrigger";
import {useAuthStore} from "../../features/Auth/useAuthStore.ts";
import {usePhotoUpload} from "../../shared/hooks/usePhoto/usePhotoUpload.ts";
import {useModal} from "../../shared/hooks/useModal/useModal.ts";
import {IPhoto} from "../../shared/hooks/usePhoto/type.ts";
import $api, {API_URL} from "../../app/config/axios.ts";
import Modal from "../Modal/modal.tsx";

const GalleryItem = (category: string) => {
    const {photos, getRootProps, getInputProps, handleSubmit, uploadedPhoto} = usePhotoUpload(category);
    const {isAuth} = useAuthStore(state => state);
    const {openModal, isModalOpen, closeModal} = useModal();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const isMobile = window.matchMedia("(max-width: 568px)").matches;
    const [loadedPhotos, setLoadedPhotos] = useState<IPhoto[]>([]);
    const [page, setPage] = useState(0);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    if (!isMobile) {
        document.body.style.overflow = 'visible'
    }



    const photosPerRender = 6;


    const headerRef = useRef(null);

    useLayoutEffect(() => {

        ScrollTrigger.refresh();
    }, [])

    const loadMorePhotos = useCallback(() => {

        const startIdx = page * photosPerRender;
        const endIdx = Math.min((page + 1) * photosPerRender, photos.length);


        const newPhotos = photos.slice(startIdx, endIdx);


        if (newPhotos.length > 0) {

            setLoadedPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);



            setPage((prevPage) => prevPage + 1);
        } else {
            console.log("No more photos to load");
        }
    }, [photos, page, photosPerRender]);




    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                console.log('Intersecting');

                loadMorePhotos();


            }
        });

        if (loadMoreRef.current) {
            console.log('more ref');
            observerRef.current.observe(loadMoreRef.current);

        }

        return () => {
            if (observerRef.current) {
                console.log('disconnected');
                observerRef.current.disconnect();

            }
        };
    }, [loadMorePhotos]);


    const showPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? loadedPhotos.length - 1 : prevIndex - 1));
    };

    const showNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === loadedPhotos.length - 1 ? 0 : prevIndex + 1));
    };

    const deleteImage = async (name_s: string, type: string) => {

        await $api.delete(`/photo/delete/${name_s}`,
            {
                data: JSON.stringify({type: type}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },

            });
        const filteredPhotos = loadedPhotos.filter(photo => photo.name_s !== name_s);
        setLoadedPhotos(filteredPhotos)
    }



    return (
        <div style={isMobile && isModalOpen ? {pointerEvents: 'none'} : {}} className={cls.galleryWrapper}>
            <div ref={headerRef} className={cls.gallery}>
                {isAuth && <form className={cls.dropzone} onSubmit={handleSubmit}>
                    <div className={cls.dropzoneContent} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className={cls.dropzoneText}>Перетащите изображения в эту зону, в конце названия
                            изображения
                            дожно быть либо _s для маленького изображаения либо _l для для версии этого же
                            изображения с
                            высоким разрешением</p>
                        <div className={cls.dropzoneCounter}>Добавлено {uploadedPhoto.length} изображений</div>

                    </div>
                    <button className={cls.dropzoneButton} type="submit">Загрузить</button>

                </form>}

                {loadedPhotos.map((photo, index) => (
                    <div style={isMobile && isModalOpen ? {pointerEvents: 'none'} : {}} key={photo.id} className={cls.imageContainer}>
                        <img
                            src={`${API_URL}${photo.path_s}`}
                            alt=""
                            className={cls.imageItem}
                            onClick={() => {
                                openModal('');
                                setCurrentImageIndex(index);
                            }}
                        />
                        {isAuth && (
                            <img
                                className={cls.bin}
                                src="src/shared/assets/images/icons/bin.svg"
                                alt="bin"
                                onClick={async () => {
                                    await deleteImage(photo.name_s, photo.type)
                                }}

                            />
                        )}
                    </div>

                ))}
                {!isMobile && isModalOpen && (
                    <Modal isOpen={isModalOpen} onClose={closeModal} onLeftClick={showPreviousImage}
                           onRightClick={showNextImage}>
                        <img src={`${API_URL}${loadedPhotos[currentImageIndex].path_l}`} alt=""
                             className={cls.fullscreenImage}/>
                    </Modal>
                )}
                {isMobile && isModalOpen && (
                    <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onLeftClick={showPreviousImage}
                        onRightClick={showNextImage}
                    >
                        <img  src={`${API_URL}${loadedPhotos[currentImageIndex].path_l}`} alt=""
                             className={cls.fullscreenImage}/>
                    </Modal>
                )
                }
            </div>
            <div className={cls.intersec} ref={loadMoreRef}></div>
        </div>

    );
};

export default GalleryItem;