import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { getUsers } from "../api/users";
import { loginUser } from "../api/users";

const HeaderWrap = styled.header`
  background: #fff;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;
const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0px;
`;
const LogoWriteWrap = styled.div`
  display: flex;
  gap: 30px;
`;
const HomeButton = styled.button`
  background: none;
  border: none;
  font-family: "Belanosima", sans-serif;
  font-size: 28px;
  font-weight: 400;
  cursor: pointer;
`;
const WriteButton = styled.button`
  padding: 14px 42px;
  background: #a7727d;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
`;
const SignWrap = styled.div`
  display: flex;
  gap: 30px;
`;
const JoinButton = styled.div`
  background: none;
`;
const LoginButton = styled.div``;
function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery("users", getUsers);

  const logoutMutation = useMutation(loginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const loginUsered = data?.find((user) => {
    return user.isLogin === true;
  });

  return (
    <HeaderWrap>
      <HeaderInner>
        <LogoWriteWrap>
          <HomeButton
            onClick={() => {
              navigate("/");
            }}
          >
            GreenEat
          </HomeButton>
          <WriteButton
            onClick={() => {
              if(loginUsered?.isLogin=== true){
              navigate("/WriteTodo", {
                state: { writer: loginUsered.userName },
              })}else{
                alert('로그인이 필요합니다.')
              }
            }}
          >
            식단 공유하기
          </WriteButton>
        </LogoWriteWrap>
        <SignWrap>
          {loginUsered && <div>{loginUsered.userName}님 안녕하세요!</div>}

          {loginUsered ? (
            <LoginButton
              onClick={() => {
                const isConfirmed = window.confirm("로그아웃 하시겠습니까?");
                if (isConfirmed) {
                  logoutMutation.mutate({
                    ...loginUsered,
                    isLogin: false,
                  });
                  navigate("/")
                } else {
                  return loginUsered;
                }
              }}
            >
              로그아웃
            </LoginButton>
          ) : (
            <>
              <JoinButton
                onClick={() => {
                  navigate("/join");
                }}
              >
                회원가입
              </JoinButton>
              <LoginButton
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인
              </LoginButton>
            </>
          )}
        </SignWrap>
      </HeaderInner>
    </HeaderWrap>
  );
}

export default Header;
