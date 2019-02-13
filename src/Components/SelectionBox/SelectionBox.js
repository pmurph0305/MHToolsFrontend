import React from 'react';

const SelectionBox = ({options, id, onChange}) => {
    return(
        <select
            id={id}
            onChange={onChange}
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