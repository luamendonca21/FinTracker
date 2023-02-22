import React from "react";
import OptionSelector from "../OptionSelector";
const ListOptions = ({ options, optionsActive, onPress }) => {
  return options.map((item, index) => (
    <OptionSelector
      key={index}
      id={item.id}
      title={item.title}
      optionsActive={optionsActive}
      onPress={() => onPress(item.id)}
    />
  ));
};

export default ListOptions;
