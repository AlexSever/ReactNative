import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Firebase from 'firebase';

import { Button } from '../common';

class Home extends Component {

    onLogoutButtonPress() {
        Firebase.auth().signOut();
        this.props.navigator.immediatelyResetRouteStack([{name: 'login'}]);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome Home!</Text>
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