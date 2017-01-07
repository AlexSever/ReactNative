import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Button } from '../common';

class RightPage2 extends Component {
    constructor(props) {
        super(props);
    }

    onGoBackPress() {
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 20}}>It's a Right Page 3</Text>
                <Text>Last page for Now!!!</Text>
                <Button
                    title='Go Back'
                    onPress={this.onGoBackPress.bind(this)}
                    additionalStyles={{backgroundColor: 'crimson', borderColor: 'crimson'}}
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
        alignItems: 'center',
        backgroundColor: '#777'
    }
};

export default RightPage2;