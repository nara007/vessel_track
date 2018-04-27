/**
 * @file Test case for FileUploader component.
 * 
 * @author Ye Song
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import 'should';
import 'should-enzyme';
import FileUploader from './fileUploader';

describe('Render fileUploader', () => {
    it('should render fileUploader Component successfully', () => {

        const fileUploader = shallow(<FileUploader />);
        const div = fileUploader.find('div');
        const label = <span><h5>Please select a GeoJSON file</h5></span>;
        const input = fileUploader.find('input');
        const button = fileUploader.find('button');

        div.should.have.className('shadow-border');
        div.contains(label).should.be.eql(true);
        input.should.have.attr('type', 'file');
        input.should.have.attr('name', 'geoJSON');
        button.should.containsText('load');
    });
});

describe('Read file through "FileReader"', () => {

    const fileContents = '{"type":"FeatureCollection","features":\
    [{"type":"Feature","geometry":{"type":"LineString","coordinates":\
    [[103.795908,1.269708],[103.796123,1.269668],[103.796368,1.26959],\
    [103.796544,1.269483]]},"properties":{"ID":"001","Vessel Name":"Bayern Munich"}},\
    {"type":"Feature","geometry":{"type":"LineString","coordinates":\
    [[103.794978,1.270197],[103.794978,1.270197],[103.794567,1.269903],\
    [103.794558,1.269355]]},"properties":{"ID":"002","Vessel Name":"Darmstadt 98"}},\
    {"type":"Feature","geometry":{"type":"LineString","coordinates":\
    [[103.809941,1.262393],[103.798218,1.267831],[103.798156,1.266683],\
    [103.79738,1.266218]]},"properties":{"ID":"003","Vessel Name":"Borussia Dortmund"}}]}';
    const file = new Blob([fileContents], { type: 'text/plain' });

    it('should trigger callback while clicking "load" button', () => {
        const onChange = spyOn(FileUploader.prototype, 'onChange');
        const loadFile = spyOn(FileUploader.prototype, 'loadFile');
        const fileUploaderWrapper = mount(<FileUploader />);
        const fileUploader = fileUploaderWrapper.get(0);

        fileUploaderWrapper.find('input').simulate('change', { target: { files: [file] } });
        expect(onChange).toHaveBeenCalled();
        fileUploaderWrapper.find('button').simulate('click');
        expect(loadFile).toHaveBeenCalled();
    });

});