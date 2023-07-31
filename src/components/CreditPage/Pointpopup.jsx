import React, { useState } from "react";
import { styled } from "styled-components";
import { useEffect } from "react";
import { PopUpContent, TransParentBackGournd } from "./PopupStyleComponents";

const SmallPopUpContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  text-align: center;
  font-size: 25px;
`;

const SmallPopUpHeader = styled.h2`
  padding-bottom: 2rem;
  margin-bottom: 6rem;
  color: black;
  font-weight: bold;
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 200px;
  height: 40px;
  font-size: 20px;
  padding: 5px;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
`;


const RegisterButton = styled.button`
  margin-top: 1rem;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  font-size: 20px;
  border-radius: 5px;
  background: #4277ff;
  color: white;
`;

const NumericKeypad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* Update this line */
  gap: 10px;
  margin-top: 1rem;
  background-color: #f4f4f4; /* 배경색 */
  
  padding-top: 40px; 
  padding-bottom: 40px;
  padding-left: 20px;
  
`;


const NumericKey = styled.button`

  width: 80%;
  padding: 0.5rem;
  border-radius: 5px;
  background: #fff;
  font-size: 20px;
`;


export default function Pointpopup({ onClose, onRegister }) {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [completedPoint, setcompletedPoint] = useState(false);

  const handleNumericKeyClick = (number) => {
    setEnteredNumber((prevNumber) => prevNumber + number);
  };


  const handleOneStepClearButtonClick = () => {
    setEnteredNumber((prevNumber) => prevNumber.slice(0, -1));
  };

  const handleRegisterButtonClick = () => {
    setcompletedPoint(true);
    
  };

  useEffect(() => {
    if (completedPoint) {
      const timeout = setTimeout(() => {
        setcompletedPoint(false);
        // 페이지 이동
        window.location.href = "http://localhost:3000/main"; // 메인 페이지의 URL로 변경해야 합니다.
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [completedPoint]);

  return (
    <SmallPopUpContent>
      <SmallPopUpHeader>포인트 등록하기</SmallPopUpHeader>
      <InputContainer>
        <Input type="text" value={enteredNumber} readOnly />
        <RegisterButton onClick={handleRegisterButtonClick}>
          등록
        </RegisterButton>
      </InputContainer>
          <NumericKeypad>
            <NumericKey onClick={() => handleNumericKeyClick("1")}>1</NumericKey>
            <NumericKey onClick={() => handleNumericKeyClick("2")}>2</NumericKey>
            <NumericKey onClick={() => handleNumericKeyClick("3")}>3</NumericKey>
            <NumericKey onClick={() => handleNumericKeyClick("4")}>4</NumericKey>
            <NumericKey onClick={() => handleNumericKeyClick("5")}>5</NumericKey>
            <NumericKey onClick={() => handleNumericKeyClick("6")}>6</NumericKey>
            <NumericKey onClick={() => handleNumericKeyClick("7")}>7</NumericKey>
            <NumericKey onClick={() => handleNumericKeyClick("8")}>8</NumericKey>
            <NumericKey onClick={() => handleNumericKeyClick("9")}>9</NumericKey>
            <NumericKey onClick={() => handleNumericKeyClick("010")}>010</NumericKey>
            <NumericKey onClick={() => handleNumericKeyClick("0")}>0</NumericKey>
            <NumericKey onClick={handleOneStepClearButtonClick}> 지우기</NumericKey>
          </NumericKeypad>
          {completedPoint && (
            <TransParentBackGournd>
              <PopUpContent>
                <span>포인트 적립 완료</span>
              </PopUpContent>
            </TransParentBackGournd>
          )}
    </SmallPopUpContent>
  );
}