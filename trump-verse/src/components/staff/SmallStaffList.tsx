import { useEffect, useState } from 'react';
import StaffService from '../../services/StaffService';
import IStaff from '../../interfaces/IStaff';
import 'bootstrap/dist/css/bootstrap.min.css';


const SmallStaffList: React.FC = () => {
    const [StaffList, setStaffList] = useState<IStaff[]>([]);
    
    useEffect(() => {
        const getStaff = async () => {
            try {
                const staff = await StaffService.getAll();
                setStaffList(staff);
            } catch (error) {
                console.log('getStaff failed', error)
            }
        };
        getStaff();
    }, []);

    return (
        <section>
            <h2 className="display-6">List of staffers</h2>
            <ul className="list-unstyled">
                {StaffList.map(staff => (
                    <li key={staff.id}>
                        {`${staff.id} - ${staff.name}`}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default SmallStaffList;