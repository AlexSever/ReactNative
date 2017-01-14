// Render somewhere

import React, { Component } from 'react';
import { Navigator, View } from 'react-native';

import NavBar from './NavBar';

import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';

const ROUTES = {
    Page2: Page2,
    Page3: Page3,
    Page4: Page4,
};

import CustomNavBar from './CustomNavBar';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null,
            initialRoute: true
        };
    }

    renderInitialRoute() {
        return {name: 'Page2', hideNavBar: true};
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

    // Route somewhere
    getMyRoute() {
        return {
            getSceneClass() {
                return MyScreen;
            },

            hideNavBar: true
        };
    }

    render() {

        return (
            <Navigator
                //navigator={navigator}
                //initialRoute={Router.getMyRoute()}
                renderNavigationBar={props => <CustomNavBar {...props} />}
                initialRoute={this.renderInitialRoute()}
                renderScene={this.renderScene}
                configureScene={this.configureScene}
                navigationBar={this.renderTopNavBar()}
            />
        );
    }
}