import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AddIcon,
  AddNewDishButton,
  DishCategory,
  DishDescription,
  DishImage,
  DishModifiers,
  DishName,
  DishPrice,
  EditIcon,
  GridBody,
  GridHeader,
  Option,
  SearchBox,
  SearchboxAndButton,
  Select,
  Title,
} from "./StyledComponents";

import { useAppDataContext } from "../../context/AppDataContext";

const DishListPage = () => {
  const { dishData } = useAppDataContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const dishCategories = [
    ...new Set(dishData.map((dishProperties) => dishProperties.category)),
  ];

  const filteredDishes = dishData.filter((dish) => {
    if (selectedCategory && dish.category !== selectedCategory) {
      return false;
    }
    return dish.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const dishHeader = [
    "Image",
    "Name",
    "Description",
    "Price",
    "Category",
    "Modifiers",
    "Edit",
  ];

  return (
    <section>
      <SearchboxAndButton>
        <SearchBox
          type="search"
          placeholder="Search dishes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          margin="0"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <Option value="">Filter by category</Option>
          {dishCategories.map((category, index) => (
            <Option key={index} value={category}>
              {category}
            </Option>
          ))}
        </Select>
        <Link to="add-new-dish">
          <AddNewDishButton>
            Add New Dish
            <AddIcon className="material-symbols-outlined">
              tab_new_right
            </AddIcon>
          </AddNewDishButton>
        </Link>
      </SearchboxAndButton>

      <GridHeader>
        {dishHeader.map((title, index) => (
          <b key={index}>
            <Title>{title}</Title>
          </b>
        ))}
      </GridHeader>
      {filteredDishes.map((dish) => (
        <GridBody key={dish.id}>
          <DishImage src={dish.image} alt={dish.name} />
          <DishName>{dish.name}</DishName>
          <DishDescription>{dish.description}</DishDescription>
          <DishPrice>${dish.price}</DishPrice>
          <DishCategory>{dish.category}</DishCategory>

          <div>
            {dish.modifiers.map((modifier, index) => (
              <DishModifiers key={index}>
                {modifier.name} - ${modifier.price}
                {index < dish.modifiers.length - 1 && ", "}
              </DishModifiers>
            ))}
          </div>
          <div>
            <Link to={`/dashboard/edit-dish/${dish.id}`}>
              <EditIcon className="material-symbols-outlined">
                edit_square
              </EditIcon>
            </Link>
          </div>
        </GridBody>
      ))}
    </section>
  );
};

export default DishListPage;
