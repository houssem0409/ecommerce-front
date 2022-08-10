import React from "react";
import { BrowserRouter,  Routes, Route} from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import App from "./App"
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute"
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Cart from "./core/Cart";
import Product from "./core/Product";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";

const Routee = () => {
  return (
    <BrowserRouter>

    <Routes>


         <Route path="/" element={<App/>} exact  />
         <Route path="/signin" element={<Signin/>}   />
          <Route path='/signup' element={<Signup/>}   />
          <Route path='/home' element={<Home/>}   />
          <Route path='/product/:productId' element={<Product/>}   />
          <Route path='/shop' element={<Shop/>}   />
          <Route path='/cart' element={<Cart/>}   />
          <Route path="/user/dashboard" element={ <PrivateRoute> <Dashboard /></PrivateRoute> }/>
          <Route path="/admin/products" element={ <AdminRoute> <ManageProducts /></AdminRoute> }/>
          <Route path="/admin/dashboard" element={ <AdminRoute> <AdminDashboard /></AdminRoute> }/>
          <Route path="/create/category" element={ <AdminRoute> <AddCategory /></AdminRoute> }/>
          <Route path="/create/product" element={ <AdminRoute> <AddProduct /></AdminRoute> }/>
          <Route path="/admin/product/update/:productId" element={ <AdminRoute> <UpdateProduct /></AdminRoute> }/>
          <Route path="/admin/orders" element={ <AdminRoute> <Orders /></AdminRoute> }/>
          <Route path="/profile/:userId" element={ <PrivateRoute> <Profile /></PrivateRoute> }/>

     </Routes>
     </BrowserRouter>
  );
}

export default Routee;
