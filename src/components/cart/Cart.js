import React from "react";
import {
  Main,
  Container,
  TitleAndPrice,
  Title,
  Price,
  ShoppingCart,
  Divider,
  Checkout,
  FreeDelivery,
  Icon,
  Subtotal,
  CheckoutContainer,
  CenteredMessage,
} from "./StyledComponents";

import { CustomButton } from "../common/CustomButton";
import { ItemTile } from "./ItemTile";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import styled from "@emotion/styled";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const DividerMobile = styled(Divider)`
  margin-top: 1rem;
  display: none;
  ${mq[1]} {
    display: block;
  }
`;

const Cart = () => {
  const { user, userData } = useAuth();

  const handleDeleteFromFirestore = async (index) => {
    try {
      const userDocRef = doc(db, "users", user.uid);

      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();

      if (!userData || !userData.orders || !userData.orders.length) {
        console.log("No orders to delete.");
        return;
      }

      const updatedOrdersArray = userData.orders.filter((_, i) => i !== index);

      await updateDoc(userDocRef, { orders: updatedOrdersArray });
      console.log("Order deleted from orders array.");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Calculate the total price of all items in the cart
  const totalPrice = userData?.orders
    .reduce(
      (total, order) =>
        total +
        parseFloat(order.dishPrice) * order.quantity +
        order.totalModifiersPrice,
      0
    )
    .toFixed(2);

  return (
    <Main>
      {userData?.orders.length === 0 ? (
        <CenteredMessage>Your cart is empty!</CenteredMessage>
      ) : (
        <ShoppingCart>
          <Container>
            <TitleAndPrice>
              <Title>Shopping Cart</Title>
              <Price>Price</Price>
            </TitleAndPrice>
            <DividerMobile />
            {userData?.orders.map((order, index) => (
              <React.Fragment key={index}>
                <ItemTile
                  {...order}
                  onDelete={() => handleDeleteFromFirestore(index)}
                />
                {index < userData?.orders.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            <DividerMobile />
          </Container>
          <Checkout>
            <CheckoutContainer>
              <div>
                <FreeDelivery>
                  <Icon className="material-symbols-outlined">
                    check_circle
                  </Icon>
                  FREE delivery available on this order
                </FreeDelivery>
              </div>
              <Subtotal>
                Subtotal ({userData?.orders.length} item
                {userData?.orders.length !== 1 && "s"}): <b>${totalPrice}</b>
              </Subtotal>
            </CheckoutContainer>

            <CustomButton width="100%" height="2rem" padding="0.1rem">
              Proceed to Buy
            </CustomButton>
          </Checkout>
        </ShoppingCart>
      )}
    </Main>
  );
};

export default Cart;
