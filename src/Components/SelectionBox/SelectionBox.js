import React from 'react';


/**
 * 
 * @param {array}  options  options displayed in the selection box. 
 * @param {id}     id       id of the select element,
 * @param {type}   onChange onChange function when selection is changed,
 * @param {number} value    default value of select element,
 */
const SelectionBox = ({options, id, onChange, value}) => {
    return(
        <select className="black ma0 pa0 hover-bg-black-20"
            id={id}
            onChange={onChange}
            value = {value}
        >
            {options.map((option, index) => {
                return (
                    <option
                        value={index}
                        key={index}
                    >
                        {option}
                    </option>
                )
            })}
        </select>
    )
}

export default SelectionBox;