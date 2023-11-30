import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { exportToExcel, getImages, reset } from '../features/image/imageSlice'
import { toast } from 'react-toastify'
import ImageItem from '../components/ImageItem'
import BackButton from '../components/BackButton'
import { Link } from 'react-router-dom'



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

    if (isLoading) {
        return <Spinner />
    }

    const handleExport = () => {
        dispatch(exportToExcel())
    }
    return (
        <>
            <BackButton url={"/"} className="mb-3" />
            {images.length === 0 ? (<>
                <h2 className='text-center text-4xl font-bold mt-20'>There is no Image card to be shown</h2>
                <h3 className='text-center text-3xl font-bold mt-10'>Back to Homepage and Upload Image.</h3>
            </>) : (<>
                <div className='mt-10 grid sm:grid-cols-1 gap-5 xl:grid-cols-3  md:grid-cols-2 '>
                    {images && images.map((image) => (
                        <ImageItem key={image._id} image={image} />
                    ))}
                </div>
                <div className='mt-10 space-x-3'>
                    <Link className='btn btn-outline' to={"/dashboard"}>
                        Visit Dashboard
                    </Link>
                    <Link onClick={handleExport} className='btn btn-outline'>
                        Download Excel file
                    </Link>
                </div>
            </>)}

        </>
    )
}

export default Images