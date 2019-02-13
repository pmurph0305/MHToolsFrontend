import React from 'react';

const NavButton = ({ buttonLabel, onRouteChange, route }) => {
    return(
        <button
            className="f6 f5-l pointer link dim white-80 dib pa3 ph4-l" 
            onClick={() => onRouteChange(route)}>
            {buttonLabel}
        </button>
    )
}

export default NavButton;