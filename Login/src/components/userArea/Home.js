import React, { Component } from 'react';
import { Navigator, View, Text } from 'react-native';

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome Home!</Text>
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