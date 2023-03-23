/// login/index.js
import React from 'react';
import axios from "axios";
import swal from "sweetalert";
import {useParams} from "react-router-dom";

function User() {
    const params = useParams();

    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    React.useEffect(() => {
        getUser().then(r => r);
    },[])


    const getUser = async () => {
        await axios.get("http://localhost:8080/api/user/" + params.userId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response);
            let productTemp = response.data.data;
            setUsername(productTemp.username);
            setName(productTemp.name);
            setEmail(productTemp.email);


        }).catch(error => {
            console.log(error)
        })
    }

    const saveUser = (event) => {
        event.preventDefault();
        console.log(username,email,name);
        axios.patch("http://localhost:8080/api/user/" + params.userId,
            {
                name: name,
                username: username,
                email: email,
                currentPassword: currentPassword,
                newPassword:  newPassword
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {

            swal("Process Successful!", response.data.message, "success", {
                button: "Ok",
            }).then(async (response) => {
                await getUser();
            });
        }).catch(error => {
            swal("Process Failed", error.response.data.message, "error", {
                button: "Ok",
            }).then(() => {

            });
        })
    }

    return <form onSubmit={saveUser} className="px-3">
        <h4 className="text-center pb-4">Edit User</h4>
        <hr/>
        <div className="form-outline mb-4">
            <label className="form-label">Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) =>setName(e.target.value)}
                className="form-control"
            />

        </div>
        <div className="form-outline mb-4">
            <label className="form-label">Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) =>setUsername(e.target.value)}
                className="form-control"
            />

        </div>
        <div className="form-outline mb-4">
            <label className="form-label">E-Mail</label>
            <input
                type="email"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
                className="form-control"
            />

        </div>
        <div className="form-outline mb-4">
            <label className="form-label">Current Password</label>
            <input
                type="password"
                value={currentPassword}
                onChange={(e) =>setCurrentPassword(e.target.value)}
                className="form-control"
            />

        </div>
        <div className="form-outline mb-4">
            <label className="form-label">New Password</label>
            <input
                type="password"
                value={newPassword}
                onChange={(e) =>setNewPassword(e.target.value)}
                className="form-control"
            />

        </div>
        <div className="w-100 text-end">
            <button type="submit" className="btn btn-primary btn-block mb-4">Save</button>
        </div>
    </form>


}

export default User;