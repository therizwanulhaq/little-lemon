import React, { useContext } from 'react';
import CartItem from './CartItem';
import styled from '@emotion/styled';


const CartPage = () => {
  const CartContext = useContext(CartContext);
  const { cartItems, addToCart, removeFromCart } = CartContext;

  const StyledCartPage = styled.div`
    padding: 20px;
  `;

  const StyledCartTitle = styled.h2`
    margin-bottom: 20px;
  `;

  const EmptyCartMessage = styled.p`
    text-align: center;
  `;

  return (
    <StyledCartPage>
      <StyledCartTitle>Your Cart</StyledCartTitle>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem key={item.id} item={item} onRemove={removeFromCart} />
        ))
      ) : (
        <EmptyCartMessage>Your cart is empty!</EmptyCartMessage>
      )}
    </StyledCartPage>
  );
};

export default CartPage;
