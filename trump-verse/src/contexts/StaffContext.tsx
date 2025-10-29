import {useState, useEffect, createContext, FC, useContext} from 'react';
import IStaff from '../interfaces/IStaff';
import IProps from '../interfaces/IProps';
import StaffService from '../services/StaffService';

interface StaffContextProps {
    staffers: IStaff[];
    getStaffById: (id: number) => Promise<IStaff | null>;
    putStaff: (updatedStaff: IStaff) => Promise <IStaff | null>;
    deleteStaff: (id: number) => Promise<void>;
}

export const useStaff = () => {
    const context = useContext(StaffContext);
    if (!context){
        throw new Error('useStaff must be in a StaffProvider')
    }
    return context;
}

export const StaffContext = createContext<StaffContextProps | undefined>(undefined);

export const StaffProvider : FC<IProps> = ({children}) => {
    const [staffers, setStaff] = useState<IStaff[]>([]);

    useEffect(() => {
        getAndSetStaffFromService();
    }, []);

    const getAndSetStaffFromService = async () => {
        const staffFromService = await StaffService.getAll();
        setStaff(staffFromService);
    }

    const getStaffById = async (id: number) : Promise<IStaff | null> => {
        if (id != null && id != undefined && id.toString().length > 0){
            const staffFromService = await StaffService.getById(id);
            console.log(staffFromService);
            return staffFromService;
        }else{
            return null
        }
    }

    const putStaff = async (updatedStaff: IStaff) : Promise<IStaff | null> => {
        const result = await StaffService.putStaff(updatedStaff);
        if(result != null){
            getAndSetStaffFromService();
            return updatedStaff;
        }
        return null;
    }

    const deleteStaff = async (id: number) => {
        await StaffService.deleteStaff(id);
        getAndSetStaffFromService();
    }

    return(
        <StaffContext.Provider value={{staffers, getStaffById, putStaff, deleteStaff}}>
            {children}
        </StaffContext.Provider>
    )
};

export const useStaffContext = () => {
    const context = useContext(StaffContext);
    if (context === undefined){
        throw new Error('useStaffContext error')
    }
    return context;
};