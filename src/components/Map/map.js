/**
 * @file Definition of MapComponent that contains map.
 * 
 * @author Ye Song
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './map.css';
import L from 'leaflet';
import emitter from '../../event/event';

export default class MapComponent extends React.Component {

    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this);
        this.toggleTrackOnMap = this.toggleTrackOnMap.bind(this);
        this.updateTrackTable = this.updateTrackTable.bind(this);
        this.createGeoJSONLayerFromTrackFeature = this.createGeoJSONLayerFromTrackFeature.bind(this);
    }

    /**
      * initialize leaflet map.
      * register callback for 'updateTable' and 'toggleTrack' events.
      */
    componentDidMount() {

        this.initMap();
        this.toggleTrackEmitter = emitter.addListener('toggleTrack', this.toggleTrackOnMap);
        this.updateTrackTableEmitter = emitter.addListener('updateTable', this.updateTrackTable);
    }

    /**
      * unregister callback for 'updateTable' and 'toggleTrack' events.
      * 
      */
    componentWillUnmount() {
        emitter.removeListener(this.toggleTrackEmitter);
        emitter.removeListener(this.updateTrackTableEmitter);
    }

    /**
      * initialize leaflet map, add tile layer.
      * create layer group for tracks geoJSON objects.
      */
    initMap() {
        this.map = L.map(this.props.mapID).setView([this.props.lat, this.props.lng], this.props.zoom);
        this.trackGroup = L.layerGroup().addTo(this.map);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    /**
      * callback for updateTable event.
      * update geoFeatureCollection.
      * @param geoFeatureCollection {Object} collection of geoJSON features.
      */
    updateTrackTable(geoFeatureCollection) {
        this.geoFeatureCollection = geoFeatureCollection;
        if (this.trackCollection) {
            this.trackCollection.clear();
        }
        this.trackCollection = new Map();
        this.trackGroup.clearLayers();
    }

    /**
      * toggle track of a vessel while checkbox changes.
      * @param vesselInfo {Object} vessel information including ID and vessel name.
      */
    toggleTrackOnMap(vesselInfo) {
        if (this.trackCollection.has(vesselInfo.ID)) {
            const trackLayer = this.trackCollection.get(vesselInfo.ID);
            if (this.trackGroup.hasLayer(trackLayer)) {
                this.trackGroup.removeLayer(trackLayer);
            } else {
                this.trackGroup.addLayer(trackLayer);
            }
        } else {
            if (this.geoFeatureCollection) {
                const feature = this.geoFeatureCollection.features.find(feature => feature.properties.ID === vesselInfo.ID);
                if (feature) {
                    this.createGeoJSONLayerFromTrackFeature(feature);
                }
            }
        }
    }

    /**
      * create geoJSON object for a track using its geoJSON feature.
      * @param geoJSONFeature {Object} geoJSON feature of a track.
      */
    createGeoJSONLayerFromTrackFeature(geoJSONFeature) {
        const trackLayer = L.geoJSON(geoJSONFeature);
        this.trackGroup.addLayer(trackLayer);
        this.trackCollection.set(geoJSONFeature.properties.ID, trackLayer);

    }

    render() {
        return (
            <div id={this.props.mapID} className='leaflet-map'>
            </div>
        );
    }
}