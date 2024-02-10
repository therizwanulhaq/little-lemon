import React, { useState } from "react";
import styled from "@emotion/styled";

import { CtaButton } from "../common/CustomButton";
import DishModifiers from "./DishModifiers";
import QuantityOfDishes from "./QuantityOfDishes";
import { useParams } from "react-router-dom";
import { useAppDataContext } from "../context/AppDataContext";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const Section = styled.main`
  max-width: 1600px;
  margin: 0 auto;
  padding: 1rem 15rem 0 15rem;
  min-height: 100vh;
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(2, 1fr);

  ${mq[3]} {
    padding: 0 10rem;
  }
  ${mq[2]} {
    padding: 0 5rem;
  }

  ${mq[1]} {
    padding: 0;
    gap: 0;
    grid-template-columns: 1fr;
  }
`;

const Container = styled.div`
  ${mq[1]} {
    padding: 0 2rem;
  }
  ${mq[0]} {
    padding: 0 1rem;
  }
`;
const DishImage = styled.img`
  width: 100%;
  border-radius: 0.3rem;
  height: 15rem;
  object-fit: cover;
  ${mq[1]} {
    border-radius: 0;
  }
  ${mq[0]} {
    height: 13rem;
  }
`;

const DishDetailsContainer = styled.div`
  ${mq[1]} {
    padding: 0 2rem;
  }
  ${mq[0]} {
    padding: 0 1rem;
  }
`;

const DishName = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
`;

const DishPrice = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  /* color: #cd690c; */
`;

const PriceAndDishRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const DishDescription = styled.p`
  margin: 1rem 0 1.5rem 0;
  font-size: 0.95rem;
`;

const Cta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  font-size: 1rem;
`;

const DeliveryIcon = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;

const DeliveryTime = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

const Divider = styled.div`
  margin: 1rem 0;
  display: none;
  background: #bfbfbfc2;
  height: 2px;
  ${mq[1]} {
    display: block;
  }
`;
const Title = styled.h2`
  margin-top: ${(props) => props.marginTop || "0"};
  margin-bottom: 1rem;
`;

const toSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

const OrderDelivery = () => {
  const { dishName } = useParams();
  const { dishData } = useAppDataContext();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { user } = useAuth();

  // Find the dish with the matching dishName
  const selectedDish = dishData.find((dish) => toSlug(dish.name) === dishName);

  // Calculate the initial total price based on modifiers prices
  const initialTotalPrice =
    selectedDish?.modifiers?.reduce(
      (total, modifier) => total + parseFloat(modifier.price),
      0
    ) || 0;

  const [selectedTotalPrice, setSelectedTotalPrice] =
    useState(initialTotalPrice);

  if (!selectedDish) {
    return <div>Dish not found</div>; // Handle the case where the dish is not found
  }

  const { image, name, price, description, modifiers } = selectedDish;

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    setSelectedQuantity(newQuantity);
  };

  // Handle total price change from DishAddons
  const handleTotalPriceChange = (newTotalPrice) => {
    setSelectedTotalPrice(newTotalPrice);
  };

  // Calculate the total price based on quantity and add the total price from Dish Modifiers
  const totalPrice = (
    selectedQuantity * parseFloat(price) +
    selectedTotalPrice
  ).toFixed(2);

  const handleUploadToFirestore = async () => {
    try {
      const userDocRef = doc(db, "users", user.uid);

      const dishOrder = {
        dishImage: image,
        dishName: name,
        dishPrice: price,
        quantity: selectedQuantity,
        totalModifiersPrice: selectedTotalPrice,
      };

      // Retrieve the user's existing orders array from Firestore
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data() || {};

      // Check if the user data contains orders array
      const ordersArray = userData.orders || [];

      // Check if the item already exists in the cart
      const existingItemIndex = ordersArray.findIndex(
        (order) => order.dishName === dishOrder.dishName
      );

      let updatedOrdersArray;
      if (existingItemIndex !== -1) {
        // Item already exists, update the quantity
        updatedOrdersArray = ordersArray.map((order, index) => {
          if (index === existingItemIndex) {
            return {
              ...order,
              quantity: order.quantity + selectedQuantity,
            };
          }
          return order;
        });
      } else {
        // Item does not exist, add it to the cart
        updatedOrdersArray = [...ordersArray, dishOrder];
      }

      // Update the Firestore document with the updated orders array
      await updateDoc(userDocRef, { orders: updatedOrdersArray });
      console.log("Added to cart");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Section>
      <div>
        <DishImage src={image} alt={name} />
        <DishDetailsContainer>
          <PriceAndDishRow>
            <DishName>{name}</DishName>
            <DishPrice>${price}</DishPrice>
          </PriceAndDishRow>
          <DishDescription>{description}</DishDescription>
          <Cta>
            <DeliveryIcon className="material-symbols-outlined">
              directions_bike
            </DeliveryIcon>
            Delivery Time:
            <DeliveryTime>30 minutes</DeliveryTime>
          </Cta>
          <Divider />
        </DishDetailsContainer>
      </div>
      <Container>
        <Title>Add</Title>
        {modifiers && modifiers.length > 0 && (
          <div>
            {modifiers.map(({ name, price }) => (
              <DishModifiers
                key={name}
                name={name}
                price={price}
                onTotalPriceChange={handleTotalPriceChange}
              />
            ))}
          </div>
        )}
        <QuantityOfDishes onQuantityChange={handleQuantityChange} />
        <Link to="/cart">
          <CtaButton
            width="100%"
            height="2.5rem"
            onClick={handleUploadToFirestore}
          >
            Add for ${totalPrice}
          </CtaButton>
        </Link>
      </Container>
    </Section>
  );
};

export default OrderDelivery;
