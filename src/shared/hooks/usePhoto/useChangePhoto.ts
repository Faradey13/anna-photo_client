import React, {useState} from "react";
import $api from "../../../app/config/axios.ts";

interface changePhotoProps {
    selectedContent: string,
    closeModal: () => void
}


export const useChangePhoto = (props: changePhotoProps) => {
    const [imageToUpload, setImageToUpload] = useState<File | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setImageToUpload(file);

    }
    const handleReplace = async () => {
        if (!imageToUpload || !props.selectedContent) return;
        const formData = new FormData();
        formData.append('image', imageToUpload);
        formData.append('name_s', props.selectedContent);

        try {
            const data = await $api.post(`/photo/replace`, formData, {
                headers: {
                    'Accept': 'application/json',

                },
            });
           console.log(data)
            props.closeModal()
            window.location.reload();

        } catch (e) {
            console.log(e);
        }
    }
    return {handleImageChange, handleReplace}
}