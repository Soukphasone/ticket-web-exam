// LogoutModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function ConfirmLogout({ showLogoutModal, setShowLogoutModal, confirmLogout, msg, icon, cancelText, ConfirmText }) {
    return (
        <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
            <Modal.Header closeButton className="bg-primary text-light">
                <Modal.Title>{msg}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <FontAwesomeIcon icon={icon} size="6x" className="text-danger mb-4" />
                    <p className="mb-0">{msg}</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center border-0">
                <Button variant="secondary" onClick={() => setShowLogoutModal(false)} className="px-4">{cancelText}</Button>
                <Button variant="danger" onClick={confirmLogout} className="px-4">{ConfirmText}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmLogout;


