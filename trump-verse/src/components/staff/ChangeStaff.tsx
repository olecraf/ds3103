import { ChangeEvent, FC, useContext, useState } from "react";
import { StaffContext } from "../../contexts/StaffContext";
import IStaffContext from "../../interfaces/IStaffContext";
import IStaff from "../../interfaces/IStaff";
import SmallStaffList from "./SmallStaffList";
import '../../main.css';

const ChangeStaff: FC = () => {
    const {getStaffById, putStaff, deleteStaff} = useContext(StaffContext) as IStaffContext;

    const [id, setId] = useState<number | string>('');
    const [selectedStaff, setSelectedStaff] = useState<IStaff | null>(null);
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number | undefined>(undefined);
    const [position, setPosition] = useState<string>('');
    const [criminalCharges, setCriminalCharges] = useState<string>('');
    const [convicted, setConvicted] = useState<boolean>(false);
    const [image, setImage] = useState<string>('');

    const [message, setMessage] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name){
            case "id":
                setId(e.target.value);
                break;
            case "name":
                setName(e.target.value);
                break;
            case "age":
                setAge(e.target.value ? parseInt(e.target.value) : undefined);
                break;
            case "position":
                setPosition(e.target.value);
                break;
            case "criminalCharges":
                setCriminalCharges(e.target.value);
                break;
            case "convicted":
                setConvicted(e.target.checked);
                break;
        }
    }

    const getByIdFromContext = async () => {
        if (id != null && id != undefined && id.toString().length > 0){
            const staffer = await getStaffById(parseInt(id.toString()));
            console.log(staffer);

            if(staffer != null){
                setSelectedStaff(staffer);
                setName(staffer.name);
                setAge(staffer.age ?? undefined);
                setPosition(staffer.position);
                setCriminalCharges(staffer.criminalCharges ?? '');
                setConvicted(staffer.convicted ?? false);
                setImage(staffer.image ?? '')
            }
        }
    }

    const updateStaffWithContext = async () => {
        const stafferToUpdate : IStaff = {
            name: name,
            age: age,
            position: position,
            criminalCharges: criminalCharges,
            convicted: convicted,
            image: image
        };
        const result = await putStaff(stafferToUpdate);

        if (isIStaff(result)){
            setMessage(true)
            setTimeout(()=>{
                setMessage(false);
            }, 5000);
            await getByIdFromContext();
        } else {
            setErrorMessage(true);
            setTimeout(
                ()=>{
                    setErrorMessage(false);
                }, 5000
            );
        }

    }

    function isIStaff(obj: any): obj is IStaff {
        return obj && typeof obj.id === 'number' && typeof obj.name === 'string' && typeof obj.age === 'number' && obj.position === 'string' && obj.criminalCharges === 'string' && obj.convicted === 'bool';
    }

    const deleteStafferWithContext = () => {
        deleteStaff(parseInt(id.toString()));
    }

    return (
        <section className="change-staff-form">
            <header>
                <h3 className="display-4">Edit staff</h3>
            </header>
            <section>
                {selectedStaff ? (
                    <div className="selected-staff">
                        <h4>Selected staffer</h4>
                        <p>ID: {selectedStaff.id}</p>
                        <p>Name: {selectedStaff.name}</p>
                        <p>Age: {selectedStaff.age}</p>
                        <p>Position: {selectedStaff.position}</p>
                        <p>Criminal charges: {selectedStaff.criminalCharges}</p>
                        <p>Convicted: {selectedStaff.convicted ? 'Yes' : 'No'}</p>
                    </div>
                ) : (
                    <h3 className="alert alert-primary d-flex align-items-center display-7">No staffer selected.</h3>
                )}
            </section>
            <section>
                <div className="mb-3">
                    <label>Enter ID</label>
                    <input className="form-label" name='id' type='number' value={id} onChange={handleChange} />
                    <button className="btn btn-primary btn-lg mx-3" onClick={getByIdFromContext}>Get staffer</button>
                </div>
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
                    <label className="form-label">Criminal charges </label>
                    <input className="form-control" name='criminalCharges' type='text' onChange={handleChange} value={criminalCharges} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Convicted <input type='checkbox' name='convicted' onChange={handleChange} checked={convicted}></input></label>
                </div>
                <button className="btn btn-primary btn-lg mx-3" onClick={updateStaffWithContext}>Update</button>
                <button className="btn btn-primary btn-lg mx-3" onClick={deleteStafferWithContext}>Delete</button>
            </section>
            <section>
                {
                    message ? <p>Staffer updated</p> : <></>
                }
                {
                    errorMessage ? <p>Something went wrong</p> : <></>
                }
            </section>
            <section>
                <SmallStaffList />
            </section>
        </section>
    )
}

export default ChangeStaff;