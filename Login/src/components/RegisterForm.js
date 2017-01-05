import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Firebase from 'firebase';

import { Header, Button, Card, CardSection, Input, Spinner } from './common';

class RegisterForm extends Component {
    // state = { email: '' };
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errorMessage: '',
            successMessage: '',
            loading: false
        };
    }

    onRegisterButtonPress() {
        //displayName
        const { email, password, passwordConfirmation, displayName } = this.state;

        this.setState({
            errorMessage: '',
            loading: true
        });

        if (password === passwordConfirmation) {
            Firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => this.onRegisterSuccess(displayName)/*this.onRegisterSuccess.bind(this)*/)
                .catch((error) => this.onRegisterFail(error)/*this.onRegisterFail.bind(this)*/)
        } else {
            this.setState({
                errorMessage: "Password's don't match",
                loading: false
            });
        }
    }

    onRegisterFail(error) {
        console.log(error);
        this.setState({
            errorMessage: error.message,
            //errorMessage: 'Registration failed',
            loading: false
        });
    }
    // =================================
    // --- Adding NAME to user's profile
    // =================================
    onRegisterSuccess(displayName) {
        const user = Firebase.auth().currentUser;

        user.updateProfile({
            displayName: displayName
        })
            .then(this.onUpdateProfileSuccess.bind(this))
            .catch((error) => this.setState({ errorMessage: error.message }));
    }

    onUpdateProfileSuccess() {
        this.setState({
            displayName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            loading: false,
            errorMessage: '',
            successMessage: 'You have successfully registered'
        });
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

    renderSuccess() {
        if (this.state.successMessage !== '') {
            return (
                <Text style={styles.successMessageStyle}>
                    {this.state.successMessage}
                </Text>
            );
        }
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size='small'/>;
        }

        return (
            <Button
                title='Login'
                onPress={this.onRegisterButtonPress.bind(this)}
            >
                Register
            </Button>
        );
    }

    onGoBackPress() {
        this.props.navigator.pop();
    }

    render() {
        //const { errorMessageStyle, goBackTextStyle} = styles;
        //<Header headerText="Authentication" />
        return (
            <View>
                <Card>
                    <CardSection>
                        <Input
                            label='Name'
                            placeholder='username'
                            value={this.state.displayName}
                            onChangeText={displayName => this.setState({ displayName })}
                        />
                    </CardSection>
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
                    <CardSection additionalStyles={{paddingTop: 10, paddingBottom: 10}}>
                        <Input
                            secureTextEntry
                            label='Confirm Password'
                            placeholder='password'
                            value={this.state.passwordConfirmation}
                            onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
                        />
                    </CardSection>
                </Card>
                <View>

                    {this.renderError()}

                    {this.renderSuccess()}

                    {this.renderButton()}

                    <Text style={styles.goBackTextStyle}>
                        I have an account.
                        <Text style={{color: 'blue'}}
                              onPress={this.onGoBackPress.bind(this)}>
                            {' '}Go Back
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
        color: 'red',
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    successMessageStyle: {
        marginTop: 10,
        marginBottom: -8,
        fontSize: 18,
        color: 'green',
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    goBackTextStyle: {
        fontSize: 18,
        textAlign: 'center'
    }
};

export default RegisterForm;