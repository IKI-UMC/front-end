import React from "react";
import { styled } from "styled-components";

import { PopUpButton, PopUpContent, IndentedContainer, TransParentBackGournd } from "./PopupStyleComponents";

const Upper = styled.div`
 margin-bottom: 5rem;
`;


const ShowNextPopUp = ({ onReceiptButtonClick, onPointButtonClick }) => {
  return (
    <TransParentBackGournd>
      <PopUpContent>
        <Upper>
          <IndentedContainer>
            <span>00000원</span>
          </IndentedContainer>
          <IndentedContainer>
            <span>결제 완료</span>
          </IndentedContainer>
        </Upper>
        <IndentedContainer>
          <span>주문 번호: 00번</span>
        </IndentedContainer>
        <PopUpButton onClick={onReceiptButtonClick}>영수증 받기</PopUpButton>
        <PopUpButton onClick={onPointButtonClick}>포인트 적립하기</PopUpButton>
      </PopUpContent>
    </TransParentBackGournd>
  );
};

export default ShowNextPopUp;
