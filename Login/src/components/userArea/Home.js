import React, { Component } from 'react';
import { View, Text, Navigator, Menu } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Firebase from 'firebase';

import { Button } from '../common';

import LeftNav from '../navigation/LeftNav';

import motionController from '../../gesture/motionController'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: ''
        };
        this.motionController = new motionController();
    }

    onLogoutButtonPress() {
        Firebase.auth().signOut();
        this.props.navigator.immediatelyResetRouteStack([{name: 'Login'}]);
    }

    onGoRightPress() {
        this.props.navigator.push({name: 'RightPage1'});
    }

    onGoLeftPress() {
        this.props.navigator.push({
            name: 'LeftPage',
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
            this.props.navigator.push({name: 'RightPage1'});
        }
    }

    // ========================

    render() {
        const Menu = <LeftNav navigator={this.props.navigator}/>;

        return (
            <SideMenu menu={Menu} >
                <View
                    style={styles.container}
                    onStartShouldSetResponder={evt => true}
                    onMoveShouldSetResponder={evt => true}
                    onResponderGrant={this.onResponderGrant.bind(this)}
                    onResponderMove={this.onResponderMove.bind(this)}
                    onResponderRelease={this.onResponderRelease.bind(this)}
                >
                    <Text style={{ fontSize: 20}}>Welcome Home {this.state.displayName}!</Text>
                    <Text>Grab the left side of the screen to see Left Menu</Text>
                    <Text>Slide from Right to Left to go to the next page</Text>
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
            </SideMenu>
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