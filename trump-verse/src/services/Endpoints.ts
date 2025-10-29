const Endpoints = (() => {

    // Porten hvor lokal server ligger:
    const port = 5182;

    const imageUploadControllerEndpoint = `http://localhost:${port}/api/ImageUpload`;
    const staffImageEndpoint = `http://localhost:${port}/images/`;
    const staffEndpoint = `http://localhost:${port}/api/Staff`;

    const getStaffEndpoint = () => {
        return staffEndpoint;
    }

    const getImageEndpoint = () => {
        return staffImageEndpoint;
    }

    const getImageUploadControllerEndpoint = () => {
        return imageUploadControllerEndpoint;
    }

    return {
        getStaffEndpoint,
        getImageEndpoint,
        getImageUploadControllerEndpoint
    }}
)();

export default Endpoints;