import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import useInput from "../hooks/useInput";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTodos, patchTodo } from "../api/todos";
// import UpdateModal from "../component/UpdateModal";

const Modal = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;
const BackgroundColor = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;
const ModalWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background: #fff;
  z-index: 1;
`;
const ModalInner = styled.div`
  width: 500px;
  padding: 20px;
`;
const Label = styled.label`
  display: block;
`;
const Input = styled.input`
  width: 100%;
`;

const DetailWrap = styled.main`
  margin-top: 40px;
`;
const DetailInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const DetailWriter = styled.p`
  display: inline-block;
  padding: 10px 50px;
  background: #fff;
  margin-bottom: 15px;
  border-radius: 5px;
`;
const DetailTitle = styled.h2`
  padding: 10px 0px;
  background: #fff;
  margin-bottom: 15px;
`;
const DetailcontentWrap = styled.div`
  min-height: 300px;
  background: #fff;
  margin-bottom: 15px;
`;
const DetailContent = styled.h3``;
const DetailButton = styled.button`
  padding: 14px 42px;
  background: #a7727d;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
`;
function Todo() {
  const [isOpen, setIsOpen] = useState();
  const [todo, setTodo] = useState(null);


  const [updateTitle, onChangeUpdateTitleHandler, resetUpdateTitle] =
    useInput();
  const [updateContent, onChangeUpdateContentHandler, resetUpdateContent] =
    useInput();


  const params = useParams();

  const { isLoading, isError, data } = useQuery("todos", getTodos);
  const queryClient = useQueryClient();

  const mutation = useMutation(patchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const foundData = data?.find((item) => {
    return item.id === params.id;
  });
  console.log(foundData.id)

  const onUpdateclickHandler = async () => {
    try {
      const updateTodo = {
        id:params.id,
        title: updateTitle,
        content: updateContent,
      };
      mutation.mutate(updateTodo);
      alert("수정이 왼료되었습니다.");
      setIsOpen(false);
      resetUpdateTitle("");
      resetUpdateContent("");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen}>
        <BackgroundColor>
          <ModalWrap>
            <ModalInner>
              <h2>수정하기</h2>
              <div>
                <Label>제목</Label>
                <Input
                  type="text"
                  value={updateTitle}
                  onChange={onChangeUpdateTitleHandler}
                ></Input>
              </div>
              <div>
                <Label>내용</Label>
                <Input
                  type="text"
                  value={updateContent}
                  onChange={onChangeUpdateContentHandler}
                ></Input>
              </div>
              <div>
                <Label>음식</Label>
                <Input
                  type="text"
                  value={updateContent}
                  onChange={onChangeUpdateContentHandler}
                ></Input>
              </div>
              <div>
                <Label>내용</Label>
                <Input
                  type="text"
                  value={updateContent}
                  onChange={onChangeUpdateContentHandler}
                ></Input>
              </div>
              <button onClick={onUpdateclickHandler}>수정완료</button>
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                닫기
              </button>
            </ModalInner>
          </ModalWrap>
        </BackgroundColor>
      </Modal>
      {foundData ? (
        <DetailWrap>
          <DetailInner>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}
            >
              <DetailWriter>{foundData.writer}</DetailWriter>
              <DetailTitle>{foundData.title}</DetailTitle>
              <DetailcontentWrap>
                <DetailContent>{foundData.content}</DetailContent>
                {foundData?.foodcal?.map((foodItem) => {
                  return (
                    <div key={foodItem.id}>
                      <p>{foodItem.food}</p>
                      <p>{foodItem.calorie}</p>
                    </div>
                  );
                })}
              </DetailcontentWrap>

              <DetailButton>수정하기</DetailButton>
            </form>
          </DetailInner>
        </DetailWrap>
      ) : null}
    </>
  );
}

export default Todo;
