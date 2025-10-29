import {useState, ChangeEvent} from 'react';
import ImageUploadService from '../../services/ImageUploadService';

const UploadStaffImage = () => {
    const [image, setImage] = useState<File | null>(null);

    const setImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {files} = event.target;
        if (files != null){
            const file = files[0];
            setImage(file);
        }
    }

    const uploadImage = () => {
        if(image != null){
            ImageUploadService.uploadImage(image);
        }
    }

    return (
        <section>
            <h3>Upload image</h3>
            <label>Image</label>
            <input onChange={setImageHandler} type='file' />
            <input onClick={uploadImage} type='button' value='Upload image' />
        </section>
    )
}

export default UploadStaffImage;