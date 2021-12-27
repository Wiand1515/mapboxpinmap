import React from "react";
import logo from '../assets/logo_pinflag.png'
import backArrow from '../assets/back-arrow.svg'
import successIcon from '../assets/address-succes-icon.svg'
import pickUpLogo from '../assets/pickup-point-icon.svg'
import addressIcon from '../assets/geolocation-icon.svg'
import { AddressSuccess } from "../styles/AddressSave.style";

const AddressSave = ({isPickup,addressData,pickUp}) => {

  console.log(addressData);

  return (
    <AddressSuccess>
      <div className="container">
          <div className="header">
              <img src={logo} alt="Pinflag-logo-brand" className="brand-logo" />
              <img src={backArrow} alt="Back to menu button" className="back-arrow-btn" onClick={isPickup}/>
          </div>
          <div className="body">
              <img className="success-icon" src={successIcon} alt="success-address-icon" />
              <span className="body-text">¡Listo! se guardo</span>
              <span className="body-text">exitosamente la dirección</span>
              
              <div className="address-information">
              {
                pickUp &&
                  <div className="text-address-info">
                    <img src={pickUpLogo} alt="Pickup-logo-success-Address" />
                    <span className="point-name">{addressData.pickUpName}</span>
                </div>
              }
                
              <div className="text-address-info">
                <img src={addressIcon} alt="Pickup-logo-success-Address" />
                <span className="address">{addressData.address + " " + addressData.number + ", " + addressData.comuna}</span>
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
