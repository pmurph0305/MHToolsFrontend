import React from 'react';

/**
 * @param {string} buttonLabel text displayed on the button
 * @param {string} liClasss className for each button li element default: null
 * @param {eventHandler} onRouteChange onClick function callback
 * @param {string} route Text to give to onRouteChange when clicked
 */
const NavButtonLi = ({ buttonLabel, onRouteChange, route, style, liClass}) => {
    return(
        <li className={liClass ? liClass : null}>
            <button
                onClick={() => onRouteChange(route)}>
                {buttonLabel}
            </button>
        </li>
    )
}

export default NavButtonLi;