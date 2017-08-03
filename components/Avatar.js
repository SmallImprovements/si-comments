import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";

const AVATAR_SIZE = 30;

export default (Avatar = styled.Image`
	border-radius: ${AVATAR_SIZE / 2}px;
	width: ${AVATAR_SIZE}px;
	height: ${AVATAR_SIZE}px;
`);
