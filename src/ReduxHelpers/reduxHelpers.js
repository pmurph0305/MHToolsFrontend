// helper function to update objects properly.
export function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}

export function resetState(state, initialState) {
  return updateObject(state, initialState);
}

// helper function to update an item in array by index.
export function updateItemByIndexInArray(array, itemIndex, updateItemCallback) {
  const updatedItems = array.map((item, index) => {
    if (index !== itemIndex) {
      return item;
    }
    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });
  return updatedItems;
}

export function updateItemByPropertyStringInArray(
  array,
  propertyStr,
  propertyValue,
  updateItemCallback
) {
  if (typeof propertyStr === "string" || propertyStr instanceof String) {
    const updatedItems = array.map(item => {
      if (item[propertyStr] !== propertyValue) {
        return item;
      } else {
        const updatedItem = updateItemCallback(item);
        return updatedItem;
      }
    });
    return updatedItems;
  }
}
/**
 * Sends a fetch request with window.sessionStorage.getItem('token')
 * and headers of application/json and authorization token.
 * @param  {string} url Url to send fetch request to.
 * @param  {string} method Method of the fetch request (default GET)
 * @param  {Object} body Object sent with fetch if it exists. (default null)
 */
export const fetchURLWithJsonAuth = (url, method, body) => {
  const token = window.sessionStorage.getItem("token");
  return fetch(url, {
    method: method ? method : "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: body ? JSON.stringify(body) : null
  });
};
