import React, { useReducer, useRef } from "react";
import { db, storage } from "../../firebase";
import { addDoc, collection, doc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDishContext } from "../context/DishContext";
import {
  DeleteIcon,
  DishStatus,
  Form,
  HeaderContainer,
  ImagePreview,
  ImagePreviewContainer,
  Input,
  Label,
  ModifierBody,
  ModifierHeader,
  Option,
  Select,
  StyledButton,
  Textarea,
  UploadFileIcon,
  UploadFileText,
} from "./StyledComponents";
import { Loader } from "../common/StyledComponents";

const initialState = {
  dishImage: "",
  dishImagePreview: null,
  dishName: "",
  dishPrice: "",
  dishDescription: "",
  dishCategory: "",
  newDishCategory: "",
  modifiers: [{ name: "", price: "" }],
  loading: false,
  dishStatus: null,
};

const RESET_STATE = "RESET_STATE";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DISH_IMAGE":
      return { ...state, dishImage: action.payload };
    case "SET_DISH_IMAGE_PREVIEW":
      return { ...state, dishImagePreview: action.payload };
    case "SET_DISH_NAME":
      return { ...state, dishName: action.payload };
    case "SET_DISH_PRICE":
      return { ...state, dishPrice: action.payload };
    case "SET_DISH_DESCRIPTION":
      return { ...state, dishDescription: action.payload };
    case "SET_DISH_CATEGORY":
      return { ...state, dishCategory: action.payload };
    case "SET_NEW_DISH_CATEGORY":
      return { ...state, newDishCategory: action.payload };
    case "SET_DISH_MODIFIERS":
      return { ...state, modifiers: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "DISH_STATUS":
      return { ...state, dishStatus: action.payload };
    case RESET_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

const AddNewDish = () => {
  const existingDishData = useDishContext() || [];
  const existingCategories = [
    ...new Set(existingDishData.map((dishData) => dishData.category) || []),
  ];
  const fileInputRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    dishImage,
    dishImagePreview,
    dishName,
    dishPrice,
    dishDescription,
    dishCategory,
    newDishCategory,
    modifiers,
    loading,
    dishStatus,
  } = state;

  // Handle input changes including the image file
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.length > 0) {
      const file = files[0];
      dispatch({ type: "SET_DISH_IMAGE", payload: file });

      dispatch({
        type: "SET_DISH_IMAGE_PREVIEW",
        payload: URL.createObjectURL(file),
      });
    } else {
      dispatch({ type: `SET_DISH_${name.toUpperCase()}`, payload: value });
    }
  };

  // Handle modifier changes
  const handleModifierChange = (index, field, value) => {
    const modifiersCopy = [...modifiers];
    modifiersCopy[index][field] = value;
    dispatch({ type: "SET_DISH_MODIFIERS", payload: modifiersCopy });
  };

  // Handle adding a modifier
  const handleAddModifier = () => {
    dispatch({
      type: "SET_DISH_MODIFIERS",
      payload: [...modifiers, { name: "", price: "" }],
    });
  };

  //Handle deleting a modifier
  const handleDeleteModifier = (indexToDelete) => {
    const modifiersCopy = [...modifiers];
    modifiersCopy.splice(indexToDelete, 1);
    dispatch({ type: "SET_DISH_MODIFIERS", payload: modifiersCopy });
  };

  // Handle submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      // Get a reference to the 'dishData' collection
      const dishDataCollectionRef = collection(db, "dishData");

      // Add the dish data to the 'dishData' collection
      const docRef = await addDoc(dishDataCollectionRef, {
        name: dishName,
        price: dishPrice,
        description: dishDescription,
        category: dishCategory === "__new__" ? newDishCategory : dishCategory,
        modifiers: modifiers,
      });

      // Use the document ID as the dish image name
      const imageRef = ref(storage, `dishData/images/${docRef.id}`);

      // Upload the image to Firebase Storage
      await uploadBytes(imageRef, dishImage);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Update the document with the image URL
      await updateDoc(doc(dishDataCollectionRef, docRef.id), {
        image: imageUrl,
      });

      // Reset the form after successful submission

      console.log("Dish data submitted successfully!");
      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: RESET_STATE });
      dispatch({
        type: "DISH_STATUS",
        payload: "Dish data submitted successfully!",
      });
    } catch (error) {
      console.error("Error submitting dish data:", error);
      dispatch({ type: "DISH_STATUS", payload: error });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <HeaderContainer>
          <h3>Dish Details</h3>
        </HeaderContainer>
        <Label>Image:</Label>

        <ImagePreviewContainer onClick={openFileInput}>
          <UploadFileIcon className="material-symbols-outlined">
            upload_file
          </UploadFileIcon>
          <UploadFileText>Upload image</UploadFileText>
          {dishImagePreview && (
            <ImagePreview src={dishImagePreview} alt="Dish Preview" />
          )}
        </ImagePreviewContainer>

        <Input
          type="file"
          name="image"
          ref={fileInputRef}
          onChange={handleInputChange}
          style={{ display: "none" }}
        />

        <Label>Name:</Label>
        <Input
          placeholder="Dish name"
          type="text"
          name="name"
          required
          value={dishName}
          onChange={handleInputChange}
        />

        <Label>Price:</Label>
        <Input
          placeholder="Dish price"
          type="number"
          step="any"
          name="price"
          required
          value={dishPrice}
          onChange={handleInputChange}
        />

        <Label>Description:</Label>
        <Textarea
          placeholder="Dish description"
          type="text"
          name="description"
          required
          rows="5"
          value={dishDescription}
          onChange={handleInputChange}
        />

        <Label>Category:</Label>
        <Select
          name="category"
          value={dishCategory}
          onChange={handleInputChange}
          required
        >
          <Option value="" disabled>
            Select a category
          </Option>
          {existingCategories.map((category, index) => (
            <Option key={`${category}_${index}`} value={category}>
              {category}
            </Option>
          ))}
          <Option value="__new__">Add New Category</Option>
        </Select>

        {dishCategory === "__new__" && (
          <Input
            type="text"
            placeholder="Enter new category"
            name="newCategory"
            value={newDishCategory}
            onChange={(e) =>
              dispatch({
                type: "SET_NEW_DISH_CATEGORY",
                payload: e.target.value,
              })
            }
            required
          />
        )}
      </div>
      <div>
        <HeaderContainer>
          <h3>Modifiers</h3>
          <StyledButton
            background="#1c2e35"
            color="white"
            padding="0.6rem 1rem"
            fontSize="0.8rem"
            type="button"
            onClick={handleAddModifier}
          >
            Add
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "1rem" }}
            >
              docs_add_on
            </span>
          </StyledButton>
        </HeaderContainer>
        <ModifierHeader>
          <h5>Name</h5> <h5>Price</h5> <h5>Delete</h5>
        </ModifierHeader>
        {modifiers.map((modifier, index) => (
          <ModifierBody key={index}>
            <Input
              type="text"
              placeholder="Modifier Name"
              value={modifier.name}
              onChange={(e) =>
                handleModifierChange(index, "name", e.target.value)
              }
            />

            <Input
              type="number"
              placeholder="Modifier Price"
              value={modifier.price}
              onChange={(e) =>
                handleModifierChange(index, "price", e.target.value)
              }
            />
            <DeleteIcon onClick={() => handleDeleteModifier(index)}>
              <span className="material-symbols-outlined">delete</span>
            </DeleteIcon>
          </ModifierBody>
        ))}
        <StyledButton
          disabled={loading}
          color="white"
          background="#067d62"
          width="100%"
          type="submit"
        >
          {loading ? (
            <Loader width="1.1rem" height="1.1rem" border="3px solid black" />
          ) : (
            "Add Dish"
          )}
        </StyledButton>
        <DishStatus>{dishStatus}</DishStatus>
      </div>
    </Form>
  );
};

export default AddNewDish;
