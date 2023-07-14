import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery,useQueryClient,useMutation } from "react-query";
import {getTodos, removeTodo} from "../api/todos";
import { getUsers } from "../api/users";

const TodoListWrap = styled.main`
  margin-top: 40px;
`
const TodoListInner=styled.div`
  max-width: 1200px;
  margin: 0 auto;
`
const Todo = styled.div`
  width: 300px;
  align-items: center;
  border-radius: 8px;
  padding: 30px 20px;
  background-color: #F9F5E7;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
  margin-bottom: 15px;
`;
const TodoInfo=styled.div`
  
`
const TodoWriter=styled.p`
  margin-bottom: 15px;
  font-size: 17px;
  font-weight: 600;
`
const TodoTitle=styled.h2`
  font-size: 16px;
  font-weight: 400;
`
const TodoButtonWrap=styled.div`
`
const TodoButton=styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #A7727D;
  color: #fff;
  margin-right: 8px;
  cursor: pointer;
`

function TodoList() {
  const [todoList, setTodoList] = useState([]);

  const {isLoading, isError, data} = useQuery("todos",getTodos);
  // const {userdata} = useQuery("users",getUsers);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation(removeTodo,{
    onSuccess : () =>{
      queryClient.invalidateQueries("todos")
    }
  })
  console.log(data)
  if(isLoading){
    return <h1>로딩중입니다.</h1>
  }
  if(isError){
    return <h1>에러가 발생하였습니다.</h1>
  }

  const onRemoveButtonClickHandler = async (id) => {
    console.log(id)
    mutation.mutate(id)
    }


  return (
    <>
      <TodoListWrap>
        <TodoListInner>

          {data.map((todoItem) => {
            return (
              
              <Todo key={todoItem.id}>
                <TodoInfo>
                <TodoWriter>{todoItem.title}</TodoWriter>
                <TodoTitle>{todoItem.content}</TodoTitle>
                </TodoInfo>
                <TodoButtonWrap>
                <TodoButton
                  onClick={() => {
                    console.log(todoItem.id)
                      navigate(`/todoList/${todoItem.id}`);
                  }}
                >
                  상세보기
                </TodoButton>
                <TodoButton onClick={() => onRemoveButtonClickHandler(todoItem.id)}>
                  삭제
                </TodoButton>
                </TodoButtonWrap>
              </Todo>
            );
          })}
        </TodoListInner>
      </TodoListWrap>
    </>
  );
}

export default TodoList;
