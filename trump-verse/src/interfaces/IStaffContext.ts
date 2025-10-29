import IStaff from './IStaff';

interface IStaffContext{
    staffers: IStaff[];
    getStaffById: (id: number) => Promise<IStaff | null>;
    putStaff: (updatedStaff: IStaff) => Promise<IStaff | null>;
    deleteStaff: (id: number) => void
}

export default IStaffContext;