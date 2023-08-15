import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "styled-components";
import CartBackground from "./cartItems/CartBackground";
import Cart from "./Cart";
import Footer from "./Footer";

const FooterCartBox = styled.div`
  position: sticky;
  bottom: 0;
`;

export default function FooterCart({ onUpdatePrice }) {
  const [toggle, setToggle] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [updatedCart, setUpdatedCart] = useState([]);

  const handleClick = async () => {
    const newToggleValue = !toggle;
    setToggle(newToggleValue);
    const cartId = localStorage.getItem("cartId");

    if (newToggleValue === false) {
      if (updatedCart.length > 0) {
        try {
          const res = await axios.put(
            `${process.env.REACT_APP_SERVER_IP}/api/v1/cart`,
            {
              cartId: Number(cartId),
              orderMenuUpdateRequestDtoList: updatedCart,
            }
          );
          console.log("UPUP", updatedCart);
          console.log("카트 업데이트 성공::", res);
        } catch (error) {
          console.error("Failed to send updated cart data", error);
        }
      }
    }
    if (cartId !== "null") {
      const fetchedCartData = await getCartData();
      setCartData(fetchedCartData);
    }
  };

  const handleCartUpdate = (updatedCart) => {
    setUpdatedCart(updatedCart);
    /// setCartData(updatedCart);
  };

  const handleUpdatePrice = (price) => {
    setTotalPrice(price);
  };

  //const initialTotalPrice = Number(cartData.totalPrice);
  const initialTotalPrice = 0;

  const getCartData = async () => {
    const cartId = localStorage.getItem("cartId");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_IP}/api/v1/cart/${cartId}`
      );
      console.log("CART::", response.data.responseData);
      return response.data.responseData;
    } catch (error) {
      console.error("장바구니 불러오기 실패", error);
      return [];
    }
  };

  // Update the displayed total price whenever totalPrice changes
  useEffect(() => {
    setTotalPrice(initialTotalPrice);
  }, [initialTotalPrice]);

  return (
    <>
      <CartBackground toggle={toggle} handleClick={handleClick} />
      <FooterCartBox>
        <Cart
          cartData={cartData}
          onUpdateCart={handleCartUpdate}
          toggle={toggle}
          handleClick={handleClick}
          onUpdatePrice={handleUpdatePrice}
          totalPrice={initialTotalPrice}
        />
        <Footer totalPrice={totalPrice} />
        {/* <div style={{ background: "pink" }}>{totalPrice}</div> */}
      </FooterCartBox>
    </>
  );
}
