import axios from "axios"

const getUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`)
    return response.data
}

const addUsers = async (newUser) => {
    await axios.post (`${process.env.REACT_APP_SERVER_URL}/users`, newUser)
}

const loginUser = async (user) =>{
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/${user.id}`,user)
}
export {getUsers,addUsers,loginUser}