import React from 'react';

/**
 * @buttonLabel Text displayed on the button
 * @liClass className for each button li element {"dib"}
 * @onRouteChange onClick function
 * @route Text to give to onRouteChange when clicked
 */
const NavButtonLi = ({ buttonLabel, onRouteChange, route, liClass}) => {
    return(
        <li className={liClass ? liClass : "dib"}>
            <button
                className="f6 f5-l pointer link dim white-80 dib pa3 ph4-l"
                onClick={() => onRouteChange(route)}>
                {buttonLabel}
            </button>
        </li>
    )
}

export default NavButtonLi;