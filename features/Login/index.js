import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import StyledInput from '../../components/StyledInput';
import { HeaderOne } from '../../components/Text';
import auth from '../../services/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const USER_EMAIL = 'demo@example.com';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: USER_EMAIL,
      isLoggingIn: false,
    };
    this.logUserIn = this.logUserIn.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.focusTextField = this.focusTextField.bind(this);
    this.inputRefs = {};
  }
  logUserIn() {
    const { email } = this.state;

    this.setState({ isLoggingIn: true });

    auth.login(email).catch(err => {
      const { message } = err;
      this.setState({ isLoggingIn: false });
      this.showErrorAlert(message);
    });
  }

  focusTextField(id) {
    this.inputRefs[id].focus();
  }

  handleEmailChange(value) {
    this.setState({ email: value });
  }

  showErrorAlert(message) {
    /* eslint-disable no-console */
    Alert.alert(
      "Can't Log In",
      `Either your email address or password is incorrect. ${message}`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: true }
    );
    /* eslint-enable no-console */
  }
  render() {
    // const { currentUser } = this.props;
    const { email, isLoggingIn } = this.state;
    const { logUserIn } = this;

    const emailFieldProps = {
      onChangeText: this.handleEmailChange,
      value: email,
      placeholder: 'Your Email',
      style: { marginBottom: 20 },
      autoCapitalize: 'none',
      autoCorrect: false,
      keyboardType: 'email-address',
      returnKeyType: 'next',
      blurOnSubmit: false,
      onSubmitEditing: () => {
        this.focusTextField('passwordField');
      },
      clearButtonMode: 'while-editing',
    };

    const passwordFieldProps = {
      placeholder: 'Your password',
      style: { marginBottom: 20 },
      onSubmitEditing: logUserIn,
      secureTextEntry: true,
      blurOnSubmit: true,
      keyboardType: 'default',
      returnKeyType: 'go',
      innerRef: input => (this.inputRefs.passwordField = input),
    };
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          height: '100%',
        }}
      >
        {isLoggingIn
          ? <View>
              <ActivityIndicator />
              <Text style={{ textAlign: 'center', marginTop: 20 }}>Logging In...</Text>
            </View>
          : <KeyboardAwareScrollView
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                height: '100%',
              }}
              keyboardShouldPersistTaps="always"
            >
              <HeaderOne style={{ textAlign: 'center', marginBottom: 20 }}>Please Log In</HeaderOne>
              <View>
                <View>
                  <StyledInput {...emailFieldProps} />
                  <StyledInput {...passwordFieldProps} />
                </View>
              </View>

              <View>
                <Button onPress={logUserIn} title="Login" />
              </View>
            </KeyboardAwareScrollView>}
      </View>
    );
  }
}
