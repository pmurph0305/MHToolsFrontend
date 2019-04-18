import React from 'react'

const ClickableIcon = ({ iconName, iconSize, onClick }) => {
    return (
        <ion-icon
            name={iconName}
            onClick={onClick}
            size={iconSize ? iconSize : "medium"}            
        />
    )
}

export default ClickableIcon;