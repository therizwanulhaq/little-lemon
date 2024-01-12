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
} from "./StyledComponents";

import { CustomButton } from "../common/CustomButton";
import { ItemTile } from "./ItemTile";

const dishImageSource =
  "https://cookieandkate.com/images/2020/12/cheese-board-recipe.jpg";

const dishes = [
  {
    name: "Cheese Platter",
    image: dishImageSource,
    description: "Assorted cheeses served with crackers and fruits.",
    price: "$8.99",
  },
  
];

const renderDishes = () => {
  if (dishes.length === 0) {
    return <p>No items in the cart</p>;
  }

  return dishes.map((dish, index) => (
    <React.Fragment key={dish.name}>
      <ItemTile {...dish} />
      {index < dishes.length - 1 && <Divider />}
    </React.Fragment>
  ));
};

const Cart = () => {

  const calculateTotalPrice = () => {
    return dishes.reduce((total, dish) => total + parseFloat(dish.price.replace("$", "")), 0);
  };
  

  return (
    <Main>
      <ShoppingCart>
        <Container>
          <TitleAndPrice>
            <Title>Shopping Cart</Title>
            <Price>Price</Price>
          </TitleAndPrice>
          {renderDishes()}
        </Container>
        <Checkout>
          <div>
            <FreeDelivery>
              <Icon className="material-symbols-outlined">check_circle</Icon>
              FREE delivery available on this order
            </FreeDelivery>
          </div>
          <Subtotal>
          Subtotal ({dishes.length} item{dishes.length !== 1 && "s"}):{" "}
            <b>${calculateTotalPrice()}</b>
          </Subtotal>
          <CustomButton width="100%" height="2rem" padding="0.1rem">
            Proceed to Buy
          </CustomButton>
        </Checkout>
      </ShoppingCart>
    </Main>
  );
};

export default Cart;
