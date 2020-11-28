import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
var { get_upload_addr } = require('./IO');

function FileUpload() {
    const [file, setFile] = useState(''); // storing the uploaded file    // storing the recived file from backend
    const [data, getFile] = useState({ name: "", path: "" }); const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element
    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accesing file
        console.log(file);
        setFile(file); // storing file
    }
    const uploadFile = () => {
        const formData = new FormData(); formData.append('file', file); // appending file
        axios.post(get_upload_addr(), formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            console.log(res);
            window.alert(`Successfully uploaded case ${res.data.name}`);
        }).catch(err => console.log(err))
    }
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.File id="exampleFormControlFile1" label="Zip File Case" ref={el} onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" onClick={uploadFile}>
                Upload Case
            </Button>
            {/* <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} />
                <div className="progessBar" style={{ width: progress }}>
                    {progress}
                </div>
                <button onClick={uploadFile} className="upbutton">                   Upload
                </button>
                <hr />
                {data.path && <img src={data.path} alt={data.name} />}
            </div> */}
        </Form>
    );
}
export default FileUpload;