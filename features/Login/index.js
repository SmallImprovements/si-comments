import React, { Component } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator, Alert } from 'react-native';
import StyledInput from '../../components/StyledInput';
import { HeaderOne } from '../../components/Text';
import auth from '../../services/auth';

const USER_EMAIL = 'demo@example.com';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: USER_EMAIL,
      isLoggingIn: false,
    };
    this.logUserIn = this.logUserIn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  logUserIn() {
    const { email } = this.state;

    this.setState({ isLoggingIn: true });

    auth.login(this.state.email).catch(err => {
      const { message } = err;
      this.setState({ isLoggingIn: false });
      this.showErrorAlert(message);
    });
  }

  handleInputChange(value) {
    this.setState({ email: value });
  }

  showErrorAlert(message) {
    Alert.alert(
      "Can't Log In",
      `Either your email address or password is incorrect. ${message}`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: true }
    );
  }
  render() {
    const { currentUser } = this.props;
    const { email, isLoggingIn, loginError } = this.state;
    const { logUserIn, handleInputChange } = this;
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
          : <View>
              <HeaderOne style={{ textAlign: 'center', marginBottom: 20 }}>Please Log In</HeaderOne>
              <View>
                <View>
                  <StyledInput
                    onChangeText={this.handleInputChange}
                    value={email}
                    placeholder="Your email"
                    style={{ marginBottom: 20 }}
                  />
                </View>
              </View>

              <View>
                <Button onPress={logUserIn} title="Login" />
              </View>
            </View>}
      </View>
    );
  }
}
