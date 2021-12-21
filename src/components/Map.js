import React, { useEffect, useRef } from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


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

const Map = ({url, isPickup}) => {

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        //Initialize Map
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: url,
            center: pinflagCoords,
            zoom: 13,
        });

        //Geolocate User
        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
                },
                showAccuracyCircle: false,
                fitBoundsOptions: {
                    maxZoom: 15,
                }
        });

        map.current.addControl(geolocate);

        //Geolocate at load map
        map.current.on('load', () => {
            geolocate.trigger();
        });

        geolocate.on('geolocate', (event) => {
            const features = map.current.queryRenderedFeatures(event.point);
            console.log(features);
        })
        

        //Search User Direction
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl,
            bbox: limitsBox,
            placeholder: "Buscar Direccion"
        })
        //Add Searchbar
        map.current.addControl(
            geocoder,
            "top-left"
        )

        map.current.on('click', (event) => {
            const features = map.current.queryRenderedFeatures(event.point);

            console.log(event.target);
            
            // Centers map on point
            map.current.easeTo({
                center: features[0].geometry.coordinates,
                duration: 1000,
                zoom: 16,
            })
        })

        

    }, [])

    return (
        <MAP>
            <div ref={mapContainer} className="map"/>
        </MAP>
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