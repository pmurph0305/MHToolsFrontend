import React from 'react';

const InputField = ({onClick, placeholder}) => {
    return (
        <div className="pa2">
            <input 
                placeholder={placeholder}
                id="newtask" 
                type="text" 
                aria-describedby="New Task"
                className="f6 f5-l input-reset bn fl black-80 bg-white pa2 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
            />
            <button 
                value="next"
                onClick={() => onClick(document.getElementById("newtask"))}
                className="f6 f5-l button-reset fl pv2 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
            >Add New Task</button>
        </div>
        
    )
}

export default InputField;