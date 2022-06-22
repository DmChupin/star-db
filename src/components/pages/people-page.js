import React from 'react';

import {PersonDetails, PersonList} from '../sw-components';
import Row from '../row';
import {useNavigate, useParams} from 'react-router-dom';

const PeoplePage = () => {
    const navigate = useNavigate();
    const params = useParams()

    return (
        <Row
            left={<PersonList onItemSelected={(itemId) => {
                navigate(`/people/${itemId}`);
            }}/>}
            right={<PersonDetails itemId={params?.id}/>}
        />
    );
}

export default PeoplePage;