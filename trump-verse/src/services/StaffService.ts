import axios from 'axios';
import IStaff from '../interfaces/IStaff';
import Endpoints from './Endpoints';

const StaffService = (
    () => {
        const staffEndpoint =  Endpoints.getStaffEndpoint();

        const getAll = async () => {
            try {
            const result = await axios.get(staffEndpoint);
            return result.data;
            } catch (error) {
                console.error('getAll error', error);
                throw error;
            }
        }

        const getById = async (id: number): Promise<IStaff | null> => {
            try {
                const result = await axios.get(`${staffEndpoint}/${id}`);
                return result.data;
            } catch (error) {
                console.error('getById error', error);
                throw error;
            }
        }

        const postStaff = async (newStaffer: IStaff): Promise<IStaff> => {
            try {
                const result = await axios.post(staffEndpoint, newStaffer);
                console.log(result.data);
                return result.data;
            } catch (error) {
                console.error("postStaff error", error);
                throw error;
            }
        }

        const deleteStaff = async (id: number) => {
            try {
                const result = await axios.delete(`${staffEndpoint}/${id}`);
                console.log(result);
                return result.data;
            } catch (error) {
                console.error('deleteStaff error', error);
                throw error;
            }
        }

        const putStaff = async (changedStaff: IStaff): Promise<IStaff | null> => {
            try {
                const result = await axios.put(`${staffEndpoint}/${changedStaff.id}`, changedStaff, {headers: {'Content-Type': 'application/json'}});
                console.log(result);
                return result.data;
            } catch (error) {
                console.error('putStaff error', error);
                return null;
            }
        }

        return {getAll, getById, postStaff, deleteStaff, putStaff}
    
})();

export default StaffService;