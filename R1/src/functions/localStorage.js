export const writeToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const readFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    if (null === data) {
        return [];
    }
    return JSON.parse(data);
};
