import React, { useEffect } from 'react'
import BackButton from './BackButton'
import { useSelector, useDispatch } from 'react-redux'
import { getImage } from '../features/image/imageSlice'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner'
import { toast } from "react-toastify"


const Image = () => {
    const { image, isError, isLoading, isSuccess, message } = useSelector((state) => state.image)
    console.log(image)
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
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    < img src={``} alt="" className="max-w-sm rounded-lg shadow-2xl" srcset='' />
                    <div>
                        <h1 className="text-5xl font-bold">Box Office News!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Image

// 