import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { registerUser, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'


const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })
    const { name, email, password, password2 } = formData
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)
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
    }, [message, isError, isSuccess, user, dispatch, navigate])

    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error("Passwords do not match!")
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(registerUser(userData))
        }


    }

    if (isLoading) {
        return <Spinner />
    }
    return (

        <div className="hero sm:mt-0  py-20 bg-base-200">
            <motion.div
                initial={{
                    x: "-100%"
                }}
                animate={{
                    x: '0'
                }}
            >
                <div className="hero-content sm:mb-20 flex-col lg:flex-row-reverse gap-10">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Regiter Now!</h1>
                        <p className="py-6">Create an Account and Upload images on the cloud... Enjoy your Album:)</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                        <form onSubmit={handleSubmit} className="card-body space-y-0" >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="email"
                                    className="sm:input sm:input-bordered sm:input-sm  md:input-sm lg:input lg:input-md lg:input-bordered"
                                    required
                                    value={name}
                                    onChange={handleChange}
                                    id='name'
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    className="sm:input sm:input-bordered sm:input-sm  md:input-sm lg:input lg:input-md lg:input-bordered"
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
                                    className="sm:input sm:input-bordered sm:input-sm  md:input-sm lg:input lg:input-md lg:input-bordered"
                                    required
                                    value={password}
                                    onChange={handleChange}
                                    id='password'
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    className="sm:input sm:input-bordered sm:input-sm  md:input-sm lg:input lg:input-md lg:input-bordered"
                                    required
                                    value={password2}
                                    id='password2'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>

        </div>
    )
}

export default Register