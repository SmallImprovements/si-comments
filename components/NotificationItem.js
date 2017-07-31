import React from "react";
import styled from "styled-components/native";
import { View, Text, TouchableHighlight, Button } from "react-native";
import ModalExample from "./Modal";
import Avatar from "./Avatar";
import CommentScreen from "../screens/CommentScreen";
const StyledView = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	padding: 10px;
	border-bottom-width: 1px;
	border-bottom-color: #dadee1;
`;

export class NotificationItem extends React.Component {
	constructor() {
		super();
		this.toggleModalOpen = this.toggleModalOpen.bind(this);
	}
	state = {
		isModalOpen: false
	};

	toggleModalOpen() {
		this.setState({ isModalOpen: !this.state.isModalOpen });
	}
	render() {
		const { text } = this.props;
		return (
			<View>
				<TouchableHighlight onPress={this.toggleModalOpen}>
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
				<ModalContent
					modalVisible={this.state.isModalOpen}
					closeAction={this.toggleModalOpen}
				/>
			</View>
		);
	}
}

function ModalContent({ modalVisible, closeAction }) {
	const navigationProps = {
		onClose: closeAction
	};
	return (
		<ModalExample modalVisible={modalVisible}>
			<CommentScreen screenProps={navigationProps} />
		</ModalExample>
	);
}
