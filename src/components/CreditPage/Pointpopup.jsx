import React, { useState } from "react";
import { styled } from "styled-components";
import { useEffect } from "react";
import { PopUpContent } from "./PopupStyleComponents";

const SmallPopUpContent = styled(PopUpContent)`
  height: 50vh;
`;

const SmallPopUpHeader = styled.h2`
  margin-bottom: 5rem;
  color: black;
  font-weight: bold;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  padding: 5px;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 1;
`;


const RegisterButton = styled.button`
  position: absolute;
  transform: translateX(110%);
  right: 0;
  bottom: 0;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 0;
  background: var(--primary-color);
  color: white;
  font-weight: bold;
  &:hover{
    background-color: white;
    color: var(--primary-color);
    outline: 2px solid var(--primary-color);
  }
`;

const NumericKeypad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* Update this line */
  gap: 7px;
  margin-top: 1rem;
  
`;
const NumericKey = styled.button`
  border:0;
  width: 5rem;
  height: 5rem;
  padding: 1rem;
  border-radius: 5px;
  background: var(--secondary-color);
  font-size: 1.3rem;
  
  &:hover{
    color: var(--primary-color);
    outline: 2px solid var(--primary-color);
  }
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
      <SmallPopUpHeader>
        포인트 적립하기<br />
        <p style={{ fontSize: "1rem", paddingTop: "15px" }}>휴대폰 전화번호를 입력해 주세요</p>
      </SmallPopUpHeader>
      <InputContainer>
        <Input type="text" value={enteredNumber} readOnly />
        <RegisterButton onClick={handleRegisterButtonClick}>
          확인
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
        <NumericKey 
          onClick={() => handleNumericKeyClick("010")}
          style={{backgroundColor:"rgba(0, 46, 207, 0.65)", color: "white"}}
          >010
        </NumericKey>
        <NumericKey onClick={() => handleNumericKeyClick("0")}>0</NumericKey>
        <NumericKey 
          onClick={handleOneStepClearButtonClick}
          style={{fontSize:"1rem"}}> 지우기</NumericKey>
      </NumericKeypad>
      {completedPoint && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: "rgba(0, 46, 207, 0.65)",
          zIndex: 9999,
          color: 'white',
        }}>
          <PopUpContent>
            <span>포인트 적립 완료</span>
          </PopUpContent>
        </div>
      )}
    </SmallPopUpContent>
  );
}