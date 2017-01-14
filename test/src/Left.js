import React, { Component } from 'react';
import { View, Text, Navigator, Button, Menu } from 'react-native';

class Left extends Component {

    constructor(props) {
        super(props);
    }

    onRightPage1Press() {
        //this.props.navigator.push({name: 'RightPage1'});
    }

    onRightPage2Press() {
        //this.props.navigator.push({name: 'RightPage2'});
    }

    onRightPage3Press() {
        //this.props.navigator.push({name: 'RightPage3'});
    }

    onLeftPagePress() {
        // this.props.navigator.push({
        //     name: 'LeftPage',
        //     sceneConfig: Navigator.SceneConfigs.FloatFromLeft
        // });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title='RightPage1'
                    onPress={this.props._handleChangeTab.bind(null, 1)}
                >
                    RightPage1
                </Button>
                <Button
                    title='RightPage2'
                    onPress={this.onRightPage2Press.bind(this)}
                >
                    RightPage2
                </Button>
                <Button
                    title='RightPage3'
                    onPress={this.onRightPage3Press.bind(this)}
                >
                    RightPage3
                </Button>
                <Button
                    title='LeftPage'
                    onPress={this.onLeftPagePress.bind(this)}
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
        backgroundColor: '#765942'
    }
};

export default Left;