// helper function to update objects properly.
export function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues);
}

// helper function to update an item in array by index.
export function updateItemByIndexInArray(array, itemIndex, updateItemCallback) {
    const updatedItems = array.map((item, index) => {
        if (index!== itemIndex) {
            return item;
        }
        const updatedItem = updateItemCallback(item)
        return updatedItem;
    })
    return updatedItems;
}

export function updateItemByPropertyStringInArray(array, propertyStr, propertyValue, updateItemCallback) {
    if (typeof propertyStr === 'string' || propertyStr instanceof String) {
        const updatedItems = array.map((item) => {
            if (item[propertyStr] !== propertyValue) {
                return item;
            } else {
                const updatedItem = updateItemCallback(item);
                return updatedItem;
            }
        })
        return updatedItems;
    }
}
