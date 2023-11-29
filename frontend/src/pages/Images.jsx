import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getImages, reset } from '../features/image/imageSlice'
import { toast } from 'react-toastify'
import ImageItem from '../components/ImageItem'
const Images = () => {
    const { images, isError, isLoading, isSuccess, message } = useSelector((state) => state.image)
    const dispatch = useDispatch()


    //clear state on unMount
    useEffect(() => {

        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {

        dispatch(getImages())
    }, [dispatch])
    console.log(images)
    if (isLoading) {
        return <Spinner />
    }
    return (
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
            {images && images.map((image) => (
                <ImageItem key={image._id} image={image} />
            ))}
        </div>
    )
}

export default Images