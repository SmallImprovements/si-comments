import React from 'react';
import { Image } from 'react-native';

const BADGE_BY_NAME = {
	b_flowers: require('./png/b_flowers.png'),
	b_brain: require('./png/b_brain.png'),
	b_cogs: require('./png/b_cogs.png'),
	b_dollar: require('./png/b_dollar.png'),
	b_heart_pin: require('./png/b_heart_pin.png'),
	b_megaphone: require('./png/b_megaphone.png'),
	b_phone: require('./png/b_phone.png'),
	b_rocket: require('./png/b_rocket.png'),
	b_star: require('./png/b_star.png'),
	b_bricks: require('./png/b_bricks.png'),
	b_default: require('./png/b_default.png'),
	b_flags: require('./png/b_flags.png'),
	b_handshake: require('./png/b_handshake.png'),
	b_lightbulb: require('./png/b_lightbulb.png'),
	'b_no-1': require('./png/b_no-1.png'),
	b_pinwheel: require('./png/b_pinwheel.png'),
	b_smile: require('./png/b_smile.png'),
	b_thumb: require('./png/b_thumb.png'),
};

export default function Badge(props) {
	let iconSource;
	if (!props.badge) {
		iconSource = BADGE_BY_NAME['b_default'];
	} else {
		iconSource = BADGE_BY_NAME[props.badge.icon];
	}

	return <Image source={iconSource} {...props} />;
}
