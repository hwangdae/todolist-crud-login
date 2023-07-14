import React, { useState } from "react";
import useInput from "../hooks/useInput";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUsers,loginUser } from "../api/users";
import { useNavigate } from "react-router-dom";

function Login() {

  const [loginId,onChangeLoginIdHandler] = useInput("");
  const [loginPassword,onChangeLoginPasswordHandler] = useInput("");

  const navigate = useNavigate()

  const queryClient = useQueryClient();
  const {isLoading,isError,data} = useQuery("users",getUsers)

  const loginMutation = useMutation(loginUser, {
    onSuccess : () => {
      queryClient.invalidateQueries("users")
    }
  })

  // console.log(data)
  const user = data.find((user)=>{
    return user.userId === loginId && user.userPassword === loginPassword 
  })

  const onLoginButtonHandler =  (event) =>{
    event.preventDefault()
    
    if(user){
      loginMutation.mutate({...user,isLogin: true})
      alert('로그인되었습니다.')
      navigate("/")
    }else{
      alert("일치하는 사용자를 찾을 수 없습니다.")
    }
  }
  return (
    <>
      <form onSubmit={onLoginButtonHandler}>
        <label>아이디</label>
        <input type="email" value={loginId} onChange={onChangeLoginIdHandler}></input>
        <label>비밀번호</label>
        <input type="passWord" value={loginPassword} onChange={onChangeLoginPasswordHandler}></input>
        <button>로그인</button>
      </form>
    </>
  );
}

export default Login;
