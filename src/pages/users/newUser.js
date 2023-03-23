/// login/index.js
import React from 'react';
import './../../assets/css/login/login.css';
import axios from "axios";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";

function NewUser() {

    let navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const saveUser = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/api/user",
            {
                "name": name,
                "username": username,
                "email": email,
                "password": password
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
            swal("Process Successful!", response.data.message, "success", {
                button: "Ok",
            }).then(() => {
                navigate('/user/' + response.data.data._id);
            });
        }).catch(error => {
            swal("Process Failed", error.response.data.message, "error", {
                button: "Ok",
            }).then(() => {

            });
        })
    }

    return <form onSubmit={saveUser} className="px-3">
        <h4 className="text-center pb-4">New User</h4>
        <hr/>
        <div className="form-outline mb-4">
            <label className="form-label">Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
            />

        </div>
        <div className="form-outline mb-4">
            <label className="form-label">Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
            />

        </div>
        <div className="form-outline mb-4">
            <label className="form-label">E-Mail</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
            />

        </div>
        <div className="form-outline mb-4">
            <label className="form-label">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
            />

        </div>
        <div className="w-100 text-end">
            <button type="submit" className="btn btn-primary btn-block mb-4">Save</button>
        </div>
    </form>


}

export default NewUser;