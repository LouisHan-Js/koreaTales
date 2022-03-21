import React from 'react';

const Screen = ({page, css}) => {
    return (
        <div className='screen' style={css}>
            {page}
        </div>
    )
}

export default Screen