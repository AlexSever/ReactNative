import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Button } from '../common';

import motionController from '../../gesture/motionController'

class RightPage2 extends Component {
    constructor(props) {
        super(props);
        this.motionController = new motionController();
    }

    onNextPress() {
        this.props.navigator.push({name: 'RightPage3'});
    }

    // ========================
    // --- motionController ---
    // ========================

    onResponderGrant(evt) {
        this.motionController.startMove(evt.nativeEvent);
    }

    onResponderMove(evt) {
        this.motionController.holdMove(evt.nativeEvent);
    }

    onResponderRelease(evt) {
        if (this.motionController.endMove(evt.nativeEvent) === 'left') {
            this.props.navigator.push({name: 'RightPage3'});
        }
    }

    // ========================

    render() {
        return (
            <View
                style={styles.container}
                onStartShouldSetResponder={evt => true}
                onMoveShouldSetResponder={evt => true}
                onResponderGrant={this.onResponderGrant.bind(this)}
                onResponderMove={this.onResponderMove.bind(this)}
                onResponderRelease={this.onResponderRelease.bind(this)}
            >
                <Text style={{ fontSize: 20}}>It's a Right Page 2</Text>
                <Text>Slide from Right to Left to go to the next page</Text>
                <Button
                    title='Next'
                    onPress={this.onNextPress.bind(this)}
                >
                    Next
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
        backgroundColor: '#009688'
    }
};

export default RightPage2;