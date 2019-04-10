import React from 'react';

import './ErrorBox.css'

const ErrorBox = ({error}) => {
    var displayedError;
    if (error && error.length) {
        // convert error to string to split.
        error = error.toString();
        // Removes error passed from database.
        displayedError = error.split('error:')
        // Still console log the actual database error in console though.
        if (displayedError[1]) {
            console.log(displayedError[1]);
        }
        displayedError = displayedError[0].trim();
    }

    return (
        <div>
            {displayedError
            ? <div className='ErrorBox'>
                {displayedError}
              </div>
            : null
            }
        </div>
    )
}

export default ErrorBox