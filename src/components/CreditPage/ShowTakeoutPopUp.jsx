import React from "react";
import { PopUpButton, PopUpContent, IndentedContainer, TransParentBackGournd } from "./PopupStyleComponents";

export default function ShowTakeoutPopUp({ onShowFirstPopUp }) {
  return (
    <TransParentBackGournd>
      <PopUpContent>
        <IndentedContainer>
          <span style={{lineHeight: 1.5}}>
            포장여부를 선택하면
            <br />
            결제가 진행됩니다.
          </span>
        </IndentedContainer>
        <PopUpButton onClick={() => onShowFirstPopUp(true)}>포장하기</PopUpButton>
        <PopUpButton onClick={() => onShowFirstPopUp(true)}>먹고가기</PopUpButton>
      </PopUpContent>
      </TransParentBackGournd>
  );
}
