import styled from "@emotion/styled";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../firebase";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const ShoppingCartTile = styled.div`
  padding-top: 1rem;
  display: grid;
  width: 100%;
  grid-template-columns: 2fr 3.5fr 0.5fr;
  gap: 0.5rem;
  justify-content: space-between;
  ${mq[1]} {
    padding-top: 0;
  }
`;

const DishImageContainer = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 0.2rem;

  ${mq[1]} {
    width: 6rem;
    height: 6rem;
  }
`;

const DishImage = styled.img`
  width: 8rem;
  height: 100%;
  object-fit: cover;
  border-radius: 0.2rem;

  ${mq[1]} {
    width: 6rem;
  }
`;

const DishInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DishName = styled.h4`
  font-size: 1.2rem;
  ${mq[1]} {
    font-size: 1rem;
    font-weight: 500;
  }
`;

const DishDescription = styled.p`
  font-size: 1rem;
  font-weight: 400;
  ${mq[1]} {
    font-size: 0.8rem;
  }
`;

const DishPrice = styled.div`
  font-weight: bold;
  ${mq[1]} {
    display: none;
  }
`;

const DishPriceMoible = styled.h3`
  font-size: 1rem;
  display: none;
  ${mq[1]} {
    display: block;
  }
`;

const Quantity = styled.h2`
  font-size: 1rem;
  font-weight: 700;
`;

const Container = styled.div`
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;
  user-select: none;
  width: 9rem;
  height: 1.7rem;
  color: #0f1111;
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  width: 6rem;
  ${mq[1]} {
    display: flex;
  }
`;

const ContainerForLargerScreens = styled(Container)`
  display: flex;
  ${mq[1]} {
    display: none;
  }
`;

const ContainerForMobile = styled(Container)`
  display: none;
  ${mq[1]} {
    display: flex;
  }
`;

const StyledButtons = styled.button`
  height: 1.7rem;
  cursor: pointer;
  margin-top: auto;
  padding: 0.3rem 1rem;
  border: 1px solid #d5d9d9;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 2px 5px rgba(213, 217, 217, 0.5);
`;

const Button = styled.span`
  font-weight: 700;
  height: 1.7rem;
  width: 1.8rem;
  font-size: 1rem;
  cursor: pointer;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-radius: 0.3rem 0 0 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  box-shadow: rgba(0, 0, 0, 0.1) 0px -50px 36px -28px inset;
`;

const ButtonRight = styled(Button)`
  border-radius: 0 0.3rem 0.3rem 0;
  border-left: 1px solid #ccc;
  border-right: none;
`;

const MobileCta = styled.div`
  /* display: none; */
  ${mq[1]} {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 6rem;
  }
`;

const Cta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #ccc;
`;

// const CtaOption = styled.p`
//   color: #00a0d0;
//   cursor: pointer;
// `;

export const ItemTile = ({
  dishName,
  dishImage,
  dishPrice,
  quantity,
  onDelete,
  totalModifiersPrice,
}) => {
  const { user, userData } = useAuth();

  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleAddQuantity = async () => {
    const newQuantity = itemQuantity + 1;
    setItemQuantity(newQuantity);

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        orders: userData?.orders.map((order) =>
          order.dishName === dishName
            ? { ...order, quantity: newQuantity }
            : order
        ),
      });
      console.log("Quantity updated in Firestore");
    } catch (error) {
      console.error("Error updating quantity in Firestore:", error);
    }
  };

  const handleRemoveQuantity = async () => {
    if (itemQuantity > 1) {
      const newQuantity = itemQuantity - 1;
      setItemQuantity(newQuantity);

      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          orders: userData?.orders.map((order) =>
            order.dishName === dishName
              ? { ...order, quantity: newQuantity }
              : order
          ),
        });
        console.log("Quantity updated in Firestore");
      } catch (error) {
        console.error("Error updating quantity in Firestore:", error);
      }
    }
  };

  const totalPrice = Number(
    dishPrice * itemQuantity + totalModifiersPrice
  ).toFixed(2);
  return (
    <ShoppingCartTile>
      <MobileCta>
        <DishImageContainer>
          <DishImage src={dishImage} alt="Dish" />
        </DishImageContainer>
        <ContainerForMobile>
          <Button
            className="material-symbols-outlined"
            onClick={handleRemoveQuantity}
          >
            remove
          </Button>
          <Quantity>{quantity}</Quantity>
          <ButtonRight
            className="material-symbols-outlined"
            onClick={handleAddQuantity}
          >
            add
          </ButtonRight>
        </ContainerForMobile>
      </MobileCta>

      <DishInfo>
        <DishName>{dishName}</DishName>
        <DishDescription>
          {dishName} x {quantity} = $ {dishPrice * quantity}
        </DishDescription>
        <DishDescription>Modifiers = ${totalModifiersPrice}</DishDescription>
        <DishPriceMoible>${totalPrice}</DishPriceMoible>
        <Cta>
          <ContainerForLargerScreens>
            <Button
              className="material-symbols-outlined"
              onClick={handleRemoveQuantity}
            >
              remove
            </Button>
            <Quantity>{quantity}</Quantity>
            <ButtonRight
              className="material-symbols-outlined"
              onClick={handleAddQuantity}
            >
              add
            </ButtonRight>
          </ContainerForLargerScreens>
          <StyledButtons onClick={onDelete}>Delete</StyledButtons>
        </Cta>
      </DishInfo>
      <DishPrice>${totalPrice}</DishPrice>
    </ShoppingCartTile>
  );
};
