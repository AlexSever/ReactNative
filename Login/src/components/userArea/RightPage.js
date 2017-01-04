import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Firebase from 'firebase';

import { Button } from '../common';

class RightPage extends Component {

    onGoBackPress() {
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20}}>It's just a Right Page</Text>
                <Button
                    title='Go Back'
                    onPress={this.onGoBackPress.bind(this)}
                >
                    Go Back
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

export default RightPage;