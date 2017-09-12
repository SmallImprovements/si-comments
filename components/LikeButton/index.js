import React from 'react';
import { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
// import * as MessageVotingService from '../../../../../../screens/message/services/message-voting/service';
import { likePraise, unlikePraise } from '../../services/api';

const propTypes = {
    praise: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
};

class LikeButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };

        this.onVote = this.onVote.bind(this);
    }

    onVote(canVoteUp, canVoteDown) {
        if (!canVoteUp) {
            return;
        }

        const { praise } = this.props;
        this.setState({ isLoading: true });

        const doVote = canVoteUp ? likePraise : unlikePraise;

        doVote(praise.id).then(() =>
            this.setState({
                isLoading: false,
            })
        );
    }

    render() {
        const { isLoading } = this.state;
        const { praise } = this.props;
        const { canVoteUp, canVoteDown } = praise.permissions;

        return (
            <TouchableOpacity onPress={() => this.onVote(canVoteUp, canVoteDown)}>
                <ButtonContents isLoading={isLoading} canVoteUp={canVoteUp} />
            </TouchableOpacity>
        );
    }
}

function ButtonContents({ isLoading, canVoteUp }) {
    return <View>{isLoading ? <ActivityIndicator /> : <Text>{canVoteUp ? 'Like' : 'Liked'}</Text>}</View>;
}

LikeButton.propTypes = propTypes;

export default LikeButton;
