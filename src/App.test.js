/**
 * @file Test case for App component.
 * 
 * @author Ye Song
 */
import React from 'react';
import { shallow } from 'enzyme';
import { Grid, Row } from 'react-bootstrap';
import 'should';
import 'should-enzyme';
import App from './App';
import FileUploader from './components/FileUploader/fileUploader';
import TrackTable from './components/TrackTable/trackTable';
import Nav from './components/Nav/nav';
import MapComponent from './components/Map/map';

describe('Render App', () => {
  it('should render App and its subcomponents successfully', () => {
    const appWrapper = shallow(<App />);
    const grid = appWrapper.find(Grid);
    const rows = appWrapper.find(Row);
    const nav = appWrapper.find(Nav);
    const fileUploader = appWrapper.find(FileUploader);
    const trackTable = appWrapper.find(TrackTable);
    const mapComponent = appWrapper.find(MapComponent);
    should.exist(grid);
    rows.length.should.be.eql(4);
    rows.at(0).should.have.className('show-grid');
    should.exist(nav);
    should.exist(fileUploader);
    should.exist(trackTable);
    should.exist(mapComponent);
  });
});
