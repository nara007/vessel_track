/**
 * @file Definition of Nav component.
 * 
 * @author Ye Song
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './nav.css';
import Logo from '../../assets/img/logo.png';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const logoStyle = {
            height: '70px',
        };
        return (
            <nav className='custom-nav'>
                <ul>
                    <li><img src={Logo} style={logoStyle} /></li>
                </ul>
            </nav>);
    }
}