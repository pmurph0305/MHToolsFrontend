import React from 'react';
import './SelectionBox.scss'

/**
 * Creates a select element with the parameters passed in.
 * Uses options array index as key & value for options.
 * @param {Array}    [options] options array displayed in the selection box. 
 * @param {string}   id        id of the select element.
 * @param {string}   label     label used for label and aria-label attributes.
 * @param {string}   className css className for select element. Default if not specified.
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
            className={className ? className : "DefaultSelect"}
            label={label}
            aria-label={label}
        >
            {options ? (
                options.map((option, index) => {
                    return (
                        <option
                            value={index}
                            key={index}
                        >
                            {option}
                        </option>
                    )
                })
            ): null}
        </select>
    )
}

export default SelectionBox;