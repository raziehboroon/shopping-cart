export const shorten = (name) => {
  const splited_name = name.split(" ");
  return `${splited_name[0]} ${splited_name[1]}`;
};

export const isInCart = (id, state) => {
  return !!state.selectedItems.find((item) => item.id === id);
};

export const quantityCount = (id, state) => {
  const index = state.selectedItems.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  } else {
    return state.selectedItems[index].quantity;
  }
};
