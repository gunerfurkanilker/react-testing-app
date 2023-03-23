/// login/index.js
import React from 'react';
import './../../assets/css/login/login.css';
import axios from "axios";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";

function NewProduct() {

    let navigate = useNavigate();
    const [productCode, setProductCode] = React.useState('');
    const [productName, setProductName] = React.useState('');
    const [productDescription, setProductDescription] = React.useState('');
    const [productAmount, setProductAmount] = React.useState('');

    const saveProduct = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/api/product",
            {
                "productName": productName,
                "productDescription": productDescription,
                "productCode": productCode,
                "productAmount": productAmount
            },{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
            swal("Process Successful!", response.data.message, "success", {
                button: "Ok",
            }).then(() => {
                navigate('/product/'+response.data.data._id);
            });
        }).catch(error => {
            swal("Process Failed", error.response.data.message, "error", {
                button: "Ok",
            }).then(() => {

            });
        })
    }

    return <form onSubmit={saveProduct} className="px-3">
        <h4 className="text-center pb-4">New Product</h4>
        <hr/>
        <div className="form-outline mb-4">
            <label className="form-label">Product Code</label>
            <input
                type="text"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                className="form-control"
            />
        </div>
        <div className="form-outline mb-4">
            <label className="form-label">Product Name</label>
            <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="form-control"
            />

        </div>
        <div className="form-outline mb-4">
            <label className="form-label">Product Description</label>
            <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="form-control"
            />

        </div>
        <div className="form-outline mb-4">
            <label className="form-label">Initial Stock Amount</label>
            <input
                type="number"
                min="0"
                value={productAmount}
                onChange={(e) => setProductAmount(e.target.value)}
                className="form-control"
            />

        </div>
        <div className="w-100 text-end">
            <button type="submit" className="btn btn-primary btn-block mb-4">Save</button>
        </div>
    </form>


}

export default NewProduct;