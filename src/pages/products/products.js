/// login/index.js
import React from 'react';
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom"

function Products() {
    let navigate = useNavigate();
    const [productList, setProductList] = React.useState(null);
    React.useEffect(() => {
       getProducts();
    },[])

    const navigateTo = (path,id) =>{
        navigate(path + id);
    }

    const getProducts = () => {
        axios.get("http://localhost:8080/api/product",
            {
               headers:{
                   "Authorization": "Bearer " + localStorage.getItem("token")
               }
            }).then(response => {
            setProductList(response.data.data);
        }).catch(error => {
            swal("Process Failed", error.response.data.message, "error", {
                button: "Ok",
            }).then(() => {

            });
        })
    }

    const deleteProduct = (productId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this iuser!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete("http://localhost:8080/api/product/" + productId,
                        {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        }).then(response => {

                        swal("Process Successful!", "Product Deleted", "success", {
                            button: "Ok",
                        }).then(async (response) => {
                            await getProducts()
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
        <h3>Product List</h3>
        <hr/>
        <div className="w-100 text-end">
            <a href="product/new" className="btn btn-sm btn-success mx-1 my-3">New Product</a>
        </div>
        <table className="table table-striped table-sm">
            <thead>
            <tr>
                <th scope="col">Product Code</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Description</th>
                <th className="text-center" scope="col">Edit</th>
            </tr>
            </thead>
            <tbody>
            {productList && productList.length > 0 ? productList.map((item) =>
                <tr key={item._id}>
                    <td>{item.productCode}</td>
                    <td>{item.productName}</td>
                    <td>{item.productDescription}</td>
                    <td className="text-center">
                        <button className="btn btn-sm btn-info mx-1" onClick={() => navigateTo("/product/", item._id)}>View</button>
                        <button className="btn btn-sm btn-danger mx-1" onClick={() => deleteProduct(item._id)}>Delete</button>
                    </td>
                </tr>
            ): <tr><td className="text-center" colSpan={4}>No Data Founded!</td></tr>}
            </tbody>
        </table>
    </div>


}

export default Products;