import React from 'react';

import './ErrorBox.css'

const ErrorBox = ({error}) => {
    var displayedError;
    // convert error to string to split.
    error = error.toString();
    if (error && error.length) {
        // Removes error passed from database.
        displayedError = error.split('error:')
        // Still console log the actual database error in console though.
        if (displayedError[1]) {
            console.log(displayedError[1]);
        }
        displayedError = displayedError[0];
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