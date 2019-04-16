import React from 'react';
import './DMDateNav.scss'

const DMDateNav = ({date, onClick}) => {
    return (
        <div className="dateContainer">
            <button
                value="-1"
                onClick={onClick}
                className="DateNavButton"
            >Previous</button>
            <p className="DateDisplay">{date}</p>
            <button 
                value="1"
                onClick={onClick}
                className="DateNavButton"
            >Next</button>
        </div>
    )
}

export default DMDateNav;