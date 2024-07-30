import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../store';
import { loadUser, logout } from '../action/userAction';
import { toast } from 'react-toastify';
import { Create, Dashboard, Logout, ShoppingCart, } from '@mui/icons-material';
import logo from "../images/logo.png"

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.user);

    const logoutUser = () => {
        dispatch(logout());
        toast.success("সফলভাবে আপনি logout হয়েছেন !")

    }

    useEffect(() => {
        store.dispatch(loadUser());
    }, [])


    const menuItem = [
        {
            id: 1,
            menu: <Link to="/">হোম</Link>
        },
        {
            id: 2,
            menu: <Link to="/products"> পণ্য </Link>
        },
        {
            id: 3,
            menu: <Link to="/contact">যোগাযোগ</Link>
        },
        {
            id: 4,
            menu: <>
                <div className="dropdown dropdown-end " style={{ zIndex: 99 }}>
                    <div tabIndex={0} className=" m-0">তথ্যকণিকা</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-secondary rounded-box w-52 top-10  hover:text-white">
                        <li><Link className='text-orange-500' to="/disease">Disease (রোগ)</Link></li>
                        <li><Link to="/cultivation">Cultivation (চাষাবাদ) </Link></li>
                        <li><Link to="/roofgarden">Roof Garden (ছাদ বাগান) </Link></li>
                        <li><Link to="/agriinformation">Agri Information (কৃষি তথ্য) </Link></li>
                        <li><Link to="/agriculture">Modern Agriculture (আধুনিক কৃষি) </Link></li>
                    </ul>
                </div>
            </>
        },
        {
            id: 5,
            menu: <Link to="/about"> আমাদের সম্পর্কে জানুন </Link>
        },
        {
            id: 6,
            menu: <Link to="/weather"> আবহাওয়া </Link>
        },
        {
            id: 7,
            menu: <Link to="/videoContent" className='text-white'> কৃষি স্কুল </Link>
        },

    ]
    return (
        <div className="navbar bg-primary border-b-2 border-white  hover:text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            menuItem.map((item) => (
                                <li key={item.id} className='text-white text-xl font-semibold'>{item?.menu}</li>
                            ))
                        }
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-4xl font-bold text-white flex justify-center items-center"> <img src={logo} alt="logo" className='w-14 h-14' /> Farming Assistant </Link>
            </div>
            <div className="navbar-center hidden lg:flex hover:text-white">
                <ul className="menu menu-horizontal px-1 hover:text-white">
                    {
                        menuItem.map((item) => (
                            <li key={item.id} className='text-white text-xl font-semibold  hover:text-orange-500'>{item?.menu}</li>
                        ))
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user && isAuthenticated === true ?
                        <>
                            <div className="dropdown dropdown-bottom dropdown-end" style={{ zIndex: 9999 }}>
                                <label tabIndex={0} className="btn m-2"> {user ? user?.name : 'Hi,user'} </label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-5 shadow bg-secondary rounded-box w-52 gap-12">
                                    <li><Link to="/cart" className=' hover:text-white'>< ShoppingCart /> Cart </Link></li>

                                    <li><Link to="/user/dashboard" className=' hover:text-white'>< Create /> Dashboard </Link></li>
                                    {
                                        user && isAuthenticated && user.role === "admin" && (
                                            <li>
                                                <Link to="/admin/dashboard" className=' hover:text-white'><Dashboard /> Admin Dashboard</Link>
                                            </li>
                                        )
                                    }
                                    <li> <button
                                        onClick={logoutUser}
                                        className='btn btn-primary flex justify-center items-center hover:text-white'
                                    ><Logout /> Logout </button> </li>
                                </ul>
                            </div>
                        </>
                        :
                        <Link to="/login" className="btn btn-secondary">Login</Link>

                }
            </div>
        </div>
    );
};

export default Navbar;