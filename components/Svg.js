import React from 'react';
import SVGImage from 'react-native-svg-image';

export default function Svg(props) {
	const { source } = props;
	return <SVGImage source={source} {...props} />;
}
