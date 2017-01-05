import React, { Component } from 'react';
import { Navigator, View } from 'react-native';
import Firebase from 'firebase';

import { NavBar, Spinner } from './components/common';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/userArea/Home';
import RightPage from './components/userArea/RightPage';
import LeftPage from './components/userArea/LeftPage';

const ROUTES = {
    Login: LoginForm,
    Register: RegisterForm,
    Home: Home,
    rightPage: RightPage,
    leftPage: LeftPage
};

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null,
            initialRoute: true
        };
    }

    componentWillMount() {
        Firebase.initializeApp({
            apiKey: "AIzaSyBLxXQkhbVGl4VI1aDIUnpCpYX1EB2wKTs",
            authDomain: "authentication-5f38a.firebaseapp.com",
            databaseURL: "https://authentication-5f38a.firebaseio.com",
            storageBucket: "authentication-5f38a.appspot.com",
            messagingSenderId: "721680491928"
        });

        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderInitialRoute() {
        switch (this.state.loggedIn) {
            case true:
                return {name: 'Home'};
            case false:
                return {name: 'Login'};
        }
    }

    renderScene(route, navigator) {

        const Component = ROUTES[route.name]; // ROUTES['Login'] => LoginForm

        return <Component route={route} navigator={navigator}/>;
    }

    configureScene(route) {
        if (route.sceneConfig) {
            return route.sceneConfig;
        }
        return Navigator.SceneConfigs.FloatFromRight;
    }

    render() {
        if (this.state.loggedIn === null) {
            return <Spinner size='large' /> ;
        }

        return (
            <Navigator
                sceneStyle={{marginTop:60}}
                initialRoute={this.renderInitialRoute()}
                renderScene={this.renderScene}
                configureScene={this.configureScene}
                navigationBar={NavBar}
            />
        );
    }
}
