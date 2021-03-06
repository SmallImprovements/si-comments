import React, { Component } from 'react';
import { Platform, View, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import Flex from '../../../components/Flex';
import Avatar from '../../../components/Avatar';
import Badge from '../../../components/Badge';
import { HeaderOne, HeaderTwo } from '../../../components/Text';
import styled, { css } from 'styled-components/native';
import colorVars from '../../../assets/styles/colours';
import LikeButton from '../../../components/LikeButton';
import { getPraiseById, likePraise, unlikePraise } from '../../../services/api';
import HTMLView from 'react-native-htmlview';

const { SIGray3 } = colorVars;
const showAlert = () =>
    /* eslint-disable no-console */
    Alert.alert('Open in Small Improvements?', "You'll be redirected to the Small Improvements app your browser", [
        { text: 'Open', onPress: () => console.log('Open Pressed') },
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
    ]);
/* eslint-enable no-console */
const isIOS = Platform.OS === 'ios';
const StyledBadge = styled(Badge)`
    width: 50px;
    height: 50px;
    position: absolute;
    ${isIOS &&
        css`
            margin-left: -30px;
            margin-top: -25px;
        `};
`;

const PreviewContents = styled(Flex)`
    margin-top: 10px;
    flex-wrap: wrap;
`;

export default class PraisePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            praise: null,
        };
    }

    componentDidMount() {
        const { entityId } = this.props;
        return {
            praise: this.doGetPraise(entityId),
        };
    }

    doGetPraise(entityId) {
        this.setState({ isLoading: true });
        return getPraiseById(entityId).then(res => {
            this.setState({
                praise: res,
                isLoading: false,
                isLikePending: false,
            });
        });
    }

    onVote() {
        const { praise } = this.state;
        const { permissions, id } = praise;
        const { canVoteUp, canVoteDown } = permissions;
        if (!canVoteUp && !canVoteDown) {
            return;
        }

        this.setState({ isLikePending: true });

        const doVote = canVoteUp ? likePraise : unlikePraise;

        return doVote(praise.id).then(res => {
            this.setState({ praise: res.data, isLikePending: false });
        });
    }

    render() {
        const { praise, isLoading, isLikePending } = this.state;
        if (!praise || isLoading) {
            return <ActivityIndicator />;
        }
        const { title, author, badge, recipients, message } = praise;
        const firstRecipient = recipients[0];

        return (
            <Flex>
                <StyledBadge badge={badge} />
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}
                >
                    <Avatar avatarSize={60} logoUrl={firstRecipient.logo} />
                    <PreviewContents>
                        <TouchableOpacity
                            onPress={showAlert}
                            activeOpacity={0.9}
                            style={{
                                flexBasis: '100%',
                                width: '100%',
                                marginBottom: 20,
                            }}
                        >
                            <HeaderOne
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                {recipients.map((person, index) => (
                                    <Text key={person.id}>
                                        {person.name}
                                        {/* todo: use the pluralize service*/}
                                        {index < recipients.length - 1 ? ', ' : ''}
                                    </Text>
                                ))}
                            </HeaderOne>
                        </TouchableOpacity>
                        <HeaderTwo
                            bold={true}
                            style={{
                                marginBottom: 10,
                            }}
                        >
                            {title}
                        </HeaderTwo>
                        <HTMLView value={message ? message : ''} style={{ width: '100%', marginBottom: 20 }} />
                        <Text style={{ color: SIGray3, flexBasis: '100%' }}>Written by: {author.name}</Text>
                        <Flex style={{ justifyContent: 'flex-end' }}>
                            <LikeButton
                                praise={praise}
                                onLike={this.onVote.bind(this)}
                                isLiked={praise.permissions.canVoteDown}
                                isLoading={isLikePending}
                            />
                        </Flex>
                    </PreviewContents>
                </View>
            </Flex>
        );
    }
}
