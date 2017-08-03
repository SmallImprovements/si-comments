import React from "react";
import styled from "styled-components/native";
import { View, Text, TouchableHighlight, Button } from "react-native";
import ModalExample from "./Modal";
import Avatar from "./Avatar";

const StyledView = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	padding: 10px;
	border-bottom-width: 1px;
	border-bottom-color: #dadee1;
`;

export class NotificationItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { text, onSelect } = this.props;
		return (
			<TouchableHighlight onPress={onSelect}>
				<StyledView>
					<Avatar
						source={{
							uri:
								"http://cdn.business2community.com/wp-content/uploads/2016/03/Vd3MJo.jpg"
						}}
					/>
					<View>
						<Text>
							{text}
						</Text>
						<Text>
							{text}
						</Text>
					</View>
				</StyledView>
			</TouchableHighlight>
		);
	}
}
