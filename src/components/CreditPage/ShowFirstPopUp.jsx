import React, { useEffect } from "react";
import { styled } from "styled-components";


const PopUpContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  font-size: 30px;
`;

const ShowFirstPopUp = ({ onClose }) => {
  // 3초 후에 팝업을 닫는 함수
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 82, 212, 0.70)",
        zIndex: 9999,
        color: "white",
      }}
    >
      <PopUpContent>
        <span>카드를 넣어주세요</span>
      </PopUpContent>
    </div>
  );
};

export default ShowFirstPopUp;
