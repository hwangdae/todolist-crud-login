import React from 'react'
import Main from '../component/Main';
import { useQuery } from 'react-query';
import { getUsers } from '../api/users';

function Home() {

//    const {isLoading,isError,data} = useQuery("users",getUsers)

//    const loginUser = data?.find((user)=>{

//      return user.isLogin === true
//    })
//    console.log(loginUser)

    return (
        <>
            <Main />
        </>
    )
}

export default Home