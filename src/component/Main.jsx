import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const MainWrap = styled.main`
    padding-top: 40px;
`

const MainInner = styled.div`
    max-width :1200px;
    margin : 0 auto;
`

const MainTodoListButton = styled.div`
    width: 100%;
    padding: 40px 0px;
    background: #fff;
    border-radius: 5px;
`
const MainTodoListTitle = styled.h1`
    padding: 0px 20px;
    font-size: 26px;
`

function Main() {

    const navigate = useNavigate();

    return (
        <MainWrap>
            <MainInner>
                <MainTodoListButton onClick={() => {
                    navigate("/TodoList")
                }}><MainTodoListTitle>게시글 보기</MainTodoListTitle></MainTodoListButton>
            </MainInner>
        </MainWrap>
    )
}

export default Main