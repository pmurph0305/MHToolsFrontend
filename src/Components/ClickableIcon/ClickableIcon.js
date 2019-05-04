import React from 'react'


/**
 * @param  {string} iconName ionicon icon name
 * @param  {string} iconSize ionicon icon size (small or large)
 * @param  {function} onClick onClick event handler
 */
const ClickableIcon = ({ iconName, iconSize, onClick }) => {
    return (
        <ion-icon
            name={iconName}
            onClick={onClick}
            size={iconSize ? iconSize : "default"}            
        />
    )
}

export default ClickableIcon;