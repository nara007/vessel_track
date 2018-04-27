/**
 * @file Definition of FileUploader component that receives a geoJSON file.
 * 
 * @author Ye Song
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './fileUploader.css';
// import axios from 'axios';
import emitter from '../../event/event';

export default class FileUploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: undefined
        };

        this.onChange = this.onChange.bind(this);
        // this.submitFile = this.submitFile.bind(this);
        // this.fileUpload = this.fileUpload.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.parseJSONStr = this.parseJSONStr.bind(this);
    }

    /**
      * update state while selecting a geoJSON file.
      * @param e {Object} event object.
      */
    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    /**
      * load and parse local geoJSON file.
      * @param e {Object} event object.
      */
    loadFile(e) {
        e.preventDefault();
        if (this.state.file) {
            const reader = new FileReader();
            reader.readAsText(this.state.file, 'utf-8');
            reader.onload = () => {
                this.parseJSONStr(reader.result).then(obj => {
                    emitter.emit('updateTable', obj);
                }).catch(console.error);
            }
        }
    }

    /**
      * load and parse local geoJSON file.
      * @param str {string} content of geoJSON in string. 
      * @return promise
      */
    parseJSONStr(str) {
        const p = new Promise(function (resolve, reject) {
            const obj = JSON.parse(str);
            resolve(obj);
        });
        return p;
    }

    /**
      * load local geoJSON file, send it to backend for parsing.
      * This method is an alternative of loadFile
      * @param e {Object} event object.
      */
    // submitFile(e) {
    //     e.preventDefault();
    //     this.fileUpload(this.state.file);
    // }

    /**
      * load local geoJSON file, send it to backend for parsing.
      * @param file {File} File object
      */
    // fileUpload(file) {
    //     const url = '/myfile';
    //     const formData = new FormData();
    //     formData.append('geoJSON', file);
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     };
    //     axios.post(url, formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     }).then(data => emitter.emit('updateTable', data.data));
    // }

    render() {
        return (
            <div className='shadow-border'>
                <span><h5>Please select a GeoJSON file</h5></span>
                <input type='file' name='geoJSON' onChange={this.onChange} />
                {/* <button onClick={this.submitFile}>submit</button> */}
                <button onClick={this.loadFile}>load</button>
            </div>);
    }
};