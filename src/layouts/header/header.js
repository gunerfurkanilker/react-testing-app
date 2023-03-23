import './../../assets/css/header/header.css';
import { useLocation } from "react-router-dom"

function Header() {
    const location = useLocation();
    if(location.pathname !== '/login')
    return (
        <div className="i-header">
        <div className="i-header-account">

                <button type="button" className="btn btn-danger" >
                    Logout
                </button>


        </div>
        </div>
    );
    else
        return null;
}

export default Header;
