import React, { Component } from 'react';
import { Navigator, View } from 'react-native';
import Firebase from 'firebase';

import { Spinner } from './components/common';

import NavBar from './components/navigation/NavBar';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/userArea/Home';
import RightPage1 from './components/userArea/RightPage1';
import RightPage2 from './components/userArea/RightPage2';
import RightPage3 from './components/userArea/RightPage3';
import LeftPage from './components/userArea/LeftPage';

const ROUTES = {
    Login: LoginForm,
    Register: RegisterForm,
    Home: Home,
    RightPage1: RightPage1,
    RightPage2: RightPage2,
    RightPage3: RightPage3,
    LeftPage: LeftPage
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

    renderTopNavBar() {
        return NavBar;
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
                navigationBar={this.renderTopNavBar()}
            />
        );
    }
}
