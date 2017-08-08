import React, { Component } from "react";
import { View, Text, Button, TextInput } from "react-native";

import auth from "../../services/auth";

const BASE_URL = "http://localhost:8080";
const USER_EMAIL = "demo@example.com";

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: USER_EMAIL
		};
	}
	render() {
		const { currentUser } = this.props;
		const { email } = this.state;
		const login = () => auth.login(email);
		const logout = () => auth.logout();

		const onChange = ev => this.setState({ email: ev.target.value });
		return (
			<View>
				<Text>Mock Login</Text>

				<View>
					<Text>Email Address</Text>
					<View>
						<TextInput
							onChange={onChange}
							value={email}
							placeholder="Your email"
						/>
					</View>
				</View>

				<View>
					<Button onPress={login} title="Login" />
					<Button onPress={logout} title="Logout" />
				</View>
				{!!currentUser &&
					<Text>
						Currently logged in as {currentUser.name}
					</Text>}
			</View>
		);
	}
}
