import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FaRegImage, FaSignOutAlt, FaSignInAlt, FaUser } from "react-icons/fa"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'


const Navbar = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onLogout = () => {
        dispatch(logout())
        navigate("/")
    }
    return (
        <div className="drawer z-20 sticky left-0 top-0">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                <div className="w-full navbar bg-base-300">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 flex items-center space-x-4 ">
                        <FaRegImage />
                        <span className='font-bold cursor-pointer'>
                            <Link to={"/"}>Image gallery</Link>
                        </span>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal space-x-3">
                            {/* Navbar menu content here */}
                            {user ? (<>
                                <li>

                                    <button onClick={onLogout} className='inline space-x-2'>
                                        <FaSignOutAlt className='inline mr-1' />Logout
                                    </button>

                                </li>
                            </>) : (<>
                                <li>
                                    <Link to={"/register"}>
                                        <FaUser />Register
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/login"}>
                                        <FaSignInAlt />Login
                                    </Link>
                                </li>
                            </>)}
                        </ul>
                    </div>
                </div>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 space-y-3">
                    {/* Sidebar content here */}
                    {user ? (<>
                        <li>
                            <li>
                                <button onClick={onLogout} className='inline space-x-2'>
                                    <FaSignOutAlt className='inline mr-1' />Logout
                                </button>
                            </li>
                        </li>
                    </>) : (<>
                        <li>
                            <Link className='font-bold' to={"/register"}>
                                <FaUser />Register
                            </Link>
                        </li>
                        <li>
                            <Link className="font-bold" to={"/login"}>
                                <FaSignInAlt />Login
                            </Link>
                        </li>
                    </>)}
                </ul>
            </div>
        </div>
    )
}

export default Navbar