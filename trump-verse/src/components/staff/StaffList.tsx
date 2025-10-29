import {useContext} from 'react';
import {StaffContext} from '../../contexts/StaffContext';
import IStaffContext from '../../interfaces/IStaffContext';
import StaffItem from './StaffItem';

const StaffList = () => {
    const {staffers} = useContext(StaffContext) as IStaffContext;

    const createAndGetStaffJSX = () => {
        const staffJSX = staffers.map((staffer, index) => {
            return(
                <StaffItem
                    key={'staffer' + index}
                    id={staffer.id}
                    age={staffer.age}
                    name={staffer.name}
                    position={staffer.position}
                    criminalCharges={staffer.criminalCharges}
                    convicted={staffer.convicted}
                    image={staffer.image}
                />
            )
        });
        return staffJSX;
    }
    
    return (
        <section className="staff-list">
            {createAndGetStaffJSX()}
        </section>
    )
}

export default StaffList;