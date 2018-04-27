/**
 * @file Test case for Map component.
 * 
 * @author Ye Song
 */
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import 'should';
import 'should-enzyme';
import MapComponent from './map';
import emitter from '../../event/event';

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

describe('Render map component', () => {
    it('should render map component successfully', () => {

        const div = global.document.createElement('div');
        div.setAttribute("id", "mapContainer");
        global.document.body.appendChild(div);
        const propsOfMapComponent = {
            mapID: 'mapContainer',
            lat: 1.3876,
            lng: 103.28975,
            zoom: 15
        };
        const mapWrapper = mount(<MapComponent {...propsOfMapComponent} />);
        mapWrapper.find('#mapContainer').should.have.className('leaflet-map');


        const mapCenter = mapWrapper.instance().map.getCenter();
        const zoom = mapWrapper.instance().map.getZoom();
        mapCenter.lat.should.be.eql(1.3876);
        mapCenter.lng.should.be.eql(103.28975);
        zoom.should.be.eql(15);

    });
});

// describe('Toggle track', () => {
//     it('should toggle track successfully while selecting a vessel', () => {

//         const mapContainer = global.document.createElement('div');
//         mapContainer.setAttribute("id", "mapContainerForToggle");
//         global.document.body.appendChild(mapContainer);
//         const propsOfMapComponent = {
//             mapID: 'mapContainerForToggle',
//             lat: 1.3876,
//             lng: 103.28975,
//             zoom: 15
//         };
//         const mapWrapper = mount(<MapComponent {...propsOfMapComponent} />);

//         mapWrapper.find('#mapContainerForToggle').should.have.className('leaflet-map');

//         const messageBodyObj = JSON.parse(messageBody);
//         emitter.emit("updateTable", messageBodyObj);
//         emitter.emit('toggleTrack', { ID: '001', isHidden: false });

//     });
// });