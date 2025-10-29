import { Link } from 'react-router-dom';

const MainNavigation = () => {
    return (
        <nav>
            <ul className="nav-bar">
                <li className="nav-bar-item"><Link to='/'>Home</Link></li>
                <li className="nav-bar-item"><Link to='add-staff'>Add staff</Link></li>
                <li className="nav-bar-item"><Link to='view-staff'>View staff</Link></li>
                <li className="nav-bar-item"><Link to='change-staff'>Change staff</Link></li>
            </ul>
        </nav>
    )
}

export default MainNavigation;