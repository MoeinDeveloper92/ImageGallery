import axios from "axios"

const API_URL = "/api/users/"



//register user
const registerUser = async (userData) => {
    const response = await axios.post(API_URL + "register", userData)

    //store data, back from server to the localstorage
    if (response.data) {
        window.localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

//Login user
const loginUser = async (userData) => {
    const response = await axios.post(API_URL + "login", userData)

    if (response.data) {
        window.localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}


//Logout
const logout = () => {
    localStorage.removeItem("user")
}

const authService = {
    registerUser,
    loginUser,
    logout
}

export default authService