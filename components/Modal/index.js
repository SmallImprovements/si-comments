import React from 'react';
import { Modal } from 'react-native';

export default function ModalExample({ children, modalVisible, onClose }) {
    return (
        <Modal animationType={'slide'} transparent={false} visible={modalVisible} onRequestClose={onClose}>
            {children}
        </Modal>
    );
}
