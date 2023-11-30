import React, { useEffect } from 'react'
import BackButton from './BackButton'
import { useSelector, useDispatch } from 'react-redux'
import { getImage } from '../features/image/imageSlice'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner'
import { toast } from "react-toastify"
import { Link } from 'react-router-dom'

const Image = () => {
    const { image, isError, isLoading, isSuccess, message } = useSelector((state) => state.image)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const params = useParams()

    const { imageId } = params

    useEffect(() => {
        if (isError) {
            //message that comes from the state
            toast.error(message)
        }
        dispatch(getImage(imageId))
    }, [isError, message, dispatch, imageId])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url={"/images"} />
            <div className="hero min-h-screen bg-base-200 ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    {image && image.image && (
                        <img
                            src={require(`../images/${image.image}`).default}
                            alt=""
                            className="max-w-sm rounded-lg shadow-2xl"
                            srcSet=""
                        />
                    )}
                    <div className='card compact shadow-lg px-4 py-6 w-96 h-auto'>
                        <div className="">
                            <h1 className="text-4xl font-bold">Profile: {user.name}</h1>

                        </div>

                        <br />
                        <div className="">
                            <h1 className="text-3xl font-bold">Label: {image.label}</h1>
                            <p className="py-6">Description: {image.description}.</p>
                        </div>
                        <Link target='__blank' to={"https://github.com/MoeinDeveloper92"} className='btn btn-outline'>
                            Visit
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Image

// 