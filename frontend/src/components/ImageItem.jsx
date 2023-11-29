import React from 'react'
import { Link } from "react-router-dom"
const ImageItem = ({ image }) => {
    console.log(image)
    return (
        <div className='text-white card shadow-lg compact side bg-gray-600'>
            <div className="flex-row items-center space-x-5 card-body">
                <div className='avatar'>
                    <div className="rounded-sm shadow w-32 h-32">
                        < img src={require(`../images/${image.image}`)} alt="" srcset="" />
                    </div>
                </div>
                <div className='space-y-5'>
                    <h2 className="card-title text-3xl">Label: {image.label}</h2>
                    <Link className=' text-white text-2xl' to={`/images/imageId`}>
                        Visit Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}



export default ImageItem
