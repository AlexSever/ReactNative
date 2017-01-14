import React, { Component } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';

class Page3 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal={true}
                    style={styles.scroll}
                >
                    <Text>Scroll me plz</Text>
                    <Text>If you like</Text>
                    <Text>Scrolling down</Text>
                    <Text>What's the best</Text>
                    <Text>Framework around?</Text>
                    <Text>React Native</Text>
                </ScrollView>
                <Text style={{ marginTop: 30, fontSize: 20}}>It's a Page 2</Text>
                <Text>Slide from Right to Left to go to the next page</Text>
                <Button
                    title='Back'
                    onPress={() => alert('DA')}
                >
                    Back
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
        backgroundColor: 'gray'
    },
    scroll: {
        flex: 1,
        position: 'absolute'
    }
};

export default Page3;