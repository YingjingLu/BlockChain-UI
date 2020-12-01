import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
var { get_upload_addr } = require('./IO');

class FileUpload extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        const file = e.target.files[0]; // accesing file
        console.log(file);
        this.props.set_upload_file_handler(file, file.name);
    }

    uploadFile = () => {
        if (this.props.upload_file == undefined) {
            window.alert("Please Select a file to upload");
            return;
        }
        const formData = new FormData(); formData.append('file', this.props.upload_file); // appending file
        axios.post(get_upload_addr(), formData, {})
        .then(res => {
            console.log(res);
            this.props.fetch_all_run_update_state();
            window.alert(`Successfully uploaded case ${res.data.name}`);
        }).catch(err => console.log(err))
    }
    render() {
        return (
        <Container>
            <br />
            <Row>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.File custom id="exampleFormControlFile1" label={this.props.upload_file_name} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="info" onClick={this.uploadFile}>
                        Upload Case
                    </Button>
                </Form>
            </Row>
        </Container>);
    }
}
export default FileUpload;