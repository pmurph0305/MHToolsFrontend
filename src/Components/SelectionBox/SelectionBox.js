import React from 'react';


/**
 * 
 * @param {array}  options  options displayed in the selection box. 
 * @param {id}     id       id of the select element,
 * @param {type}   onChange onChange function when selection is changed,
 * @param {number} value    default value of select element,
 */
const SelectionBox = ({options, id, label, onChange, value, className}) => {
    return(
        <select
            id={id}
            onChange={onChange}
            value = {value}
            className={className}
            label={label}
            aria-label={label}
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