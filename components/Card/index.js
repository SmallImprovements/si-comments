import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import styleVars from "../../assets/styles/vars";

const {
	standardPadding,
	cardBorderRadius,
	cardBoxShadow,
	cardBorderColor,
	cardMargin
} = styleVars;
export default (Card = styled.View`
	padding: ${standardPadding}px;
	background-color: white;
	border-color: ${cardBorderColor};
	border-width: 1px;
	margin: ${cardMargin}px;
	border-radius: ${cardBorderRadius}px;
	shadowColor: black;
	shadowOffset: 2px;
	shadowOpacity: 0.04;
	shadowRadius: 4px;
`);
