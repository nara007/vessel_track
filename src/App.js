/**
 * @file Definition of App component.
 * 
 * @author Ye Song
 */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Row, Col } from 'react-bootstrap';
import FileUploader from './components/FileUploader/fileUploader';
import TrackTable from './components/TrackTable/trackTable';
import Nav from './components/Nav/nav';
import MapComponent from './components/Map/map';

class App extends Component {

  render() {

    const propsOfMapComponent = {
      mapID: 'mapContainer',
      lat: 1.269708,
      lng: 103.795908,
      zoom: 16
    };
    return (<Grid fluid>
      <Row className="show-grid">
        <Nav />
      </Row>
      <Row className="show-grid">
        <Col className="File-uploader module" md={4} xs={3}>
          <Row className="show-grid">
            <FileUploader />
          </Row>
          <Row className="show-grid">
            <TrackTable />
          </Row>
        </Col>
        <Col className="map-container" md={8} xs={9}>
          <MapComponent {...propsOfMapComponent} />
        </Col>
      </Row>
    </Grid>);
  }
}

export default App;
