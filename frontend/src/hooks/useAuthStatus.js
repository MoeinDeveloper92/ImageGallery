import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(true)
    const [checkingStatus, setCheckingStatus] = useState(false)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }

        setCheckingStatus(true)
    }, [user])


    return { loggedIn, checkingStatus }
}
