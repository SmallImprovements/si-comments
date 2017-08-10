import React, { Component } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
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
    }
    logUserIn() {
        this.setState({ isLoggingIn: true });
        auth.login(this.state.email).then(err => {
            this.setState({ isLoggingIn: false });
        });
    }
    render() {
        const { currentUser } = this.props;
        const { email, isLoggingIn } = this.state;
        // const login = () => auth.login(email);

        const onChange = ev => this.setState({ email: ev.target.value });
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
                                      onChange={onChange}
                                      value={email}
                                      placeholder="Your email"
                                      style={{ marginBottom: 20 }}
                                  />
                              </View>
                          </View>

                          <View>
                              <Button onPress={this.logUserIn} title="Login" />
                          </View>
                          {!!currentUser &&
                              <Text>
                                  Currently logged in as {currentUser.name}
                              </Text>}
                      </View>}
            </View>
        );
    }
}
