import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
const Home = () => {
    return (
        <motion.div
            initial={{
                y: "-100%"
            }}
            animate={{
                y: '0'
            }}
            className='h-full mt-20 '
        >
            <div className="hero   bg-base-200  border-black">
                <div className="hero-content text-center">
                    <div className="max-w-md flex flex-col justify-between space-y-20">
                        <h1 className="text-5xl font-bold">Welcome to Image Gallery Application</h1>
                        <p className="py-6">
                            This Application create based on MERN technology. User can come to the app and create an account, or if they already have an account and start to work with it.
                            Users can upload images inside the application and thorugh their dashboard they can view all their images in the form of an album.
                            I hope enjoy it...
                        </p>
                        <div className='flex flex-col space-y-2'>

                            <Link className="btn  w-full flex btn-primary" to={"/images"}>
                                View Gallery
                            </Link>

                            <Link className="btn flex w-full btn-primary" to={"/upload-image"}>
                                Upload Image
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

    )
}

export default Home