import {ChangeEvent, useState} from 'react';
import IStaff from '../../interfaces/IStaff';
import ImageUploadService from '../../services/ImageUploadService';
import StaffService from '../../services/StaffService';

const AddStaff = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState<number | undefined>(undefined);
    const [position, setPosition] = useState('');
    const [criminalCharges, setCriminalCharges] = useState('');
    const [convicted, setConvicted] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name){
            case 'name':
                setName(e.target.value);
                break;
            case 'age':
                setAge(e.target.value ? parseInt(e.target.value) : undefined);
                break;
            case 'position':
                setPosition(e.target.value);
                break;
            case 'criminalCharges':
                setCriminalCharges(e.target.value);
                break;
            case 'convicted':
                setConvicted(e.target.checked);
                break;
            case 'image':
                if(e.target.files && e.target.files.length > 0){
                    setImage(e.target.files[0]);
                }
                break;
            default:
                break;
        }
    };

    const addStaff = async () => {
        if (!name || !position){
            setMessage('Name and position are required fields.');
            return;
        };

        let imageUrl;
        if (image != null) {
            try {
                imageUrl = await ImageUploadService.uploadImage(image);
                console.log('Image uploaded successfully', imageUrl);
            } catch (error) {
                console.error('Error uploading image', error);
                setMessage('Error uploading image');
                return;
            }
        }
        const newStaffer: IStaff = {
            name,
            age,
            position,
            criminalCharges,
            convicted,
            image: imageUrl
        }

        try {
            const response = await StaffService.postStaff(newStaffer);
            console.log('Staffer added', response);
            setMessage('Staffer added');
            clearForm();
        } catch (error) {
            console.error('addStaff error', error);
            setMessage('Error adding staffer');
        }
    };

    const clearForm = () => {
        setName('');
        setAge(undefined);
        setPosition('');
        setCriminalCharges('');
        setConvicted(false);
        setImage(null);
    };

    return(
        <section className="add-staffer-form">
            <header>
                <h1 className="display-4">Add new staffer</h1>
            </header>
            <section>
                {message && <p>{message}</p>}
                <div className="mb-3">
                    <label className="form-label">Name (required) </label>
                    <input className="form-control" name='name' type='text' onChange={handleChange} value={name} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age </label>
                    <input className="form-control" name='age' type='number' onChange={handleChange} value={age} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Position (required) </label>
                    <input className="form-control" name='position' type="text" onChange={handleChange} value={position} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Criminal charges</label>
                    <input className="form-control" name='criminalCharges' type='text' onChange={handleChange} value={criminalCharges} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Convicted <input type='checkbox' name='convicted' onChange={handleChange} checked={convicted}></input></label>
                </div>
                <div className="mb-3">
                    <label className="form-label">Image </label>
                    <input className="form-control" name='image' type='file' onChange={handleChange}></input>
                </div>
                <button className="btn btn-primary btn-lg mx-3" onClick={addStaff}>Register staffer</button>
                <button className="btn btn-primary btn-lg mx-3" onClick={clearForm}>Clear form</button>
            </section>
        </section>
    )

};

export default AddStaff;