export const saveToStorage = (key, data) => {
  const stringData = JSON.stringify(data)

  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.local.set({ [key]: stringData })
  } else {
    localStorage.setItem(key, stringData)
  }
};

export const loadFromStorage = async (key) => {
  
  if (typeof chrome !== "undefined" && chrome.storage) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key] ? JSON.parse(result[key]) : null)
      })
    })
  } else {
  
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
};