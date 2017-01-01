import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Firebase from 'firebase';

import { Header, Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    // state = { email: '' };
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            loading: false
        };
    }

    onLoginButtonPress() {
        const { email, password } = this.state;

        this.setState({
            errorMessage: '',
            loading: true
        });

        Firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch((error) => this.onLoginFail(error));
    }

    onLoginFail(error) {
        this.setState({
            errorMessage: error.message,
            //errorMessage: 'Login failed',
            loading: false
        });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            errorMessage: ''
        });
        this.props.navigator.immediatelyResetRouteStack([{name: 'home'}]);
    }

    renderError() {
        if (this.state.errorMessage !== '') {
            return (
                <Text style={styles.errorMessageStyle}>
                    {this.state.errorMessage}
                </Text>
            );
        }
    }

    renderButton() {
        if (this.state.loading) {
            return (
                <View style={{height: 62}}>
                    <Spinner size='small'/>
                </View>
            );
        }

        return (
            <Button
                title='Login'
                onPress={this.onLoginButtonPress.bind(this)}
            >
                Login
            </Button>
        );
    }

    onRegisterPress() {
        this.props.navigator.push({name: 'signup'});
    }

    render() {
        //const { errorMessageStyle, registerTextStyle } = styles;

        return (
            <View>
                <Header headerText="Authentication" />
                <Card>
                    <CardSection>
                        <Input
                            label='Email'
                            placeholder='user@email.com'
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            secureTextEntry
                            label='Password'
                            placeholder='password'
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                        />
                    </CardSection>
                </Card>
                <View>

                    {this.renderError()}

                    {this.renderButton()}

                    <Text style={styles.registerTextStyle}>
                        Don't have an account?
                        <Text style={{color: 'blue'}}
                              onPress={this.onRegisterPress.bind(this)}>
                            {' '}Register
                        </Text>
                    </Text>

                </View>
            </View>
        );
    }
}

const styles = {
    errorMessageStyle: {
        marginTop: 10,
        marginBottom: -8,
        fontSize: 18,
        textAlign: 'center',
        color: 'red',
        marginLeft: 5,
        marginRight: 5
    },
    registerTextStyle: {
        fontSize: 18,
        textAlign: 'center'
    }
};

export default LoginForm;