import React from 'react';

const InputField = ({onClick, placeholder}) => {
    let textInput = React.createRef();
    function handleClick() {
        onClick(textInput.current);
    }

    return (
        <div className="pa2">
            <input 
                ref={textInput}
                placeholder={placeholder}
                id="newtask" 
                type="text" 
                aria-describedby="New Task"
                className="f6 f5-l input-reset fl black-80 bg-white pa2 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
            />
            <button 
                value="add_task"
                onClick={handleClick}
                 //onClick={() => onClick(document.getElementById("newtask").value)}
                className="f6 f5-l babutton-reset fl pv2 tc bn bg-animate bg-black hover-bg-black-70 white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
            >Add New Task</button>
        </div>
    )
}

export default InputField;