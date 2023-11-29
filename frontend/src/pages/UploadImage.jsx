import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { uploadImage, reset } from '../features/image/imageSlice'
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Spinner from '../components/Spinner'

const UploadImage = () => {

    const { user } = useSelector((state) => state.auth)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [image, setImage] = useState()
    const [label, setLable] = useState("dog")
    const [description, setDescription] = useState("")

    const { images, image: { singleImage }, isLoading, isError, isSuccess, message } = useSelector((state) => state.image)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate("/images")
            dispatch(reset())
        }

        dispatch(reset())
    }, [dispatch, navigate, isError, isSuccess, message])


    //this funtion is called when the user select an image
    const onInputChange = (e) => {
        // console.log(e.target.files[0])
        setImage(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const imageData = {
            image,
            label,
            description
        }
        dispatch(uploadImage(imageData));
    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <motion.div
            initial={{
                scale: (0, 0)
            }}
            animate={{
                scale: (1, 1)
            }}
            transition={{
                duration: "0.2"
            }}
        >
            <div className='card max-w-xl mx-auto mt-20 shadow-lg py-6 px-9'>

                <section className="text-center mt-3">
                    <h1 className="py-2 font-bold text-2xl">Upload an Image</h1>
                    <p className='py-2 font-bold text-2xl mb-10'>Beside the label, you can add a description about the picture that you are supposed to upload</p>

                </section>

                <section className="form">
                    <div className="form-group">
                        <label htmlFor="name">UserName</label>
                        <input
                            type="text"
                            disabled
                            value={user.name}
                            className='form-control'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name"> Email</label>
                        <input
                            type="email"
                            disabled
                            value={user.email}
                            className='form-control'
                        />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="file"
                                accept='image/*'
                                onChange={onInputChange}
                                className=' file-input file-input-bordered'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="product">Label</label>
                            <select
                                name="label"
                                id="label"
                                value={label}
                                onChange={(e) => setLable(e.target.value)}
                            >
                                <option value="dog">dog</option>
                                <option value="cow">cow</option>
                                <option value="cat">cat</option>
                                <option value="mouse">mouse</option>
                                <option value="horse">horse</option>
                                <option value="animal">animal</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description of the issue</label>
                            <textarea
                                name="description"
                                id="description"
                                className='form-control'
                                placeholder='Description'
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <button type='submit' className="btn btn-outline btn-block">
                                Upload
                            </button>
                        </div>

                    </form>
                </section>
            </div>
        </motion.div>
    )
}

export default UploadImage