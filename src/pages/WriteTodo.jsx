import { useLocation, useNavigate, useParams } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useState } from "react";
import { styled } from "styled-components";
import shortid from "shortid";
import { addTodo } from "../api/todos";
import { useMutation, useQueryClient } from "react-query";

const WriteMainWrap = styled.main`
  padding-top: 40px;
`;
const WriteMainInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const WriteLabel = styled.label``;
const WriteInput = styled.input`
  display: block;
  width: 100%;
  margin: 10px 0px 26px 0px;
  padding: 10px 10px;
  border: none;
  border-radius: 10px;
  outline: none;
`;
const FoodCalWrap = styled.div``;
const FoodCalInner = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
`;
const FoodCalLabel = styled.label`
  display: block;
  width: 100%;
`;
const FoodCalAddButton = styled.button`
  width: 60px;
  height: 33px;
  border: none;
  background: #a7727d;
  font-size: 22px;
  color: #fff;
  border-radius: 5px;
`;
const WriteButton = styled.button`
  padding: 14px 48px;
  margin-top: 20px;
  background: #a7727d;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  color: #fff;
  cursor: pointer;
`;

function WriteTodo() {
  const [title, onChangeTitleHandler] = useInput("");
  const [content, onChangeContentHandler] = useInput("");
  const [foodCal, setFoodCal] = useState([
    { id: shortid.generate(), food: "", calorie: "" },
  ]);

  const queryClient = useQueryClient();
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const navigate = useNavigate();

  const params = useParams()
  const location = useLocation()
  console.log(location.state.userid)
  console.log(location.state.writer)
  const userid = location.state.userid
  const writer = location.state.writer

  const onChangeFoodCalorieHandler = (index, key, value) => {
    const updatedFoodCal = [...foodCal];
    updatedFoodCal[index][key] = value;
    setFoodCal(updatedFoodCal);
  };

  const onAddFoodCalorieHandler = () => {
    setFoodCal([...foodCal, { id: shortid.generate(), food: "", calorie: "" }]);
  };
  const onRemoveFoodCalorieHandler = (index) => {
    const updatedFoodcal = [...foodCal];
    updatedFoodcal.splice(index, 1);
    setFoodCal(updatedFoodcal);
  };

  const onSubmitHandler = async () => {
    try {
      if (title.trim() === "") {
        return alert("제목을 입력하세요");
      } else if (content.trim() === "") {
        return alert("내용을 입력하세요.");
      } else {
        const newTodo = {
          id:shortid.generate(),
          // userid,
          writer,
          title,
          content,
          foodCal,
        };
        mutation.mutate(newTodo);
        alert("게시글이 작성되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <WriteMainWrap>
        <WriteMainInner>
          <div>
            <WriteLabel>제목</WriteLabel>
            <WriteInput
              type="text"
              value={title}
              onChange={onChangeTitleHandler}
            ></WriteInput>
          </div>
          <div>
            <WriteLabel>내용</WriteLabel>
            <WriteInput
              type="text"
              value={content}
              onChange={onChangeContentHandler}
            ></WriteInput>
          </div>

          <FoodCalInner>
            <FoodCalAddButton onClick={onAddFoodCalorieHandler}>
              +
            </FoodCalAddButton>
            <FoodCalLabel>음식</FoodCalLabel>
            <FoodCalLabel>칼로리</FoodCalLabel>
          </FoodCalInner>
          <FoodCalWrap>
            {foodCal.map((foodCalItem, index) => {
              return (
                <>
                  <FoodCalInner key={foodCalItem.id}>
                    <WriteInput
                      type="text"
                      value={foodCalItem.food}
                      onChange={(e) =>
                        onChangeFoodCalorieHandler(
                          index,
                          "food",
                          e.target.value
                        )
                      }
                    />
                    <WriteInput
                      type="text"
                      value={foodCalItem.calorie}
                      onChange={(e) =>
                        onChangeFoodCalorieHandler(
                          index,
                          "calorie",
                          e.target.value
                        )
                      }
                    />
                    {index !== 0 && (
                      <FoodCalAddButton
                        onClick={() => onRemoveFoodCalorieHandler(index)}
                      >
                        -
                      </FoodCalAddButton>
                    )}
                  </FoodCalInner>
                </>
              );
            })}
          </FoodCalWrap>
          <WriteButton
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              onSubmitHandler();
            }}
          >
            작성하기
          </WriteButton>
        </WriteMainInner>
      </WriteMainWrap>
    </>
  );
}

export default WriteTodo;
