import React from 'react';
import { View, Button } from 'react-native';
import Comment from '../../components/Comment';
import { ActivityIndicator, FlatList } from 'react-native';
import { reverse } from 'lodash';
import styled from 'styled-components/native';
import colorVars from '../../assets/styles/colours';

export default function CommentsList({ comments, moduleType, onPressReply, inputRef, doGetComments }) {
    let dataSource = comments;
    if (moduleType === 'OBJECTIVE') {
        dataSource = reverse(dataSource);
    }

    if (!dataSource) {
        return <ActivityIndicator style={{ marginTop: 20 }} />;
    }
    return (
        <View>
            {dataSource.length ? (
                <FlatList
                    data={dataSource}
                    renderItem={({ item }) => {
                        return (
                            <Comment
                                {...item}
                                moduleType={moduleType}
                                onPressReply={onPressReply}
                                inputRef={inputRef}
                                doGetComments={doGetComments}
                            />
                        );
                    }}
                    keyExtractor={comment => comment.id}
                />
            ) : (
                <View>
                    <NoComments>No Comments</NoComments>
                    <Button onPress={onPressReply} title="Write a comment..." />
                </View>
            )}
        </View>
    );
}

const NoComments = styled.Text`
    text-align: center;
    margin: 40px 0;
    color: ${colorVars.SIGray2};
`;
