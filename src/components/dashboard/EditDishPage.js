import React, { useRef, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../firebase";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
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
  LoaderContainer,
  ModifierBody,
  ModifierHeader,
  Option,
  PopupActions,
  PopupBody,
  Select,
  StyledButton,
  UploadFileIcon,
  UploadFileText,
} from "./StyledComponents";
import { Loader } from "../common/StyledComponents";
import PopUp from "../common/PopUp";

const EditDishPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dishDataFromContext = useDishContext();
  const { id } = useParams();

  const dishCategories = [
    ...new Set(dishDataFromContext.map((dishData) => dishData.category)),
  ];

  // Find the specific dish data based on the 'id' parameter
  const dishData = dishDataFromContext.find((dish) => dish.id === id) || {};

  const initialState = {
    savingChanges: false,
    deletingDishData: false,
    imageUploadLoader: false,
    dishImagePreview: null,
    dishName: dishData.name || "",
    dishPrice: dishData.price || "",
    dishDescription: dishData.description || "",
    dishCategory: dishData.category || "",
    newDishCategory: "",
    modifiers: dishData.modifiers || [{ name: "", price: "" }],
    dishStatus: null,
    isPopupVisible: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_SAVING_CHANGES":
        return { ...state, savingChanges: action.payload };
      case "SET_DELETING_DISH_DATA":
        return { ...state, deletingDishData: action.payload };
      case "SET_IMAGE_UPLOAD_LOADER":
        return { ...state, imageUploadLoader: action.payload };
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
      case "DISH_STATUS":
        return { ...state, dishStatus: action.payload };
      case "TOGGLE_POPUP":
        return { ...state, isPopupVisible: !state.isPopupVisible };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    savingChanges,
    deletingDishData,
    imageUploadLoader,
    dishImagePreview,
    dishName,
    dishPrice,
    dishDescription,
    dishCategory,
    newDishCategory,
    modifiers,
    dishStatus,
    isPopupVisible,
  } = state;

  const togglePopup = (e) => {
    e.preventDefault();
    dispatch({ type: "TOGGLE_POPUP" });
    document.body.style.overflow = isPopupVisible ? "auto" : "hidden";
  };
  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = async ({ target }) => {
    const { name, value, files } = target;

    if (name === "image" && files?.length > 0) {
      const file = files[0];

      try {
        dispatch({ type: "SET_IMAGE_UPLOAD_LOADER", payload: true });

        dispatch({ type: "SET_DISH_IMAGE", payload: file });

        const imageRef = ref(storage, `dishData/images/${dishData.id}`);
        await uploadBytes(imageRef, file);

        dispatch({
          type: "SET_DISH_IMAGE_PREVIEW",
          payload: URL.createObjectURL(file),
        });
        dispatch({ type: "SET_IMAGE_UPLOAD_LOADER", payload: false });
      } catch (error) {
        console.log("Error uploading image:", error);
        dispatch({ type: "SET_IMAGE_UPLOAD_LOADER", payload: false });
      }
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

  //Handle submitting dish data
  const handleSubmit = async () => {
    try {
      dispatch({ type: "SET_SAVING_CHANGES", payload: true });
      const imageRef = ref(storage, `dishData/images/${dishData.id}`);

      const imageUrl = await getDownloadURL(imageRef);

      const dishDocRef = doc(db, "dishData", id);

      await updateDoc(dishDocRef, {
        image: imageUrl,
        name: dishName,
        price: dishPrice,
        description: dishDescription,
        category: dishCategory === "__new__" ? newDishCategory : dishCategory,
        modifiers: modifiers,
      });

      console.log("Dish data updated successfully!");
      dispatch({ type: "SET_SAVING_CHANGES", payload: false });
      dispatch({
        type: "DISH_STATUS",
        payload: "Dish data updated successfully!",
      });
    } catch (error) {
      console.error("Error updating dish data:", error);
      dispatch({ type: "SET_SAVING_CHANGES", payload: false });
      dispatch({
        type: "DISH_STATUS",
        payload: "Error updating dish data:",
        error,
      });
    }
  };

  const handleDeleteDish = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "SET_DELETING_DISH_DATA", payload: true });
      const dishDocRef = doc(db, "dishData", id);

      // Delete the dish image from storage
      const imageRef = ref(storage, `dishData/images/${id}`);
      await deleteObject(imageRef);

      // Delete the dish data from Firestore
      await deleteDoc(dishDocRef);

      console.log("Dish data and image deleted successfully");
      dispatch({
        type: "DISH_STATUS",
        payload: "Dish data and image deleted successfully",
      });
      dispatch({ type: "SET_DELETING_DISH_DATA", payload: false });
      togglePopup(e);
      navigate("/dashboard/online-menu");
    } catch (error) {
      console.error("Error deleting dish data:", error);
      dispatch({ type: "SET_DELETING_DISH_DATA", payload: false });
      togglePopup(e);
      dispatch({
        type: "DISH_STATUS",
        payload: "Error deleting dish data:",
        error,
      });
    }
  };

  return (
    <Form>
      <div>
        <HeaderContainer>
          <h3>Edit Dish</h3>
        </HeaderContainer>
        <Label>Image:</Label>
        <ImagePreviewContainer onClick={openFileInput}>
          <UploadFileIcon className="material-symbols-outlined">
            upload_file
          </UploadFileIcon>
          <UploadFileText>Upload image</UploadFileText>

          {imageUploadLoader ? (
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          ) : (
            <ImagePreview
              src={dishImagePreview || dishData.image}
              alt={dishData.name}
            />
          )}
        </ImagePreviewContainer>

        <Input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleInputChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <Label>Name:</Label>
        <Input
          type="text"
          name="name"
          value={dishName}
          onChange={handleInputChange}
        />

        <Label>Price:</Label>
        <Input
          type="number"
          name="price"
          value={dishPrice}
          onChange={handleInputChange}
        />

        <Label>Description:</Label>
        <Input
          type="text"
          name="description"
          value={dishDescription}
          onChange={handleInputChange}
        />

        <Label>Category:</Label>
        <Select
          name="category"
          value={dishCategory}
          onChange={handleInputChange}
        >
          <Option>{dishCategory}</Option>
          {dishCategories.map((category, index) => (
            <Option key={index}>{category}</Option>
          ))}
        </Select>
        <Input
          type="text"
          name="newCategory"
          value={dishCategory}
          onChange={handleInputChange}
        />
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
        <div style={{ display: "flex", gap: "1rem" }}>
          <StyledButton
            background="red"
            color="white"
            width="100%"
            onClick={togglePopup}
          >
            Delete Dish
          </StyledButton>
          <StyledButton
            color="white"
            background="#067d62"
            width="100%"
            type="button"
            onClick={handleSubmit}
            disabled={savingChanges}
          >
            {savingChanges ? (
              <Loader width="1rem" height="1rem" border="3px solid black" />
            ) : (
              " Save Changes"
            )}
          </StyledButton>
        </div>
        <PopUp
          title="Delete Confirmation"
          togglePopup={togglePopup}
          isVisible={isPopupVisible}
        >
          <PopupBody>
            <span className="material-symbols-outlined">delete</span>
            <h5>Are you sure you want to delete this data!</h5>
            <p>This action cannot be undone.</p>
          </PopupBody>
          <PopupActions>
            <StyledButton
              background="red"
              color="white"
              width="100%"
              onClick={handleDeleteDish}
              disabled={deletingDishData}
            >
              {deletingDishData ? (
                <Loader
                  width="1.1rem"
                  height="1.1rem"
                  border="3px solid black"
                />
              ) : (
                "Delete"
              )}
            </StyledButton>
            <StyledButton
              background="grey"
              color="white"
              width="100%"
              onClick={togglePopup}
            >
              Cancel
            </StyledButton>
          </PopupActions>
        </PopUp>
        <DishStatus>{dishStatus}</DishStatus>
      </div>
    </Form>
  );
};

export default EditDishPage;
