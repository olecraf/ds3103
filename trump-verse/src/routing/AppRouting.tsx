import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage, AddStaffPage, ViewStaffPage, ChangeStaffPage } from '../pages';
import MainNavigation from '../components/shared/MainNavigation'

const AppRouting = () => {
    return (
        <>
            <BrowserRouter>
                <MainNavigation/>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='add-staff' element={<AddStaffPage/>}></Route>
                    <Route path='view-staff' element={<ViewStaffPage/>}></Route>
                    <Route path='change-staff' element={<ChangeStaffPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouting;