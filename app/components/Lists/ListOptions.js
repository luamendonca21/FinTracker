import React from "react";
import DropDownSelector from "../DropDownSelector";
import OptionSelector from "../OptionSelector";
const ListOptions = ({
  options,
  handleOnChange,
  optionsActive,
  onPress,
  handleDropDownPressed,
}) => {
  return options.map((item, index) =>
    item.title == "Quando estiver perto de um local personalizado" ? (
      <DropDownSelector
        key={index}
        id={item.id}
        title={item.title}
        itemsActive={optionsActive}
        handleOnChange={(text) => handleOnChange(text, item.id)}
        onPress={() => handleDropDownPressed(item.id, item.title)}
      />
    ) : (
      <OptionSelector
        key={index}
        id={item.id}
        title={item.title}
        optionsActive={optionsActive}
        onPress={() => onPress(item.id, item.title)}
      />
    )
  );
};

export default ListOptions;
