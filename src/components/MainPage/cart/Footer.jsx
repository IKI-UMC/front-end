import { styled } from "styled-components";
import Price from "./footerItems/Price";
import PayButton from "./footerItems/PayButton";

const FooterBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  background-color: #9a9a9a;
  padding: 12px;
  height: 64px;
  font-size: var(--font-big);
`;

export default function Footer() {
  var price = 8000;

  return (
    <FooterBox>
      <Price price={price} />
      <PayButton />
    </FooterBox>
  );
}
