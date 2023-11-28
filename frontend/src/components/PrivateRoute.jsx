import React from 'react'
import { useAuthStatus } from '../hooks/useAuthStatus'
import { Navigate, Outlet } from 'react-router-dom'
import Spinner from './Spinner'

const PrivateRoute = () => {
    const { loggedIn, checkingdStatus } = useAuthStatus()
    if (checkingdStatus) {
        return <Spinner />
    } else {
        return loggedIn ? <Outlet /> : <Navigate to={"/login"} />
    }

}

export default PrivateRoute