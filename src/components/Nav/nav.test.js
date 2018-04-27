/**
 * @file Test case for Nav component.
 * 
 * @author Ye Song
 */
import React from 'react';
import { shallow } from 'enzyme';
import 'should';
import 'should-enzyme';
import Nav from './nav';

describe('Render Navbar', () => {
    it('should render Navbar successfully', () => {
        const navbarWrapper = shallow(<Nav />);
        const nav = navbarWrapper.find('nav');
        const ul = navbarWrapper.find('ul');
        const ulNum = navbarWrapper.find('ul').length;
        const img = ul.find('img');
        nav.should.have.className('custom-nav');
        ulNum.should.equal(1);
        should.exist(img);
    });
});