import React from 'react';


/**
 * Creates a select element with the parameters passed in.
 * Uses options array index as key & value for options.
 * @param {Array}    [options] options displayed in the selection box. 
 * @param {string}   id        id of the select element.
 * @param {string}   label     label used for label and aria-label attributes.
 * @param {callback} onChange  onChange function when selection is changed.
 * @param {string}   value     default value of select element.
 * @return {<select/>} Returns the select element.
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