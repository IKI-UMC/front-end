import React, { useEffect } from "react";
import { styled } from "styled-components";
import { TransParentBackGournd } from "./PopupStyleComponents";

const ReceiptContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 25px;
`;

const ShowReceiptPopup = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Navigate to a new URL after 3 seconds
      window.location.replace("/main");
    }, 3000);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);
 
  return (
    <TransParentBackGournd>
      <ReceiptContainer>
        <span>영수증 발급 완료</span>
      </ReceiptContainer>
    </TransParentBackGournd>
  );
};

export default ShowReceiptPopup;
