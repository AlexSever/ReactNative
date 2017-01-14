import React, { Component } from 'react';
import { View, StyleSheet, Menu } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import SideMenu from 'react-native-side-menu';

import Left from './Left';
import Page2 from './Page2';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class App extends Component {
    state = {
        index: 0,
        routes: [
            { key: '1', title: 'First' },
            { key: '2', title: 'Second' },
        ],
    };

    _handleChangeTab = (index) => {
        this.setState({ index });
    };

    _renderHeader = (props) => {
        return <TabBar {...props} />;
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <View style={[ styles.page, { backgroundColor: '#ff4081' } ]} />;
            case '2':
                return <Page2 _handleChangeTab={this._handleChangeTab}/>;
                //return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
            default:
                return null;
        }
    };

    render() {
        const menu = <Left _handleChangeTab={this._handleChangeTab}/>;

        return (
            <SideMenu menu={menu}>
                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    //renderHeader={this._renderHeader}
                    onRequestChangeTab={this._handleChangeTab}
                />
            </SideMenu>
        );
    }
}

// renderContent() {
//
//     switch (this.state.loggedIn) {
//         case true:
//             return (
//                 <Button
//                     title='Logout'
//                     onPress={() => Firebase.auth().signOut()}
//                 >
//                     Logout
//                 </Button>
//             );
//         case false:
//             return <LoginForm/>;
//         default:
//             return <Spinner size='large' />
//     }
// }
//
//
// render() {
//     return (
//         <View>
//             <Header headerText="Authentication" />
//             {this.renderContent()}
//         </View>
//     );
// }