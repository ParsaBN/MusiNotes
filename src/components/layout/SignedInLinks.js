import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li><a href="#!" onClick={ props.logOut }>Log Out</a></li>
            <li><NavLink to='/' className="btn btn-floating pink lighten-1">PLV</NavLink></li> {/* later goes to /profile */}
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);