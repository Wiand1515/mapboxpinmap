import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import axios from 'axios';


mapboxgl.accessToken = "pk.eyJ1IjoicGluZmxhZyIsImEiOiJja3ZpM3JqemkwMXdrMnZtaHBjNDVkOW5nIn0.s-_0Qw7og1cw0tsubdH8kQ";

let pinflagCoords = [
    -70.61480652524202, 
    -33.42333621298261,
]
// Search only in Chile
const limitsBox = [
    -75.633333,   //minX
    -53.896306,   //minY
    -66.983333,   //maxX
    -17.594722    //maxY
]

const Map = ({url, pickUp}) => {

    //Ref to map items
    const mapContainer = useRef(null);
    const map = useRef(null);
    //Set Longitude and Latitude
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);

    
    
    useEffect(() => {
        let marker = new mapboxgl.Marker({
            draggable: true
        });
    
        const addMarker = (e) => {
            console.log(e.lngLat);
            let coordinates = e.lngLat;
            marker.setLngLat(coordinates).addTo(map.current);

            marker.on('dragend', () => {
               const lngLat = marker.getLngLat();
               console.log(lngLat);
            })
        };

        //Initialize Map
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: url,
            center: pinflagCoords,
            zoom: 13,
        });

        //Disable Map rotation
        map.current.dragRotate.disable();

        //Geolocate User
        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
                },
                showAccuracyCircle: false,
                fitBoundsOptions: {
                    maxZoom: 15,
                },
                showUserLocation: false,
        });

        //Add Geolocation button
        map.current.addControl(geolocate, "bottom-right");

        //Geolocate at load map
        map.current.on('load', () => {
            geolocate.trigger();

            map.current.addSource('single-point', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                }
            });

            map.current.addLayer({
                id: 'point',
                source: 'single-point',
                type: 'circle',
                paint: {
                    'circle-radius' : 5,
                    'circle-color': '#448ee4'
                }
            })
        });
        

        //Searchbar Definition
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl,
            bbox: limitsBox,
            placeholder: "Ingresa tu direccion",
            marker: false
        });

        //Add Searchbar on Map
        map.current.addControl(
            geocoder,
            "top-left",
        );
        
        //Get address on search Result
        geocoder.on('result', (e) => {
            console.log(e);
            map.current.getSource('single-point').setData(e.result.geometry);
        });
        

        
        //Get Latitude and Longitude on Click and add draggable marker
        map.current.on('click', (e) => {
            setLatitude(e.lngLat.lat);
            setLongitude(e.lngLat.lng);
            
            if(!pickUp) {
                addMarker(e);
            }
        });
        
        
    }, [url,pickUp])

    //send address on click
    const handleClick = () => {
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?limit=1&access_token=pk.eyJ1IjoicGluZmxhZyIsImEiOiJja3ZpM3JqemkwMXdrMnZtaHBjNDVkOW5nIn0.s-_0Qw7og1cw0tsubdH8kQ`)
        .then((res) => {
            console.log(res.data.features[0]);
        }).catch((err) => {
            console.log(err);
        });


    };
    
    return (
        <MAPCOMPONENT>
        <div className="div">
            {   latitude ?
                <button onClick={handleClick}>Confirmar direccion</button>
                :
                <></>
            }
        </div>
        <MAP>
            <div ref={mapContainer} className="map"/>
        </MAP>
        </MAPCOMPONENT>
    )
}

export default Map

const MAP = styled.div`
    width: 600px;
    height: 400px;
    border: 1px solid black;

    .map{
        width: 100%;
        height: 100%;
    }
`

const MAPCOMPONENT = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`