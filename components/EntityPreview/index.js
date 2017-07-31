import React from "react";
import styled from "styled-components/native";
import { View, Text, Image, Alert, TouchableHighlight } from "react-native";
import Card from "../Card";
import Flex from "../Flex";

const ENTITY_TYPES = ["OBJECTIVE", "PRAISE"];
export default function EntityPreview({ entity, type }) {
	console.log(entity);
	switch (type) {
		case "OBJECTIVE":
			return <ObjectivePreview {...entity} />;
		case "PRAISE":
			return <PraisePreview {...entity} />;
		default:
			return <PraisePreview {...entity} />;
	}
}
const showAlert = () =>
	Alert.alert(
		"Open in Small Improvements?",
		"You'll be redirected to the Small Improvements app your browser",
		[
			{ text: "Open", onPress: () => console.log("Open Pressed") },
			{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
			}
		]
	);
function ObjectivePreview({ title, author, cycleName }) {
	return (
		<Card>
			<Flex>
				<ObjectiveIcon
					source={require("../../assets/images/objective_icon.png")}
				/>
				<View>
					<TouchableHighlight onPress={showAlert}>
						<Text>
							{title}
						</Text>
					</TouchableHighlight>
					<Text style={{ color: "#777" }}>
						{cycleName}
					</Text>
				</View>
			</Flex>
		</Card>
	);
}

function PraisePreview({ title, author }) {
	return (
		<Card>
			<Text>Praise</Text>
		</Card>
	);
}

const ObjectiveIcon = styled.Image`
	width: 40px;
	height: 40px;
	border-radius: 3px;
	margin-right: 10px;
`;
