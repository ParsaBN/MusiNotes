import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li><a href="#!">Log Out</a></li>
            <li><NavLink to='/' className="btn btn-floating pink lighten-1">PLV</NavLink></li> {/* later goes to /profile */}
        </ul>
    )
}

export default SignedInLinks;