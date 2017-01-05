import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';
import Firebase from 'firebase';

import { Button } from '../common';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: ''
        };
    }

    onLogoutButtonPress() {
        Firebase.auth().signOut();
        this.props.navigator.immediatelyResetRouteStack([{name: 'Login'}]);
    }

    onGoRightPress() {
        this.props.navigator.push({name: 'rightPage'});
    }

    onGoLeftPress() {
        this.props.navigator.push({
            name: 'leftPage',
            sceneConfig: Navigator.SceneConfigs.FloatFromLeft
        });
    }

    componentWillMount() {
        const user = Firebase.auth().currentUser;
        //const { displayName, email } = user;
        const displayName = user.displayName || 'User';
        const email = user.email;

        this.setState({
            displayName: displayName,
            email: email
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20}}>Welcome Home {this.state.displayName}!</Text>
                <Button
                    title='Logout'
                    onPress={this.onLogoutButtonPress.bind(this)}
                >
                Logout
                </Button>
                <Button
                    title='Go Right'
                    onPress={this.onGoRightPress.bind(this)}
                >
                    Go Right
                </Button>
                <Button
                    title='Go Left'
                    onPress={this.onGoLeftPress.bind(this)}
                >
                    Go Left
                </Button>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFF80'
    }
};

export default Home;