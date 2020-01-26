import React from 'react';
import background from '../../img/background_no_1.jpg'

const Background = () => {
    const image = (
        <img className="background-img" src={background} alt="the background"/>
    )

    return (
        <div className="container background-img-container">
            { image }
        </div>
    )
}

export default Background;