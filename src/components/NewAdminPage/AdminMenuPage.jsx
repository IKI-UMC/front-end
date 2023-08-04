import { useParams, Link } from "react-router-dom";
import { Box, PlusBtn } from "./AdminPageStyleComponent";



export default function AdminMenuPage(){

    const {category_id}=useParams();//url주소 얻기
    console.log(`현재 카테고리id:${category_id}의 메뉴들`)
    //서버로부터 category_id의 메뉴들 받기
    const menuId=[1,2,3,4,5];

    return(
        <div>
            현재 카테고리 (ID: {category_id})에 대한 모든 메뉴
            <PlusBtn>메뉴 추가</PlusBtn>
            <div>
            {menuId.map(menuid => ( // 여기서 중괄호가 아닌 괄호로 수정
                <Box key={menuid}>
                    <div>메뉴(id:{menuid})에 대한 정보 나열</div>
                    <button>메뉴 삭제</button>
                    <button>메뉴 정보 수정</button>
                    <Link 
                        to={`/admin/${category_id}/${menuid}`} 
                        style={{textDecoration:'none', color:'black'}}>
                        {/* 카테고리 삭제 */}
                        <button>메뉴 옵션 관리하기</button>
                    </Link>
                </Box> // key prop 추가하여 각 항목에 고유 키 부여
            ))}
            </div>
        </div>
    )
}