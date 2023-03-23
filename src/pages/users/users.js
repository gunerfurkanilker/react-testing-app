/// login/index.js
import React from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function Users() {
    let navigate = useNavigate();
    const [userList, setUserList] = React.useState(null);

    React.useEffect(() => {
        getUsers();
    },[])

    const navigateTo = (path,id) =>{
        navigate(path + id);
    }

    const getUsers = () => {
        axios.get("http://localhost:8080/api/user",
            {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
            setUserList(response.data.data);
        }).catch(error => {
            swal("Process Failed", error.response.data.message, "error", {
                button: "Ok",
            }).then(() => {

            });
        })
    }

    const deleteUser = (userId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this iuser!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete("http://localhost:8080/api/user/" + userId,
                        {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        }).then(response => {

                        swal("Process Successful!", "User Deleted", "success", {
                            button: "Ok",
                        }).then(async (response) => {
                            await getUsers()
                        });
                    }).catch(error => {
                        swal("Process Failed", error.response.data.message, "error", {
                            button: "Ok",
                        }).then(() => {

                        });
                    })
                }
            });
    }

    return <div>
        <h3>User List</h3>
        <hr/>
        <div className="w-100 text-end">
            <a href="user/new" className="btn btn-sm btn-success mx-1 my-3">New User</a>
        </div>
        <table className="table table-striped table-sm">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">E-Mail</th>
                <th className="text-center" scope="col">Edit</th>
            </tr>
            </thead>
            <tbody>
            {userList && userList.length > 0 ? userList.map((item) =>
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td className="text-center">
                        <button className="btn btn-sm btn-info mx-1" onClick={() => navigateTo("/user/", item._id)}>View</button>
                        <button className="btn btn-sm btn-danger mx-1" onClick={() => deleteUser(item._id)}>Delete</button>
                    </td>
                </tr>
            ): <tr><td className="text-center" colSpan={4}>No Data Founded!</td></tr>}
            </tbody>
        </table>
    </div>


}

export default Users;