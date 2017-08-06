import React from "react";
import { View, Text, Button, TextInput } from "react-native";

import auth from "../../services/auth";
import http from "../../services/http";

const BASE_URL = "http://localhost:8080";
const USER_EMAIL = "demo@example.com";
export default function Login() {
	const login = () => auth.login(USER_EMAIL);
	return (
		<View>
			<Text>LoginForm</Text>
			<TextInput placeholder="Email" />
			<TextInput placeholder="Password" />
			<Button onPress={login} title="Log in" />
		</View>
	);
}

