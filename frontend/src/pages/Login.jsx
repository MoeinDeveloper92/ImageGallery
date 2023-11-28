import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, reset } from '../features/auth/authSlice'
import { toast } from "react-toastify"
import Spinner from '../components/Spinner'
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const { email, password, } = formData
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate("/")
            dispatch(reset())
        }

        dispatch(reset())
    }, [isError, isSuccess, message, user, dispatch, navigate])

    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser({ email, password }))
    }

    if (isLoading) {
        return <Spinner />
    }
    return (

        <div className="hero mt-20 bg-base-200">
            <motion.div
                initial={{
                    x: "-100%"
                }}
                animate={{
                    x: '0'
                }}
            >
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login Now!</h1>
                        <p className="py-6">Get into you account and upload image as well as review you album and remenisce about the past:)</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                        <form onSubmit={handleSubmit} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                    value={email}
                                    onChange={handleChange}
                                    id='email'
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered"
                                    required
                                    value={password}
                                    onChange={handleChange}
                                    id='password'
                                />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>

        </div>
    )
}

export default Login