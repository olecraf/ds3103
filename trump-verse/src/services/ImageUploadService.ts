import axios from 'axios';
import Endpoints from './Endpoints';

const ImageUploadService = (
    () => {
        const endpoint = Endpoints.getImageUploadControllerEndpoint();

        const uploadImage = async (image: File): Promise<string> => {
            const formData = new FormData();
            formData.append("file", image);

            const result = await axios({
                url: endpoint,
                method: 'POST',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });

            return result.data.url;
        }

        return {
            uploadImage
        }
    }
)();

export default ImageUploadService;