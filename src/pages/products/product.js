/// login/index.js
import React from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";

function Product() {
    const params = useParams();
    const [render, setRender] = React.useState(false);
    const [product, setProduct] = React.useState({});
    const [productTransferList, setProductTransferList] = React.useState({});
    const [productCode, setProductCode] = React.useState('');
    const [productName, setProductName] = React.useState('');
    const [productDescription, setProductDescription] = React.useState('');
    const [importAmount, setImportAmount] = React.useState(0);
    const [exportAmount, setExportAmount] = React.useState(0);
    React.useEffect(() => {

        getProduct().then(r => r);
        getProductTransferList().then(r => r);

    },[])
    React.useEffect(() => {



    }, [product])
    const updateProduct = (event) => {
        event.preventDefault();
        axios.patch("http://localhost:8080/api/product/" + params.productId,
            {
                "productName": productName,
                "productDescription": productDescription,
                "productCode": productCode
            },{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
            swal("Process Successful!", response.data.message, "success", {
                button: "Ok",
            }).then(async () => {
                await getProduct();
                await getProductTransferList();

            });
        }).catch(error => {
            swal("Process Failed", error.response.data.message, "error", {
                button: "Ok",
            }).then(() => {

            });
        })

    }
    const getProduct = async () => {
        await axios.get("http://localhost:8080/api/product/" + params.productId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => {
            let productTemp = response.data.data;
            setProduct(productTemp);
            setProductCode(productTemp.productCode);
            setProductName(productTemp.productName);
            setProductDescription(productTemp.productDescription);


        }).catch(error => {
            swal("Process Failed", error.response.data.message, "error", {
                button: "Ok",
            }).then(() => {

            });
        })
        setRender(true);
    }

    const getProductTransferList = async () => {

        await axios.get("http://localhost:8080/api/product-transfer/" + params.productId,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
            setProductTransferList(response.data.data)
        }).catch(error => {
            swal("Process Failed", error.response.data.message, "error", {
                button: "Ok",
            }).then(() => {

            });
        })
    }

    const importExportProduct = (type) => {
        swal({
            title: 'Import Process',
            text: 'Please enter a description',
            content: "input",
        })
            .then((description) => {
                if (description === "")
                    swal({
                        title: 'Enter a description',
                        text: 'Description cannot be blank',
                        icon: 'error'
                    });
                else {
                    axios.post("http://localhost:8080/api/product-transfer/" + params.productId,
                        {
                            "transferDescription": description,
                            "transferAmount": type === 'Import' ? parseInt(importAmount) : parseInt(exportAmount),
                            "transferType": type
                        }, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        }).then(response => {
                        swal("Process Successful!", response.data.message, "success", {
                            button: "Ok",
                        }).then(async () => {
                            await getProduct();
                            await getProductTransferList();

                        });
                    }).catch(error => {
                        swal("Process Failed!", error.response.data.message, "error", {
                            button: "Ok",
                        }).then(() => {

                        });
                    })
                }
            });

    }

    if (render)
        return <div>
            <h3>{product.productName} - {product.productCode}</h3>
            <hr/>
            <div className="text-end w-100 my-3">
                <label htmlFor=""><b>Import Amount :</b></label>
                <input className="ms-1" type="number" value={importAmount} min="0"
                       onChange={e => setImportAmount(e.target.value)}/>
                <button className="btn btn-success mx-1" onClick={() => importExportProduct('Import')}>Import</button>
                <label htmlFor=""><b>Export Amount :</b></label>
                <input className="ms-1" type="number" value={exportAmount} min="0"
                       onChange={e => setExportAmount(e.target.value)}/>
                <button className="btn btn-danger mx-1" onClick={() => importExportProduct('Export')}>Export</button>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        aria-expanded="false" aria-controls="collapseExample">
                    Edit
                </button>
            </div>
            <div className="collapse" id="collapseExample">
                <form onSubmit={updateProduct} className="px-3">
                    <h4 className="text-center pb-4">Edit Product</h4>
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
                    <div className="w-100 text-end">
                        <button type="submit"  className="btn btn-primary btn-block mb-4">Save</button>
                    </div>
                </form>
            </div>
            <ul className="list-group">
                <li className="list-group-item"><b>Ürün Adı :</b> {product.productName}</li>
                <li className="list-group-item"><b>Ürün Kodu :</b> {product.productCode}</li>
                <li className="list-group-item"><b>Ürün Açıklama :</b> {product.productDescription}
                </li>
                <li className="list-group-item"><b>Stok Adedi :</b> {product.productAmount}</li>
            </ul>

            <h3 className="mt-3">Transfer Summary</h3>
            <hr/>

            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th scope="col">Transfer Type</th>
                    <th scope="col">Transfer Amount</th>
                    <th scope="col">Transfer Description</th>
                </tr>
                </thead>
                <tbody>
                {productTransferList && productTransferList.length > 0 ? productTransferList.map((item) =>
                    <tr key={item._id}>
                        <td>{item.transferType}</td>
                        <td>{item.transferAmount}</td>
                        <td>{item.transferDescription}</td>
                    </tr>
                ) : <tr>
                    <td className="text-center" colSpan={4}>No Data Founded!</td>
                </tr>}
                </tbody>
            </table>

        </div>

    else
        return null;


}

export default Product;