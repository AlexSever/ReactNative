import React from 'react';
import { Navigator, Text, TouchableOpacity } from 'react-native';

import CustomNavBar from './CustomNavBar';

const styles = {
    navBar: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        //height: 60,
        //paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
        //paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        //position: 'relative',
        flexDirection: 'row',
        paddingHorizontal: 15,
        shadowRadius: 1.5,
        //opacity: 0
    },
    titleStyle: {
        paddingTop: 5,
        fontSize: 17,
        fontWeight: 'bold'
    },
    leftButtonStyle: {
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 17,
        color: '#007aff',
    }
};

const NavBarRouteMapper = {
    LeftButton: (route, navigator, index, navState) =>
    {
        if (route.name === 'Page2' || route.name === 'Home') {
            return null;
        } else {
            return (
                <TouchableOpacity onPress={() => navigator.pop()}>
                    <Text style={styles.leftButtonStyle}> Back </Text>
                </TouchableOpacity>
            );
        }
    },
    Title: (route, navigator, index, navState) =>
    {   return (<Text style={styles.titleStyle}>{route.name}</Text>); },
    RightButton: (route, navigator, index, navState) =>
    {   return (<Text></Text>); }
};

const NavBar = (
    <CustomNavBar
        style={styles.navBar}
        routeMapper={NavBarRouteMapper}
    />
);

export default NavBar;