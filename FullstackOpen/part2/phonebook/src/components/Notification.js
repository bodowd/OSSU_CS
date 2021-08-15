import React from 'react'

const Notification = ({message, divclass}) => {
    if (message === null) {
        return null
    }
    return (
        <div className={divclass}>
            {message}
        </div>
    )
}

export default Notification