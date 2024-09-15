import {useEffect, useState} from "react";
import {IPhoto} from "./type.ts";
import {AxiosResponse} from "axios";
import {useDropzone} from "react-dropzone";
import $api from "../../../app/config/axios.ts";


export const usePhotoUpload = (type: string) => {



    const [photos, setPhoto] = useState<IPhoto[]>([]);
    const [uploadedPhoto, setUploadedPhoto] = useState<File[]>([]);
    const [error, setError] = useState();



    const fetchData = async () => {
        try {
            const response: AxiosResponse<IPhoto[]> = await $api.get(`/photo/${type}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            setPhoto(response.data);
        } catch (err: any) {
            setError(err.message || 'Ошибка при загрузке данных');
        }
    };


    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            fetchData();
        }
        return () => {
            isMounted = false;
        };
    }, [type]);


    const {getInputProps, getRootProps} = useDropzone({
        maxFiles: 200,
        onDrop: (acceptedFiles: File[]) => {
            console.log('acceptedFiles', acceptedFiles);
            setUploadedPhoto(acceptedFiles)
            console.log(uploadedPhoto)


        }
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        uploadedPhoto.forEach((photo) => formData.append('files', photo));

        try {

            await $api.post(`/photo/upload/${type}`, formData, {

                headers: {
                    'Accept': 'application/json',


                },
            })

            setUploadedPhoto([])
            fetchData()

        } catch (e){
            console.log(e)
        }


    }


    return {photos, error, setPhoto, getInputProps, getRootProps, handleSubmit, uploadedPhoto}
}