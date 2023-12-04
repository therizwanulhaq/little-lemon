import React, { useState } from "react";
import DishAddon from "./DishAddon";

const DishDetails = () => {
  const [selectedAddons, setSelectedAddons] = useState([]);

  const handleAddAddon = (addonName) => {
    setSelectedAddons([...selectedAddons, addonName]);
  };

  const handleRemoveAddon = (addonName) => {
    const updatedAddons = selectedAddons.filter((addon) => addon !== addonName);
    setSelectedAddons(updatedAddons);
  };

  return (
    <div>
      {/* Dish details go here */}
      <DishAddon
        name="Extra Cheese"
        price={2.5}
        onAdd={() => handleAddAddon("Extra Cheese")}
        onRemove={() => handleRemoveAddon("Extra Cheese")}
      />
      {/* Add more DishAddon components for other addons */}
    </div>
  );
};

export default DishDetails;
