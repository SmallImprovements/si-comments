import React from 'react';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import colorVars from '../../assets/styles/colours';

import HeartIcon from './styled/HeartIcon';
import Container from './styled/Container';
import LikeText from './styled/LikeText';

const propTypes = {
    onLike: PropTypes.func.isRequired,
    isLiked: PropTypes.bool.isRequired,
};

class LikeButton extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({ isLiked: this.props.isLiked });
    }

    render() {
        const { isLoading, isLiked, onLike } = this.props;

        return (
            <TouchableOpacity onPress={onLike}>
                <ButtonContents isLoading={isLoading} isLiked={isLiked} />
            </TouchableOpacity>
        );
    }
}

function ButtonContents({ isLoading, isLiked }) {
    return (
        <Container>
            {!isLoading && isLiked && <HeartIcon resizeMode="contain" source={require('./png/heart.png')} />}
            {!isLoading && !isLiked && <HeartIcon resizeMode="contain" source={require('./png/heart-o.png')} />}
            {isLoading && <ActivityIndicator color={colorVars.SIBlue} style={{ marginRight: 10 }} />}
            <LikeText>{isLiked ? 'Liked' : 'Like'}</LikeText>
        </Container>
    );
}

LikeButton.propTypes = propTypes;

export default LikeButton;
