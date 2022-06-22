import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import ErrorBoundary from '../error-boundary';
import SwapiService from '../../services/swapi-service';


import {SwapiServiceProvider} from '../swapi-service-context';
import {PeoplePage, PlanetsPage, StarshipsPage, SecretPage, LoginPage} from '../pages';

import './app.css';

import {BrowserRouter as Router, Navigate, Route, Routes, useParams} from 'react-router-dom';
import StarshipDetails from '../sw-components/starship-details';


function Details() {
    let params = useParams();
    return <StarshipDetails itemId={params.id}/>
}

export default class App extends Component {

    state = {
        hasError: false,
        swapiService: new SwapiService(),
        isLoggedIn: false
    };


    onLogin = () => {
        this.setState({
            isLoggedIn:true
        })
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

        const {isLoggedIn, swapiService} = this.state;
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>

                            <RandomPlanet/>

                            <Routes>
                                <Route path='/' element={<h1> Welcome to StarDB </h1>}/>
                                <Route path='/people' element={<PeoplePage/>}/>
                                <Route path='/people/:id' element={<PeoplePage/>}/>
                                <Route path='/planets' element={<PlanetsPage/>}/>
                                <Route path='/starships' element={<StarshipsPage/>}/>
                                <Route path='/starships/:id' element={<Details/>}/>
                                <Route path='/login'
                                       element={
                                           <LoginPage
                                               isLoggedIn={isLoggedIn}
                                               onLogin={this.onLogin}
                                           />
                                       }
                                />
                                <Route path='/secret'
                                       element={
                                           <SecretPage
                                               isLoggedIn={isLoggedIn}
                                           />
                                       }
                                />
                                <Route
                                    path="*"
                                    element={<Navigate to="/" replace />}
                                />
                            </Routes>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
}
