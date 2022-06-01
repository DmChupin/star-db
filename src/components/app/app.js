import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';

import './app.css';

import {SwapiServiceProvider} from '../swapi-service-context';
import ErrorBoundary from '../error-boundary';
import SwapiService from '../../services/swapi-service';
import {PeoplePage, PlanetsPage, StarshipsPage} from '../pages';


export default class App extends Component {


    state = {
        hasError: false,
        swapiService: new SwapiService(),
    };


    componentDidCatch() {
        this.setState({hasError: true});
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ? //Заглушка, надо приделать тестовый сервис
                SwapiService : SwapiService;
            return {
                swapiService: new Service()
            }
        })
    };

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange}/>

                        <RandomPlanet />

                        <PeoplePage/>
                        <PlanetsPage/>
                        <StarshipsPage/>
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
}
