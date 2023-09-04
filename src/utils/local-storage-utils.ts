export const checkItemInLocalStorage = (itemName: string): boolean => {
  return localStorage.getItem(itemName) ? true : false;
};

export const setItemInLocalStorage = <T>(itemName: string, object: T) => {
  localStorage.setItem(itemName, JSON.stringify(object));
};

export const clearItemInLocalStorage = (itemName: string) => {
  localStorage.removeItem(itemName);
};

export const getItemFormLocalStorage = <T>(itemName: string): T => {
  const localStorageItem = localStorage.getItem(itemName);
  if (!localStorageItem) throw new Error('You need to create a object');
  return JSON.parse(localStorageItem) as T;
};
