import React from 'react';
import ItemList from '../item-list/';
import {compose, withData, withSwapiService} from '../hoc-helper'

const withChildFunction = (func) => (Wrapped) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {func}
            </Wrapped>
        )
    }
}


const renderModelAndName = ({model, name}) => <span>{name} ({model})</span>;

const renderName = ({name}) => <span>{name} </span>;


const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    };
};
const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    };
};
const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    };
};


const PersonList =
    compose(
        withSwapiService(mapPersonMethodsToProps),
        withData,
        withChildFunction(renderName)
    )(ItemList)

const PlanetList =
    compose(
        withSwapiService(mapPlanetMethodsToProps),
        withData,
        withChildFunction(renderName)
    )(ItemList)
const StarshipList =
    compose(
        withSwapiService(mapStarshipMethodsToProps),
        withData,
        withChildFunction(renderModelAndName)
    )(ItemList)

export {
    PersonList,
    PlanetList,
    StarshipList,
};