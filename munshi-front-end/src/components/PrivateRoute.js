import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import { CheckLogin } from '../util';
import { Provider } from 'react-redux';

const ProtectedRoute = () => {
    
 return (
    CheckLogin() ? <Outlet/> : <Navigate to="/login" />
 )

};

export default ProtectedRoute;