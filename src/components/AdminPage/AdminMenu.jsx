import { useParams, Link } from "react-router-dom";
import React, { useState } from "react";
import Header from "../header/Header";
import convertPrice from "../../utils/convertPrice";
import { PlusButton, SmallBtn, Btn, XBtn, BackBtn } from "./adminItems/AdminButtonCSS";
import {
  PageBox,
  GroupName,
  EachMenu,
  OneRow,
  Buttons,
  NameAndPrice,
  Name,
  Price,
} from "./adminItems/AdminContainerCSS";
import menuData from "./DummyData/MenusByCategoryId.json";
import { AddMenuModal, EditMenuModal } from "./adminItems/ModalForMenu";

export default function AdminMenu() {
  const { category_id } = useParams(); //url주소 얻기
  console.log(`현재 카테고리id:${category_id}의 메뉴들`);
  //서버로부터 category_id의 메뉴들 받기

  const menuDatas = menuData; //category_id로 서버로부터 정보 get

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(null); // 수정 대상 메뉴의 ID
  const [selectedMenuData, setSelectedMenuData] = useState({
    name: "",
    price: null,
    soldOut: null,
  });
  const handleAdd = () => {
    // 기존 handleAddMenuButtonClick
    setIsAddModalOpen(true);
  };

  const handleEdit = (menuId, menuData) => {
    setSelectedMenuId(menuId);
    setSelectedMenuData(menuData);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedMenuId(null);
    //새로고침으로 get받아오기
  };

  return (
    <PageBox>
      
      <Header
          title="메뉴 등록"
          link="/main" />
      <Link to="/admin"><BackBtn str="카테고리 등록"></BackBtn></Link>
      {/*{menuDatas.responseData.categoryName} (ID: {category_id})에 대한 모든 메뉴*/}
      <PlusButton onClick={handleAdd}>메뉴 추가</PlusButton>
      <div style={{ padding: "8px 0", fontWeight: "bold" }}>카테고리명</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <GroupName>
          {menuDatas.responseData.categoryName}(ID: {category_id})
        </GroupName>
        <SmallBtn>수정</SmallBtn>
      </div>
      <div>
        {menuDatas.responseData.menusList.map(
          (
            item // 여기서 중괄호가 아닌 괄호로 수정
          ) => (
            <EachMenu key={item.menusId}>
              <OneRow>
                <NameAndPrice>
                  <Name>
                    {item.menusName}({item.menusId})
                  </Name>
                  <Price>{convertPrice(item.menusPrice)}</Price>
                </NameAndPrice>
                <Buttons>
                  <Btn
                    onClick={() =>
                      handleEdit(item.menusId, {
                        name: item.menusName,
                        price: item.menusPrice,
                        soldOut: item.soldOut,
                      })
                    }
                  >
                    수정/품절관리
                  </Btn>
                  <Link
                    to={`/admin/${category_id}/${item.menusId}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Btn>옵션</Btn>
                  </Link>
                </Buttons>
                <XBtn />
              </OneRow>
            </EachMenu> // key prop 추가하여 각 항목에 고유 키 부여
          )
        )}
      </div>
      {isAddModalOpen && <AddMenuModal onClose={handleCloseModal} />}
      {isEditModalOpen && selectedMenuId && (
        <EditMenuModal
          menuId={selectedMenuId}
          selectedMenuData={selectedMenuData}
          onClose={handleCloseModal}
        />
      )}
    </PageBox>
  );
}
