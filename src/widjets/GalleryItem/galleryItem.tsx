import cls from './gallery.module.scss';
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import ScrollTrigger from "gsap/ScrollTrigger";
import {useAuthStore} from "../../features/Auth/useAuthStore.ts";
import {usePhotoUpload} from "../../shared/hooks/usePhoto/usePhotoUpload.ts";
import {useModal} from "../../shared/hooks/useModal/useModal.ts";
import {IPhoto} from "../../shared/hooks/usePhoto/type.ts";
import $api, {API_URL} from "../../app/config/axios.ts";
import Modal from "../Modal/modal.tsx";
import ConfirmWindow from "../ConfirmWindow/ConfirmWindow.tsx";
import {useConfirmWindow} from "../../shared/hooks/useConfirmWindow.ts";
import gsap from "gsap";
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";


const GalleryItem = (category: string) => {
    const {photos, getRootProps, getInputProps, handleSubmit, uploadedPhoto, swapIndexesOnServer} = usePhotoUpload(category);
    const {isAuth} = useAuthStore(state => state);
    const {openModal, isModalOpen, closeModal} = useModal();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const isMobile = window.matchMedia("(max-width: 568px)").matches;
    const [loadedPhotos, setLoadedPhotos] = useState<IPhoto[]>([]);
    const [page, setPage] = useState(0);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const largeImage = useRef<HTMLImageElement | null>(null);
    const {isConfirmWindowOpen,openConfirmWindow,confirmFunction,title} = useConfirmWindow()
    if (!isMobile) {
        document.body.style.overflow = 'visible'
    }

    const changeImageWithAnimation = (direction: string) => {
        const timeline = gsap.timeline();

        if(isMobile) {
            timeline.to(largeImage.current, {
                duration: 0.3,
                x: direction === "right" ? 1500 : -1500,
                ease: "linear",
            });
        }
        if(!isMobile){
            timeline.to(largeImage.current, {
                duration: 0.5,
                x: direction === "right" ? 1500 : -1500,
                ease: "linear",
            });
        }


        setCurrentImageIndex((prevIndex) => {
            if (direction === "right") {
                return prevIndex === 0 ? loadedPhotos.length - 1 : prevIndex - 1;
            } else {
                return prevIndex === loadedPhotos.length - 1 ? 0 : prevIndex + 1;
            }
        });


        const img = largeImage.current;
        if (img) {

            gsap.set(img, { x: direction === "right" ? -1500 : 1500 });

            if(isMobile) {timeline.to(img, {
                duration: 0.3,
                x: 0,
                ease: "linear",
            }, "-=0.3");}
            if(!isMobile) {
                timeline.to(img, {
                    duration: 0.5,
                    x: 0,
                    ease: "linear",
                }, "-=0.5");
            }

        }
    };


    const photosPerRender = 8;


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
        }
    }, [photos, page, photosPerRender]);



    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMorePhotos();


            }
        });

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current);

        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();

            }
        };
    }, [loadMorePhotos]);


    const showPreviousImage = () => {
        changeImageWithAnimation('left');
    };

    const showNextImage = () => {
        changeImageWithAnimation('right');
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
        window.location.reload()
    }
    const handleOnDragEnd = async (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) return;

        const newImages = Array.from(loadedPhotos);


        const [movedImage] = newImages.splice(source.index, 1);
        newImages.splice(destination.index, 0, movedImage);


        const draggedItem = loadedPhotos[source.index];
        const targetItem = loadedPhotos[destination.index];
        await swapIndexesOnServer(draggedItem.order, targetItem.order);


        setLoadedPhotos(newImages);
    };


    return (
        <div style={isMobile && isModalOpen ? {pointerEvents: 'none'} : {}} className={cls.galleryWrapper}>
            <div ref={headerRef}>
                {isConfirmWindowOpen && <ConfirmWindow
                    isOpenConfirmWindow={isConfirmWindowOpen}
                    title={title}
                    onConfirm={confirmFunction}
                />}

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable  droppableId="photos">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={cls.gallery}
                            >
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

                                    isAuth ? (
                                        <Draggable key={photo.id} draggableId={photo.id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    className={cls.imageContainer}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
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
                                                            onClick={() => {
                                                                openConfirmWindow(
                                                                    () => deleteImage(photo.name_s, photo.type),
                                                                    'Удалить изображение?'
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    ) : (

                                        <div className={cls.imageContainer} key={photo.id}>
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
                                                    onClick={() => {
                                                        openConfirmWindow(
                                                            () => deleteImage(photo.name_s, photo.type),
                                                            'Удалить изображение?'
                                                        );
                                                    }}
                                                />
                                            )}
                                        </div>
                                    )
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {!isMobile && isModalOpen && (
                    <Modal isOpen={isModalOpen} onClose={closeModal} onLeftClick={showPreviousImage}
                           onRightClick={showNextImage}>
                        <img ref={largeImage} src={`${API_URL}${loadedPhotos[currentImageIndex].path_l}`} alt=""
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
                        <img ref={largeImage}  src={`${API_URL}${loadedPhotos[currentImageIndex].path_s}`} alt=""
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