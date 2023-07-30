import { styled } from "styled-components";
import { useState } from "react";
import MenuDetailData from "./MenuDetail.json"//더미데이터(서버로 받은 데이터)

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 투명한 회색 배경 */
`;
const ModalContainer = styled.div`
  width: 100%;
  /* 넓이 반응형으로 고치기 */
  max-width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 70%;
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 20px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ModalButton = styled.button`
    all: unset;
    bottom: 0;
    margin: 30px 0;
    /* margin: auto; */
    padding: 10px;
    border-radius: 10px;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    font-size: var(--font-big);
    font-weight: bold;
`
const OptionConainer=styled.div`
    width: 100%;
    overflow-y: scroll;
`
const OptionTitle=styled.h2`
    background-color: #5977e0;
    color: white;
    font-weight: bolder;
    font-size: var(--font-big);
    border-radius: 10px;
    width: 100%;
    padding: 4px 0px;
    text-align: center;
`
const Options=styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 10px 0;
`
const Option=styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: var(--font-big);
    background-color: var(--third-color);
    font-weight: bold;
    height: 14vh;/*반응형으로 고치기?*/
    border-radius: 10px;
    /* 선택된 메뉴 블록의 스타일*/
    ${({ selected}) =>
        selected && `
        background-color: var(--secondary-color);
    `}
`
export default function MenuModal({menusId, onCloseModal, orderUsers}){


    //menusId에 따라 모든 정보를 조회하는 api/v1/menuOptions/all/{menusId} 사용하여 json받기
    // console.log(MenuDetailData);

    //선택된 옵션들, 옵션 선택시에 selected만 수정하고, 메뉴 제출시에 menuOptionIdList <= selected
    const [selectedOptions, setSelectedOptions] = useState([]);

    //옵션 선택시, selected를 수정하는 함수
    const handleOptionClick = (optionId) => {
        setSelectedOptions(prevOptions => {
          if (prevOptions.includes(optionId)) {
            return prevOptions.filter(id => id !== optionId); // 선택 해제
          } else {
            return [...prevOptions, optionId]; // 선택 추가
          }
        });
    };

    //메뉴 옵션 선택 후, 하단 버튼 클릭시 , 서버로 전송하는 것 추가하기++
    const handleSubmitButton=() =>{
        const cart= {
            menusId: menusId,
            orderUsers: orderUsers?orderUsers:null,//최초 장바구니 담기는 null
            menuOptionsIdList: selectedOptions.join(","), // 처음에는 빈 문자열로 초기화, [옵션의 PK 스트링으로 ,로 엮어서]
        };
        console.log("submit");
        console.log(cart);
    };

    //서버로부터 받은 옵션데이터를 카테고리별로 나누어주는 함수
    const groupMenuOptionsByCategory = (optionsList) => {
        const groupedOptions = {};
        optionsList.forEach(option => {
          const { menuOptionsCategory, menuOptionsContents, menuOptionsPrice, menuOptionsId } = option;
          if (!groupedOptions[menuOptionsCategory]) {
            groupedOptions[menuOptionsCategory] = [];
          }
          groupedOptions[menuOptionsCategory].push({ contents: menuOptionsContents, price: menuOptionsPrice, id: menuOptionsId });
        });
        return groupedOptions;
    };

    return(
        <>
            <ModalBackground/>
            <ModalContainer>
                <OptionConainer>
                    {Object.entries(groupMenuOptionsByCategory(MenuDetailData.menuOptionsList)).map(([category, options]) => (
                        <div key={category} style={{paddingTop: "8px"}}>
                            <OptionTitle>{category}</OptionTitle>
                            <Options>
                                {options.map(option => (
                                <Option 
                                    key={option.id} 
                                    // onClick={() => addMenuOptionId(option.id)}
                                    onClick={() => handleOptionClick(option.id)}
                                    selected={selectedOptions.includes(option.id)}>
                                    <p style={{marginBottom:"5px"}}>{option.contents}</p><p>{(option.price===0)?null:`(${option.price})`}</p>
                                </Option>))}
                            </Options>
                        </div>
                    ))}
                </OptionConainer>
                <div style={{backgroundColor: "white", width: "100%", position: "sticky", borderRadius: "20px", display: "flex", justifyContent: "center"}}>
                    <ModalButton  onClick={()=>{onCloseModal(); handleSubmitButton();}}>선택 완료</ModalButton>
                </div>
            </ModalContainer>
        </>
    )
}