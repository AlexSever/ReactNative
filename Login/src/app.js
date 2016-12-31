import React, { Component } from 'react';
import { Navigator, View } from 'react-native';
import Firebase from 'firebase';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/userArea/Home';

const ROUTES = {
    login: LoginForm,
    signup: RegisterForm,
    home: Home
};

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: null
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

    renderScene(route, navigator) {
        const Component = ROUTES[route.name]; // ROUTES['login'] => LoginForm

        // navigator.immediatelyResetRouteStack([{name: 'home'}])

        return <Component route={route} navigator={navigator}/>;
    }

    render() {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{name: 'login'}}
                renderScene={this.renderScene}
                configureScene={() => Navigator.SceneConfigs.FloatFromRight}
            />
        );
    }

    // renderContent() {
    //
    //     switch (this.state.loggedIn) {
    //         case true:
    //             return (
    //                 <Button
    //                     title='Logout'
    //                     onPress={() => Firebase.auth().signOut()}
    //                 >
    //                     Logout
    //                 </Button>
    //             );
    //         case false:
    //             return <LoginForm/>;
    //         default:
    //             return <Spinner size='large' />
    //     }
    // }
    //
    //
    // render() {
    //     return (
    //         <View>
    //             <Header headerText="Authentication" />
    //             {this.renderContent()}
    //         </View>
    //     );
    // }
}

const styles = {
    container: {
        flex: 1
    }
};
