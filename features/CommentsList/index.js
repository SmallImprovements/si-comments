import React from 'react';
import { View, Button } from 'react-native';
import Comment from '../../components/Comment';
import { ActivityIndicator, FlatList } from 'react-native';
import { reverse } from 'lodash';

import NoContent from '../../components/NoContent';

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
                    <NoContent>No Comments</NoContent>
                    <Button onPress={onPressReply} title="Write a comment..." />
                </View>
            )}
        </View>
    );
}
