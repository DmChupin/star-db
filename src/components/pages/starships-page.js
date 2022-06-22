import React, {Component} from 'react';
import {StarshipList} from '../sw-components';
import {useNavigate } from 'react-router-dom';

const StarshipsPage =() => {
    const navigate = useNavigate();

    return (
        <StarshipList
            onItemSelected={(itemId) => {
                navigate(itemId);
        }}/>
    );
}
export default StarshipsPage;
