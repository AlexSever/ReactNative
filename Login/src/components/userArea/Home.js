import React, { Component } from 'react';
import { View, Text, Navigator, Menu, ScrollView, TextInput } from 'react-native';
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
        //console.log(evt);
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
                    onResponderTerminationRequest={evt => true}
                    //onResponderReject={evt => true}
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

/*
 <ScrollView >

 <ScrollView horizontal={true}>
 <Text style = {styles.profit_cash}>P1</Text><TextInput
 style={{width:100, color: '#fff'}}
 value={this.state.searchText}
 //onChange={this.setSearchText.bind(this)}
 placeholder="Search" />
 <Text style = {styles.profit_cash}>P2 Hello world Bla bla</Text>
 <TextInput
 style={{width:100, color: '#fff'}}
 value={this.state.searchText}
 //onChange={this.setSearchText.bind(this)}
 placeholder="Search" />
 <Text style = {styles.profit_cash}>P2 Hello world Bla bla2222</Text>

 </ScrollView>

 <TextInput
 style={{width:100, height: 300, color: '#f0f'}}
 value={this.state.searchText}
 //onChange={this.setSearchText.bind(this)}
 placeholder="Search2" />
 <Text style = {styles.profit_cash}>Hello World2</Text>
 <TextInput
 style={{width:100, height: 300, color: '#f0f'}}
 value={this.state.searchText}
 //onChange={this.setSearchText.bind(this)}
 placeholder="Search3" />
 <TextInput
 style={{width:100, color: '#f0f'}}
 value={this.state.searchText}
 //onChange={this.setSearchText.bind(this)}
 placeholder="Search4" />
 </ScrollView>
 */