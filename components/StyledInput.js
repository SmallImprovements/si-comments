import React from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import styleVars from "../assets/styles/vars";

const { standardPadding } = styleVars;

export default (StyledInput = styled.TextInput`  
	background: white;
	borderWidth: 1px
	borderColor: lightgray;
	padding: ${standardPadding}px;
`);
