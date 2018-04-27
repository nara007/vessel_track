/**
 * @file Test case for TrackTable component.
 * 
 * @author Ye Song
 */
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import 'should';
import 'should-enzyme';
import TrackTable from './trackTable';
import emitter from '../../event/event';
import { waitForElement } from 'enzyme-async-helpers';

const messageBody = '{"type":"FeatureCollection","features":\
[{"type":"Feature","geometry":{"type":"LineString","coordinates":\
[[103.795908,1.269708],[103.796123,1.269668],[103.796368,1.26959],\
[103.796544,1.269483]]},"properties":{"ID":"001","Vessel Name":"Bayern Munich"}},\
{"type":"Feature","geometry":{"type":"LineString","coordinates":\
[[103.794978,1.270197],[103.794978,1.270197],[103.794567,1.269903],\
[103.794558,1.269355]]},"properties":{"ID":"002","Vessel Name":"Darmstadt 98"}},\
{"type":"Feature","geometry":{"type":"LineString","coordinates":\
[[103.809941,1.262393],[103.798218,1.267831],[103.798156,1.266683],\
[103.79738,1.266218]]},"properties":{"ID":"003","Vessel Name":"Borussia Dortmund"}}]}';


describe('Render Tracktable', () => {

    it('should render Tracktable successfully after loading geoJSON file', () => {
        const updateTrackTable = spyOn(TrackTable.prototype, 'updateTrackTable');
        const trackTableWrapper = shallow(<TrackTable />);
        const trackTable = trackTableWrapper.get(0);
        const messageBodyObj = JSON.parse(messageBody);
        emitter.emit('updateTable', messageBodyObj);
        expect(updateTrackTable).toHaveBeenCalledWith(messageBodyObj);

        const table = trackTableWrapper.find('table');
        table.should.have.className('table table-striped');

        const tableRows = trackTableWrapper.instance().extractVesselInfo(messageBodyObj);
        const checkStates = trackTableWrapper.instance().updateCheckState(tableRows);
        trackTableWrapper.setState({
            checkStates: checkStates,
            tableHeader: { ID: 'ID', name: 'Vessel Name' },
            tableRows: tableRows,
            featureCollection: messageBodyObj
        });
        trackTableWrapper.find('tr').length.should.be.eql(4);
        const ID = trackTableWrapper.find('th').at(0);
        const vesselName = trackTableWrapper.find('th').at(1);
        const tbody = trackTableWrapper.find('tbody');
        const tr = tbody.find('tr');
        const vesselOne = tr.at(0);
        const vesselTwo = tr.at(1);
        const vesselThree = tr.at(2);
        const vesselOneInfo = vesselOne.find('td');
        const vesselTwoInfo = vesselTwo.find('td');
        const vesselThreeInfo = vesselThree.find('td');

        ID.should.containsText('ID');
        vesselName.should.containsText('Vessel Name');

        vesselOneInfo.at(0).text().should.be.eql('001');
        vesselOneInfo.at(1).text().should.be.eql('Bayern Munich');
        vesselTwoInfo.at(0).text().should.be.eql('002');
        vesselTwoInfo.at(1).text().should.be.eql('Darmstadt 98');
        vesselThreeInfo.at(0).text().should.be.eql('003');
        vesselThreeInfo.at(1).text().should.be.eql('Borussia Dortmund');

    });

});

describe('Toggle Tracks', () => {

    it('should toggle track through checkbox successfully', () => {

        const updateTrackTable = spyOn(TrackTable.prototype, 'updateTrackTable');
        const toggleVesselTrack = spyOn(TrackTable.prototype, 'toggleVesselTrack');
        const trackTableWrapper = shallow(<TrackTable />);
        const trackTable = trackTableWrapper.get(0);
        const messageBodyObj = JSON.parse(messageBody);
        emitter.emit('updateTable', messageBodyObj);
        expect(updateTrackTable).toHaveBeenCalledWith(messageBodyObj);
        const table = trackTableWrapper.find('table');
        table.should.have.className('table table-striped');
        const tableRows = trackTableWrapper.instance().extractVesselInfo(messageBodyObj);
        const checkStates = trackTableWrapper.instance().updateCheckState(tableRows);
        trackTableWrapper.setState({
            checkStates: checkStates,
            tableHeader: { ID: 'ID', name: 'Vessel Name' },
            tableRows: tableRows,
            featureCollection: messageBodyObj
        });
        trackTableWrapper.find('input').at(0).simulate('change');
        trackTableWrapper.setState({
            checkStates: [{ ID: '001', checked: true }, { ID: '002', checked: false }, { ID: '003', checked: false }]
        });
        trackTableWrapper.find('input').length.should.be.eql(3);
        trackTableWrapper.find('input').at(0).should.be.checked();
    });

});