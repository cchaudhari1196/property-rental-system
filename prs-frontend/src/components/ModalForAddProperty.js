import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap'

function ModalForAddProperty(props) {
    return (
        <Modal
            show={this.state.isShowAddPublisherModal}
            onHide={() => this.setState({ isShowAddPublisherModal: false })}
            // size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add {props.label}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>{props.label}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={`Enter ${props.label}`}
                        name="title"
                        value={props.inputValue}
                        onChange={(e) => { props.setValue(e.target.value) }}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onClose}>Close</Button>
                <Button variant="success"
                    disabled={props.inputValue === ''} onClick={this.onClickAdd}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalForAddProperty;