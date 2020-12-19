import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { get_exec_file_download } from './IO';
var { get_upload_addr, get_exec_addr } = require('./IO');

class FileUpload extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        const file = e.target.files[0]; // accesing file
        if (file == undefined) {
            return;
        }
        const name_split = file.name.split(".");
        if (name_split.length == 2 && name_split[1] === 'zip') {
            this.props.set_upload_file_handler(file, file.name);
        } else {
            window.alert('Expecting zip file please check format');
        }
    }

    handleChangeForExec = (e) => {
        const file = e.target.files[0]; // accesing file
        if (file == undefined) {
            return;
        }
        const name_split = file.name.split(".");
        if (name_split.length == 2 && name_split[1] === 'zip') {
            this.props.set_exec_file_handler(file, file.name);
        } else {
            window.alert('Expecting zip file please check format');
        }
    }

    uploadFile = () => {
        if (this.props.upload_file == undefined) {
            window.alert("Please Select a file to upload");
            return;
        }
        const formData = new FormData(); formData.append('file', this.props.upload_file); // appending file
        axios.post(get_upload_addr(), formData, {})
        .then(res => {
            this.props.fetch_all_run_update_state();
            window.alert(`Successfully uploaded case ${res.data.name}`);
        }).catch(err => window.alert(err.response.data.message))
    }

    uploadFileForExec = () => {
        if (this.props.exec_file == undefined) {
            window.alert("Please Select a file to upload");
            return;
        }
        const formData = new FormData(); formData.append('file', this.props.exec_file); // appending file
        axios.post(get_exec_addr(), formData, {})
        .then(
            res => {
                console.log(res);
                if (res.message == undefined) {
                    fetch(get_exec_file_download(this.props.exec_file_name)).then(res => res.blob()).then(blob => {console.log(blob); var file = window.URL.createObjectURL(blob);
                        window.location.assign(file);}).catch(err =>{window.alert(err.response.data.message)});
                }
            }
        ).catch((err) => { window.alert(err.response.data.message); })
    }
    render() {
        return (
        <Container>
            <br />
            <Row>
            <h3>Upload Dolev-Strong or Streamlet cases for visualization</h3>
            </Row>
            
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
            <br />
            <Row>
            <h3>Upload Dolev-Strong or Streamlet cases for simulation result</h3>  
            </Row>
            <Row>
                <Form>
                    <Form.Group controlId="formBasicEmail2">
                        <Form.File custom id="exampleFormControlFile2" label={this.props.exec_file_name} onChange={this.handleChangeForExec} />
                    </Form.Group>
                    <Button variant="info" onClick={this.uploadFileForExec}>
                        Upload Case
                    </Button>
                </Form>
            </Row>
        </Container>);
    }
}
export default FileUpload;