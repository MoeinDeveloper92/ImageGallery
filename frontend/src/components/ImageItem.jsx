import React from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { deleteImage } from '../features/image/imageSlice'

const ImageItem = ({ image }) => {

    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const onDelete = () => {
        if (window.confirm("Are you sure that you want to delete the image Card?")) {
            console.log(image)
            dispatch(deleteImage(image._id))
        }
    }


    return (
        <div className=' text-white card shadow-lg compact side bg-gray-600'>
            <div className="flex-row items-center space-x-5 card-body relative">

                <button onClick={onDelete}>
                    <span className=' absolute top-6 right-10 font-bold cursor-pointer hover:text-black' title='Delete?'>X</span>
                </button>

                <div className='avatar'>
                    <div className="rounded-sm shadow w-32 h-32">
                        < img src={require(`../images/${image.image}`)} alt="" srcset="" />
                    </div>
                </div>

                <div className='space-y-5'>
                    <h2 className="card-title text-2xl sm:text-sm">Label: {image.label}</h2>
                    <Link className=' text-white text-xl' to={`/images/${image._id}`}>
                        Visit Image
                    </Link>
                    <p>This image uploaded by {user.name} at {new Date(image.createdAt).toLocaleString('en-US')}</p>
                </div>

            </div>
        </div>
    )
}



export default ImageItem
