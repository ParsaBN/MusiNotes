import React from 'react';

const Footer = () => {
    return (
        <footer className="page-footer grey darken-3">
            <div className="container">
                <div className="row">
                    <div className="col s12 l6">
                        <h5>About me</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem tenetur sed explicabo odit necessitatibus, 
                            perferendis voluptate! Unde tenetur praesentium, illum rerum voluptatem maxime aliquam facere voluptatum minima, libero dolorum debitis.</p>
                    </div>
                    <div className="col s12 l4 offset-l2">
                        <h5>Connect</h5>
                        <ul>
                            <li><a href="#!" className="grey-text text-lighten-3">Facebook</a></li>
                            <li><a href="#!" className="grey-text text-lighten-3">Instagram</a></li>
                            <li><a href="#!" className="grey-text text-lighten-3">Twitter</a></li>
                            <li><a href="#!" className="grey-text text-lighten-3">TikTok</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright grey darken-4">
                <div className="container center-align">&copy; 2020 MusiNotes</div>
            </div>
        </footer>
    )
}

export default Footer;