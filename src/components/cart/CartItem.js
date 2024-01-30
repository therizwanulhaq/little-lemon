import React, { useContext } from 'react';
import emotion from '@emotion/styled';

const CartItem = ({ item, onRemove }) => {
  const CartContext = useContext(CartContext);

  const StyledCartItem = emotion.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  `;

  const StyledImage = emotion.img`
    width: 80px;
    height: 80px;
    margin-right: 10px;
  `;

  const StyledName = emotion.div`
    font-weight: bold;
  `;

  return (
    <StyledCartItem>
      <StyledImage src={item.image} alt={item.name} />
      <StyledName>{item.name}</StyledName>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </StyledCartItem>
  );
};

export default CartItem;
