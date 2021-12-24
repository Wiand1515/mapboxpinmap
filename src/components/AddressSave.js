import React from "react";
import styled from "styled-components";
import logo from '../assets/logo_pinflag.png'
import backArrow from '../assets/back-arrow.svg'
import successIcon from '../assets/address-succes-icon.svg'
import pickUpLogo from '../assets/pickup-point-icon.svg'
import addressIcon from '../assets/geolocation-icon.svg'

const AddressSave = () => {
  return (
    <AddressSuccess>
      <div className="container">
          <div className="header">
              <img src={logo} alt="Pinflag-logo-brand" className="brand-logo" />
              <img src={backArrow} alt="Back to menu button" className="back-arrow-btn" />
          </div>
          <div className="body">
              <img className="success-icon" src={successIcon} alt="success-address-icon" />
              <span className="body-text">¡Listo! se guardo</span>
              <span className="body-text">exitosamente la dirección</span>

              <div className="address-information">
                <div className="text-address-info">
                  <img src={pickUpLogo} alt="Pickup-logo-success-Address" />
                  <span className="point-name">Lippi Mall Parque Arauco</span>
                </div>
                
              <div className="text-address-info">
                <img src={addressIcon} alt="Pickup-logo-success-Address" />
                <span className="address">Av. Andres Bello 41234</span>
              </div>

              </div>
          </div>
          <div className="footer">
              <span className="footer-text">Continua con el</span>
              <span className="footer-text">proceso de compra...</span>
          </div>
      </div>
    </AddressSuccess>
  );
};

export default AddressSave;

const AddressSuccess = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
  }

  width: 100%;
  height: 100%;

  .container {
    width: 95%;
    margin: 0 auto;
  }
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
    justify-content: center;
    align-items: center;
    margin: 2rem;
  }
  .success-icon {
    width: 5.2rem;
    margin-bottom: 1rem;
  }
  .body-text {
    font-weight: bold;
    font-size: 1.3rem;
    color: #33cccc;
  }
  .address-information{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5rem;
    width: 30rem;
    border-radius: 2rem;
    background-color: #F1F6F8;
    margin-top: 1.4rem;
  }

  .text-address-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .text-address-info img {
    width: 1.2rem;
    margin-left: 1rem;
  }
  .point-name {
    color: #8497A5;
    font-weight: 500;
    margin-left: 1rem;
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
  }

  .address {
    color: #8497A5;
    font-weight: medium;
    margin-left: 1rem;
    font-size: 1rem;
  }



  
  .footer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3.6rem;
  }

  .footer-text {
    font-size: 1.4rem;
    color: #8497A5;
    font-weight: medium;
  }

  

`
