import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import axios from 'axios';
import PinMapLogo from '../assets/logo_cliente.png'


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

        //Create a marker
        let marker = new mapboxgl.Marker({
            draggable: true,
            color: '#00FF00'
        });
        
        //Update a marker for draggable Long and Lat
        const addMarker = (e) => {
            console.log(e.lngLat);
            let coordinates = e.lngLat;
            marker.setLngLat(coordinates).addTo(map.current);
        };

        //Geolocate User
        
        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
                },
                showAccuracyCircle: false,
                fitBoundsOptions: {
                    maxZoom: 15,
                },
                showUserLocation: true,
                
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
            //map.current.getSource('single-point').setData(e.result.geometry);
            geocoder.setInput(e.result.place_name);
            geocoder.setLimit(3);

            //Only Avilable on delivery
            if(!pickUp) {
                marker.setLngLat(e.result.geometry.coordinates).addTo(map.current);
                marker.on('dragend', () => {
                    const lngLat = marker.getLngLat();
                    console.log(lngLat);
                })
            }
        });
        

        
        //Get Latitude and Longitude on Click and add draggable marker
        map.current.on('click', (e) => {
             // If the user clicked on one of your markers, get its information.
             const features = map.current.queryRenderedFeatures(e.point, {
                layers: ['newest'] // replace with your layer name
            });

            const feature = features[0];
            console.log(feature);

            console.log(e.lngLat)

            map.current.flyTo({
                center: e.lngLat,
                duration: 1000,
                zoom: 15,
            })

            setLatitude(e.lngLat.lat);
            setLongitude(e.lngLat.lng);
            
            //Marker Avilable only on delivery not in pickUp
            if(!pickUp) {
                addMarker(e);
                axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?limit=1&access_token=pk.eyJ1IjoicGluZmxhZyIsImEiOiJja3ZpM3JqemkwMXdrMnZtaHBjNDVkOW5nIn0.s-_0Qw7og1cw0tsubdH8kQ`)
                .then((res) => {
                    console.log(res.data.features[0].place_name);
                    geocoder.setInput(res.data.features[0].place_name);
                    geocoder.setLimit(1);
                }).catch((err) => {
                    console.log(err);
                });

                //Update marker on drag to get Lng-Lat
                marker.on('dragend', () => {
                const lngLat = marker.getLngLat();
                //Set Lng-Lat for renderButton
                setLongitude(lngLat.lng);
                setLatitude(lngLat.lat);
                //Reverse Geocoding for get Lng-Lat information
                axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?limit=1&access_token=pk.eyJ1IjoicGluZmxhZyIsImEiOiJja3ZpM3JqemkwMXdrMnZtaHBjNDVkOW5nIn0.s-_0Qw7og1cw0tsubdH8kQ`)
                .then((res) => {
                    console.log(res.data.features[0].place_name);
                    geocoder.setInput(res.data.features[0].place_name);
                    geocoder.setLimit(1)
                }).catch((err) => {
                    console.log(err);
                });
            })
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

    const [displayInformation, setDisplayInformation] = useState(false);
    const handleDisplayInformation = () => {
        setDisplayInformation(!displayInformation);
    }
    
    return (
        <>
        <MapHeader>
            <div className="header">
                    <h1 className='title-text'>Punto: Pick up blue express Carmenci </h1>
                    <img src={PinMapLogo} alt="PinflagLogo" />
 
            </div>
            <div className="instructions container">
                <h4 onClick={handleDisplayInformation} >Instrucciones:</h4>
                {   
                    displayInformation &&
                    <>
                    <span> - Selecciona si deseas delivery o pick-up. </span>
                    <span> - Introduce tu direccion en la barra de busqueda.</span>
                    <span> - Selecciona el punto (solo pick-up).</span>
                    <span> - Confirma que le direccion sea la correcta.</span>
                    </>
                }
            </div>
            <div className="button-row container">
                <button>Pickup</button>
                <button className='delivery'>Delivery</button>
            </div>
            <div className="input-row container">
                <input type="text" name="" id="" value="Direccion" disabled={true} />
                <input type="search" name="" id="" />
            </div>
        </MapHeader>
        <MapComponent>
            <div ref={mapContainer} className="map"/>
        </MapComponent>
        </>
    )
}

export default Map

const MapHeader = styled.div`
    *{
        margin:0;
        padding: 0;
        box-sizing: border-box;
        background-color: transparent;
    }
    width: 600px;
    .container {
        width: 90%;
        margin: 0 auto;
    }

    .header{
        display: flex;
        align-items:center;
        justify-content: flex-start;
    }
    .header h1{
        border: 1px solid black;
    }
    .header img {
        width: 5rem;
        border: 1px solid black;
        border-radius: 2.5rem;
    }
    .instructions{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
    .instructions h4 {
        cursor: pointer;
    }
    .button-row {
        display: flex;
    }
    .button-row button {
        width: 10rem;
        padding: 0.5rem;
        margin: 0.4rem auto;
        border: none;
        border-radius: .3rem;
        font-weight: 500;
        font-size: 1.1rem;
        color: white;
        background-color: #04776F;
    }
    .delivery {
        background-color: #05B6B0;
    }
    .title-text {
        color: #05B6B0;
    }
    .input-row {
        display: flex;
        flex-direction: column;
    }
`

const MapComponent = styled.div`
    width: 600px;
    height: 400px;
    border: 1px solid black;
    border-radius: 1rem;

    .map{
        width: 100%;
        height: 100%;
    }
    .container {
        width: 90%;
        margin: 0 auto;
    }
`
