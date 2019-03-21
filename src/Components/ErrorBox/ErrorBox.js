import React from 'react';

import './ErrorBox.css'

const ErrorBox = ({error}) => {
    var displayedError;
    if (error && error.length) {
        // Removes error passed from database.
        displayedError = error.split('error:')
        // Still console log the actual database error in console though.
        if (displayedError[1]) {
            console.log(displayedError[1]);
        }
        displayedError = displayedError[0].toString();
    } else if (error) {
        // otherwise it's a type error of some kind.
        displayedError = error.toString();
    }

    return (
        <div>
            {displayedError
            ? <div class='ErrorBox'>
                {displayedError}
              </div>
            : null
            }
        </div>
    )
}

export default ErrorBox