/**
 * @file Definition of TrackTable component that displays track of each vessel.
 * 
 * @author Ye Song
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './trackTable.css';
import emitter from '../../event/event';
import ShipImg1 from '../../assets/img/ship1.png';

export default class TrackTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkStates: [],
            tableHeader: { ID: '', name: '' },
            tableRows: [],
            featureCollection: undefined
        };

        this.updateTrackTable = this.updateTrackTable.bind(this);
        this.extractVesselInfo = this.extractVesselInfo.bind(this);
        this.refreshTableRows = this.refreshTableRows.bind(this);
        this.loadShipIcons = this.loadShipIcons.bind(this);
        this.toggleVesselTrack = this.toggleVesselTrack.bind(this);
        this.updateCheckState = this.updateCheckState.bind(this);
    }
    /**
      * register callback for 'updateTable' event.
      * 
      */
    componentDidMount() {
        this.eventEmitter = emitter.addListener('updateTable', this.updateTrackTable);
        this.loadShipIcons();
    }

    /**
      * unregister callback for 'updateTable' event.
      * 
      */
    componentWillUnmount() {
        emitter.removeListener(this.eventEmitter);
    }

    loadShipIcons() {
        this.shipIcons = [];
        this.shipIcons.push(ShipImg1);
    }

    /**
      * store geoJSON features in state.
      * @param featureCollection {Object} collection of geoJSON features.
      */
    updateTrackTable(featureCollection) {
        const tableRows = this.extractVesselInfo(featureCollection);
        const checkStates = this.updateCheckState(tableRows);
        this.setState({
            checkStates: checkStates,
            tableHeader: { ID: 'ID', name: 'Vessel Name' },
            tableRows: tableRows,
            featureCollection: featureCollection
        });
    }

    /**
      * extract 'checked' state for each row in track table.
      * @param tableRows {Array} array of vessel info.
      */
    updateCheckState(tableRows) {
        return tableRows.map(vesselInfo => ({ ID: vesselInfo.ID, checked: false }));
    }

    /**
      * extract vessel info from feature collection.
      * @param featureCollection {Object} collection of geoJSON features.
      */
    extractVesselInfo(featureCollection) {
        const vesselInfoSet = [];
        for (let feature of featureCollection.features) {
            let vessel = {};
            vessel.ID = feature.properties.ID;
            vessel.vesselName = feature.properties['Vessel Name'];
            vesselInfoSet.push(vessel);
        }
        return vesselInfoSet;
    }

    /**
      * emit 'toggleTrack' event, update 'checked' state.
      * @param e {Object} event object.
      */
    toggleVesselTrack(e) {
        emitter.emit('toggleTrack', { ID: e.target.value, isHidden: !e.target.checked });
        const indexOfChangedCheckbox = this.state.checkStates.findIndex(checkState => checkState.ID === e.target.value);
        const checked = !this.state.checkStates[indexOfChangedCheckbox].checked;
        const newStates = this.state.checkStates.concat();
        newStates[indexOfChangedCheckbox].checked = checked;
        this.setState({ checkStates: newStates });
    }

    /**
      * return template of row item for rendering.
      * 
      */
    refreshTableRows() {
        return this.state.tableRows.map((rowItem, key) => {
            return (<tr key={key} className='custom-cursor'>
                <td>{rowItem.ID}</td>
                <td>{rowItem.vesselName}</td>
                <td><img className='circular-square' src={this.shipIcons[0]} /></td>
                <td><input onChange={this.toggleVesselTrack} type='checkbox' checked={this.state.checkStates.find(checkState => checkState.ID === rowItem.ID).checked} name='vessel' value={rowItem.ID} /></td>
            </tr>);
        });
    }

    render() {
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>{this.state.tableHeader.ID}</th>
                        <th>{this.state.tableHeader.name}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.refreshTableRows()}
                </tbody>
            </table>
        );
    }
}