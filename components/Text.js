import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import styleVars from "../assets/styles/vars";

const { fontSizeXL, fontSizeL } = styleVars;

export const HeaderOne = styled.Text`
	font-size: ${fontSizeXL}px;
	font-weight: bold;
`;
export const HeaderTwo = styled.Text`font-size: ${fontSizeL}px;`;
