import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

export default function ModalExample({ children, modalVisible }) {
    return (
        <Modal
            animationType={'slide'}
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                alert('Modal has been closed.');
            }}
        >
            {children}
        </Modal>
    );
}
