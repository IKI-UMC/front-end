import { styled } from "styled-components";

const HeaderBox = styled.header`
  width: 100%;
  height: 14vh;
  /* background-color: green; */
  background-color: var(--white);
  display: flex;
  align-items: center;
  position: sticky;
  top: 0px;
`
const LogoBox = styled.div`
    width: 97px;
    height: 55px;
    margin-left: 20px;
    position: absolute;
    background-color: darkgray;
`
const TitleBox=styled.div`
    margin:auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Title=styled.div`
    color: var(--primary-color);
    font-size: xx-large;
    font-weight: bolder;
    padding-bottom: 10px;
`
const Subtitle=styled.div`
    font-size: var(--font-big);
    font-weight: bold;
`

export default function Header({title, subtitle}){
    return(
        <HeaderBox>
          <LogoBox>로고</LogoBox>
          <TitleBox>
            <Title>{title}</Title><Subtitle>{subtitle}</Subtitle>
          </TitleBox>
        </HeaderBox>
    )
}