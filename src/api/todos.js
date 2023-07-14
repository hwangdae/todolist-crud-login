import axios from "axios";

const getTodos = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`)
    return response.data
}

const addTodo = async (newTodo) =>{
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`,newTodo)
}

const removeTodo = async (id) =>{
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`)
}

 const patchTodo = async (foundData) =>{
     await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${foundData?.id}`,foundData)
 }

export  {getTodos, addTodo,removeTodo,patchTodo}