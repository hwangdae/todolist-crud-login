import React from "react";
import useInput from "../hooks/useInput";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addUsers, getUsers } from "../api/users";
import { useNavigate } from "react-router-dom";
import shortid from "shortid";

function Join() {
  const [userId, onChangeUserIdHandler] = useInput("");
  const [userPassword, onChangeUserPasswordHandler] = useInput("");
  const [userCheckPassword, onChangeUserCheckPasswordHandler] = useInput("");
  const [userName, onchangeUserNameHandler] = useInput("");

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const {isLoading,isError,data} = useQuery("users",getUsers)
  const mutation = useMutation(addUsers, {
    onSuccess: () => {
      console.log("상겅");
    },
  });
  console.log(data)
  const onSubmitJoinButtonHandler = async (event) => {
    event.preventDefault();
    const newUser = {
      id : shortid.generate(),
      userId,
      userPassword,
      userName,
      isLogin : false,
    };
    if (userId.trim() === "") {
      alert("아이디를 입력해주세요.");
    } else if (userPassword.trim() === "") {
      alert("비밀번호를 입력해주세요.");
    } else if (userPassword !== userCheckPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else if (userName.trim() === "") {
      alert("이름을 입력해주세요.");
    } else {
      mutation.mutate(newUser);
      
      alert("회원가입이 완료 되었습니다.");
      navigate("/")
    }
  };
  return (
    <>
      <form onSubmit={onSubmitJoinButtonHandler}>
        <label>아이디</label>
        <input
          type="email"
          value={userId}
          onChange={onChangeUserIdHandler}
        ></input>
        <label>비밀번호</label>
        <input
          type="password"
          value={userPassword}
          onChange={onChangeUserPasswordHandler}
        ></input>
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={userCheckPassword}
          onChange={onChangeUserCheckPasswordHandler}
        ></input>
        <label>사용자 이름</label>
        <input value={userName} onChange={onchangeUserNameHandler}></input>
        <button>가입 완료</button>
      </form>
    </>
  );
}

export default Join;
