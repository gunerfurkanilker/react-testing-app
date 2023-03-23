/// login/index.js
import React from 'react';
import './../../assets/css/login/login.css';
import axios from "axios";
import swal from 'sweetalert';
import {useNavigate} from "react-router-dom";


function Login() {
    let navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const submitForm = (event) => {
        axios.post("http://localhost:8080/api/login",
            {
                username,
                password
            }).then(response => {
            localStorage.setItem("token", response.data.data)
            navigate('/products');
        }).catch(error => {
            swal("Login Failed", error.response.data.message, "error", {
                button: "Ok",
            }).then(() => {

            });
        })
        event.preventDefault();
    }

    return <form className="i-login-container" onSubmit={submitForm}>
        <h1 className="text-center pb-4">Product App</h1>
        <div className="form-outline mb-4">
            <label className="form-label">Username or E-Mail</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
            />

        </div>
        <div className="form-outline mb-4">
            <label className="form-label">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword((e.target.value))}
                className="form-control"
            />

        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4 float-end">Sign in</button>
    </form>

}

export default Login;