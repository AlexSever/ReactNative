import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
        this.props.navigator.immediatelyResetRouteStack([{name: 'login'}]);
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
                <Text>Welcome Home {this.state.displayName}!</Text>
                <Button
                    title='Logout'
                    onPress={this.onLogoutButtonPress.bind(this)}
                >
                Logout
                </Button>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default Home;