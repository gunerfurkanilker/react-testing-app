import './../../assets/css/sidebar/sidebar.css';
import { useLocation, useNavigate } from "react-router-dom"


function Sidebar() {
    let navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login")
    }
    const navigateTo = (path) =>{
        navigate(path);
    }
    if(location.pathname !== '/login')
        return (
            <div className="i-sidebar">
                <div className="i-sidebar-title">
                    <h5>Product App</h5>
                </div>
                <div className="i-sidebar-link">
                    <button onClick={() => navigateTo('/products')}>Products</button>
                    <button onClick={() => navigateTo('/users')}>Users</button>
                </div>
                <div className="i-sidebar-action">
                    <div  className="i-sidebar-action-item">
                        <button className='btn w-100 btn-block btn-danger' onClick={logout}>LOGOUT</button>
                    </div>
                </div>
            </div>
        )
    else
        return null
}

export default Sidebar;
