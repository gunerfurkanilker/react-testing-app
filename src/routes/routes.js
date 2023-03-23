import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./../pages/login/login";

import Products from "./../pages/products/products";
import NewProduct from "./../pages/products/newProduct";
import Product from "./../pages/products/product";

import Users from "./../pages/users/users";
import NewUser from "./../pages/users/newUser";
import User from "./../pages/users/user";


const AppRoutes = () => {

    const isAuthenticated = localStorage.getItem("token");
    return (
        <Routes>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/users'} element={isAuthenticated ? <Users/> : <Navigate to="/login"/>}/>
            <Route path={"/products"} element={isAuthenticated ? <Products/> : <Navigate to="/login"/>}/>
            <Route path={"/product/new"} element={isAuthenticated ? <NewProduct/> : <Navigate to="/login"/>}/>
            <Route path={"/user/new"} element={isAuthenticated ? <NewUser/> : <Navigate to="/login"/>}/>
            <Route path={"/product/:productId"} element={isAuthenticated ? <Product/> : <Navigate to="/login"/>}/>
            <Route path={"/user/:userId"} element={isAuthenticated ? <User/> : <Navigate to="/login"/>}/>
        </Routes>


    );
};

export default AppRoutes;