import React, { Component } from 'react';
import { View,
    Text,
    Navigator,
    Menu,
    ScrollView,
    TextInput,
    PanResponder
} from 'react-native';

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
            email: '',
            coordinates: { x: 0, y: 0 }
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

        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            //onStartShouldSetPanResponder: (evt, gestureState) => true,
            //onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            //onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onMoveShouldSetPanResponder:(evt, gestureState) => {
                //this.getCoordinates(gestureState);
            },

            onPanResponderGrant: (evt, gestureState) => {
                // The guesture has started. Show visual feedback so the user knows
                // what is happening!

                // gestureState.d{x,y} will be set to zero now
            },
            onPanResponderMove: (evt, gestureState) => {

                this.getDirection(gestureState);
                // The most recent move distance is gestureState.move{X,Y}

                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                if (this.state.coordinates.x < -20) {
                    this.props.navigator.push({name: 'RightPage1'});
                }
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
                return true;
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        });
    }

    getDirection(gestureState) {

        const { moveX, moveY, dx, dy, vx, vy } = gestureState;

        //const draggedLeft = dx < -20;
        //const draggedRight = dx > 20;

        let dragDirection = '';
        // if Dragging Horizontally
        if ((Math.abs(dx) > Math.abs(dy * 3)) &&
            (Math.abs(vx) > Math.abs(vy * 3))) {

            this.setState({
                coordinates: { x: dx, y: dy }
            });

            //if (draggedLeft) {
                //dragDirection = 'dragged left';
                //console.log(dragDirection);
                // this.setState({
                //     direction: dragDirection
                // });
            //    return dragDirection = 'dragged left';
            //}
            // if (draggedRight) {
            //     return dragDirection +=  'dragged right';
            // }
        }

        //if (dragDirection) return dragDirection;
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
                <View style={styles.container}>
                    <ScrollView>
                <ScrollView
                    horizontal={true}
                    style={{marginTop: 40}}
                    //scrollEnabled={true}
                >
                    <Text style={{fontSize:20}}>Scroll me plz</Text>
                    <Text style={{fontSize:20}}>If you like</Text>
                    <Text style={{fontSize:20}}>Scrolling down</Text>
                    <Text style={{fontSize:20}}>What's the best</Text>
                    <Text style={{fontSize:20}}>Framework around?</Text>
                    <Text style={{fontSize:20}}>React Native</Text>
                </ScrollView>

                <View

                    //onStartShouldSetResponder={evt => true}
                    //onMoveShouldSetResponder={evt => true}
                    //onResponderTerminationRequest={evt => true}
                    //onResponderGrant={this.onResponderGrant.bind(this)}
                    //onResponderMove={this.onResponderMove.bind(this)}
                    //onResponderRelease={this.onResponderRelease.bind(this)}
                    {...this._panResponder.panHandlers}
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
                        </ScrollView>
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