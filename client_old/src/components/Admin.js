import React, { useEffect, useState } from 'react'
import { auth } from "../firebase.mjs";
import axios from 'axios';
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AdminDashboard from '../Admin/AdminDashboard';
import { Blocks } from 'react-loader-spinner';

const Admin = () => {
    const data = useLocation()
    console.log(data, "deepak")
    const admindata = data.state.user




    return (
        <div >
             <AdminDashboard adminData={admindata} />
        </div>
    )
}

export default Admin