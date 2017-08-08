import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import StyledInput from '../../components/StyledInput';
import { HeaderOne } from '../../components/Text';
import auth from '../../services/auth';

const USER_EMAIL = 'demo@example.com';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: USER_EMAIL,
        };
    }
    render() {
        const { currentUser } = this.props;
        const { email } = this.state;
        const login = () => auth.login(email);

        const onChange = ev => this.setState({ email: ev.target.value });
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    height: '100%',
                }}
            >
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
                    <Button onPress={login} title="Login" />
                </View>
                {!!currentUser &&
                    <Text>
                        Currently logged in as {currentUser.name}
                    </Text>}
            </View>
        );
    }
}
