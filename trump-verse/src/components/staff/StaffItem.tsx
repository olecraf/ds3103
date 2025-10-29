import {FC} from 'react';
import IStaff from '../../interfaces/IStaff';
import Endpoints from '../../services/Endpoints';
import '../../main.css';

const defaultImage = `${Endpoints.getImageEndpoint()}${'default.jpg'}`

const StaffItem : FC<IStaff> = ({name, age, position, criminalCharges, convicted, image}) => {
    const imageUrl = image? `${Endpoints.getImageEndpoint()}${image}` : defaultImage;
    return (
        <article className="card">
            <header className="item-top">
            <h3 className="card-title">{name}</h3>
            <img className="card-img-top" src={imageUrl} alt={name} />
            <p className="card-subtitle text-center">{position}</p>
            </header>
            <section className="card-body">
            <p className="card-text">Age: {age || 'unknown'}</p>
            <p className="card-text">Charges: {criminalCharges || 'No charges'}</p>
            <p className="card-text">Convicted: {convicted ? 'Yes' : 'Not yet'}</p>
            </section>
        </article>
    )
}

export default StaffItem;