import React, { useState, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import { Button, Modal } from 'react-bootstrap';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons';

function QRScanner(props) {
  const [result, setResult] = useState('ok');
  const [cameraOn, setCameraOn] = useState(false); // Default camera state is off
  const [showResult, setShowResult] = useState(false); // State to manage whether to show the result or not
  const qrRef = useRef(null);
  const [show, setShow] = useState(false);

  const handleScan = data => {
    if (data) {
      setResult(data);
      setShowResult(true); // When result is set, show the result in the modal
    }
  }

  const handleError = err => {
    console.error(err);
  }

  const handleToggleCamera = () => {
    setCameraOn(prevCameraOn => !prevCameraOn);
  }

  const handleClose = () => {
    setShow(false);
    setCameraOn(false); // Turn off camera when modal is closed
  };

  const handleShow = () => {
    setShow(true);
    setCameraOn(true); // Turn on camera when modal is opened
    setShowResult(true); // Reset showResult when modal is opened
  };

  return (
    <>

      <button onClick={handleShow} className="camera-button">
        {cameraOn ? (
          <>
            <FontAwesomeIcon icon={faVideoSlash} className='icon' />

          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faVideo} className='icon' />
          </>
        )}
      </button>

      <Modal show={show} onHide={handleClose} {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>QR Scanner</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="qr-scanner-content">
            {showResult && cameraOn && (
              <QrReader
                ref={qrRef}
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
              />
            )}

            {!showResult && !cameraOn && <p>Camera is turned off.</p>}
            {showResult && <p className="scanned-data"> {result}</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default QRScanner;
