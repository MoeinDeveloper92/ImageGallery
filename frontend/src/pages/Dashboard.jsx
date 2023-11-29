import React, { useEffect } from 'react'
import BackButton from '../components/BackButton'
import { useDispatch, useSelector } from 'react-redux'
import { getImages, reset } from '../features/image/imageSlice'
import Spinner from '../components/Spinner'
import { Tooltip, Pie, PieChart } from 'recharts'

const Dashboard = () => {

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



    return (
        <>
            <BackButton url={"/images"} />
            <div>
                <h1 className='text-center text-5xl tracking-wider font-semibold'>User's Dashboard</h1>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={""}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />

                    <Tooltip />
                </PieChart>
            </div>
        </>
    )
}

export default Dashboard