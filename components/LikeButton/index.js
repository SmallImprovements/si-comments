import React from 'react';
import { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import colorVars from '../../assets/styles/colours';

const propTypes = {
    onLike: PropTypes.func.isRequired,
    isLiked: PropTypes.bool.isRequired,
};

const StyledLikeButton = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

const HeartIcon = styled.Image`
    width: 15px;
    height: 15px;
    margin-right: 5px;
`;

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
        <StyledLikeButton>
            {!isLoading && isLiked && <HeartIcon resizeMode="contain" source={require('./png/heart.png')} />}
            {!isLoading && !isLiked && <HeartIcon resizeMode="contain" source={require('./png/heart-o.png')} />}
            {isLoading && <ActivityIndicator color={colorVars.SIBlue} style={{ marginRight: 10 }} />}
            <Text style={{ color: colorVars.SIBlue }}>{isLiked ? 'Liked' : 'Like'}</Text>
        </StyledLikeButton>
    );
}

LikeButton.propTypes = propTypes;

export default LikeButton;
