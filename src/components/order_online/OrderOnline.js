import styled from "@emotion/styled";
import React, { useState } from "react";
import { CategoriesButton } from "../common/CustomButton";
import { useDishContext } from "../context/Context";
import DishTile from "./DishTile";
import { Link } from "react-router-dom";

const focusColor = "#f4ce14";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const Main = styled.main`
padding-top: 1rem;
  min-height: 100vh;
  padding-bottom: 5rem;
`;

const Container = styled.div`
  padding: 0 15rem;
  ${mq[3]} {
    padding: 0 10rem;
  }
  ${mq[2]} {
    padding: 0 5rem;
  }
  ${mq[1]} {
    margin-top: 1rem;
    padding: 0 2rem;
  }
  ${mq[0]} {
    padding: 0 1rem;
  }
`;

const Title = styled.h1((props) => ({
  color: props.color || "black",
  fontSize: props.fontSize || "1.5rem",
  fontWeight: props.fontWeight || "500",
  letterSpacing: props.letterSpacing || "",
}));

const SearchBar = styled.input`
  margin: 1rem 0;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  width: 25rem;
  border-radius: 1rem;
  outline: none;
  border: 1px solid #495e57;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: ${focusColor};
  }

  ${mq[1]} {
    width: 100%;
  }

  ${mq[0]} {
    margin: 1rem 0 0 0;
  }
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  padding: 0 15rem;
  max-width: 100%;
  overflow-x: auto;
  ::-webkit-scrollbar {
    height: 1px; /* Set the width of the scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cccccc00; /* Set the color of the scrollbar thumb */
  }

  ::-webkit-scrollbar-track {
    background-color: #cccccc00; /* Set the color of the scrollbar track */
  }
  ${mq[3]} {
    padding: 0 10rem;
  }
  ${mq[2]} {
    padding: 0 5rem;
  }
  ${mq[1]} {
    padding: 0 0;
    > :first-of-type {
      margin-left: 2rem;
    }
    > :last-child {
      margin-right: 2rem;
    }
  }
  ${mq[0]} {
    > :first-of-type {
      margin-left: 1rem;
    }
    > :last-child {
      margin-right: 1rem;
    }
  }
`;

const DishListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 0 15rem;
  max-width: 100%;
  cursor: pointer;

  ${mq[3]} {
    padding: 0 10rem;
  }
  ${mq[2]} {
    padding: 0 5rem;
  }
  ${mq[1]} {
    padding: 0 2rem;
    grid-template-columns: 1fr;
    gap: 0;
  }
  ${mq[0]} {
    padding: 0 1rem;
  }
`;

const Divider = styled.div`
  display: none;
  width: 100%;
  background: #bfbfbf6b;
  height: 1px;
  margin-bottom: 1rem;
  ${mq[1]} {
    display: block;
  }
`;

const NoResults = styled.p`
  margin-top: 10rem;
  font-size: 1.3rem;
  text-align: center;
`;

const toSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

const OrderOnline = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);

  const dishList = useDishContext();

  // Getting categories from dishes
  const dishCategories = [...new Set(dishList.map((dish) => dish.category))];

  const filteredDishes = dishList.filter((dish) => {
    // Filter by category
    if (selectedCategory && dish.category !== selectedCategory) {
      return false;
    }
    // Filter by search query
    return dish.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <Main>
      <Container>
        <Title color="#000000c7" fontWeight="700" letterSpacing="-1px">
          Online
        </Title>
        <Title fontWeight="700" color="#00000080">
          MENU
        </Title>
        <SearchBar
          id="search"
          type="search"
          placeholder="Search for your favorite dishes..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Container>
      <CategoryContainer>
        {dishCategories.map((category) => (
          <CategoriesButton
            key={category}
            onClick={() => handleCategoryClick(category)}
            selected={category === selectedCategory}
          >
            {category}
          </CategoriesButton>
        ))}
      </CategoryContainer>
      <Divider />
      {filteredDishes.length === 0 ? (
        <NoResults>No results!</NoResults>
      ) : (
        <DishListContainer>
          {filteredDishes.map((dish) => (
            <Link key={dish.id} to={`/order-online/${toSlug(dish.name)}`}>
              <DishTile
                image={dish.image}
                name={dish.name}
                price={dish.price}
                description={dish.description}
              />
            </Link>
          ))}
        </DishListContainer>
      )}
    </Main>
  );
};

export default OrderOnline;
