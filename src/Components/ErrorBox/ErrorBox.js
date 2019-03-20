import React from 'react';

import './ErrorBox.css'

const ErrorBox = ({error}) => {
    if (error) {
        // Removes error passed from database.
        var displayedError = error.split('error:')
        // Still console log the actual database error in console though.
        if (displayedError[1]) {
            console.log(displayedError[1]);
        }
    }
    return (
        <div class='ErrorBox'>
            {displayedError[0]}
        </div>
    )
}

export default ErrorBox