import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none': '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVis = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVis
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVis}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {/* props.children important! */}
                {props.children}
                <button onClick={toggleVis}>cancel</button>
            </div>
        </div>
    )
})

export default Togglable