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

const ShowReceiptPopup = ({ onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose(); // Call the onClose function to close the receipt popup after 3 seconds
    }, 3000);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <TransParentBackGournd>
      <ReceiptContainer>
          <span>영수증 발급 완료</span>
        </ReceiptContainer>
    </TransParentBackGournd>
  );
};

export default ShowReceiptPopup;
