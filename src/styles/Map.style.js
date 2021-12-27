import styled from "styled-components";

export const MapComponentContainer = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
  }

  width: 100%;
  height: 100%;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items:center;
  }
  .brand-logo {
    width: 8rem;
    margin: 2rem;
  }
  .back-arrow-btn {
    width: 3rem;
    margin-right: 2rem;
    cursor: pointer;
  }
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
  }
  .text-title {
    font-weight: bold;
    font-size: 1.5rem;
    color: #33cccc;
  }
  .text-subtitle {
    font-weight: medium;
    font-size: 1.5rem;
    color: #8497A5;
  }
  .address-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.8rem;
    border-radius: 0.5rem;
    background-color: #F1F6F8;
    margin-top: 1.5rem;
  }
  
  .address-text {
    font-weight: 500;
    color: #8497A5;
    font-size: 1.3rem;
  }

`;

export const MapComponent = styled.div`
  width: 100%;
  height: 50%;
  .map {
    border-radius: 1rem;
    height: 100%;
    width: 100%;
  }
  .container {
    width: 90%;
    margin: 0 auto;
  }


`;

export const SearchBar = styled.div`
    display: flex;
    margin: 1rem 0;
    width: 100%;

  .geocoder {
    width: 100%;
  }
    
    
  .btn {
    width: 20%;
    height: 3rem;
    border: none;
    border-radius: .5rem;
    background-color: #25D87A;
    color: white;
  }

  @media screen and (min-width: 640px){
    .mapboxgl-ctrl-geocoder {
    width: 33.3333%;
    font-size: 15px;
    line-height: 20px;
    max-width: 100% !important;
  }
  }
 


  .mapboxgl-ctrl{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .mapboxgl-ctrl-geocoder{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 0.5rem;
    height: 3rem;
  }
  .mapboxgl-ctrl-geocoder--icon-search{
    position: static;
  }
  .mapboxgl-ctrl-geocoder--button{
    position: static;
    margin-right: 0.3rem;
  }

  .mapboxgl-ctrl-geocoder--input{
    width: 100%;
  }
    `
