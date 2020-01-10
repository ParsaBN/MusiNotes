import React from 'react';
import ReactLoading from 'react-loading';

const LoadingPage = ({ type, color }) => (
    <div className="container loading-screen">
        <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
    </div> 
);

export default LoadingPage;