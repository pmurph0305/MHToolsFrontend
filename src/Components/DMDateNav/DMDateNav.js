import React from 'react';
import './DMDateNav.css'

const DMDateNav = ({date, onClick}) => {
    return (
        <div className="dateContainer">
            <button
                value="-1"
                onClick={onClick}
                className="f6 dim ph3 pv2 mb2 dib white bg-black pointer"
                
            >Previous</button>
            <p className="f3">{date}</p>
            <button 
                value="1"
                onClick={onClick}
                className="f6 dim ph3 pv2 mb2 dib white bg-black pointer"
            >Next</button>
        </div>
    )
}

export default DMDateNav;