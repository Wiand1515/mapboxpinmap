import React from "react";
import styled from "styled-components";
import logo from '../assets/logo_pinflag.png';
import delivery_icon from '../assets/delivery-icon.svg';
import pickup_icon from '../assets/pickup-icon.svg';


const Menu = ({
  isPickup
}) => {

    const deliveryClick = () => {
        isPickup(false)
        console.log(isPickup)
    }

    const pickupClick = () => {
        isPickup(true)
        console.log(isPickup)
    }


  return (
    <SelectMenu>
        <div className="container">
          <div className="header">
            <img src={logo} alt="brand-pinflag-logo" />
          </div>
          <div className="body">
            <span className="text-title">Elige como recibir</span>
            <span className="text-subtitle">tu compra.</span>
          </div>
          <div className="footer">
            <button className="btn btn-top" onClick={deliveryClick}>
              <img src={delivery_icon} alt="Delivery Icon" />
              <span>
                Despacho a domicilio
              </span>
            </button>
            <button className="btn btn-bottom" onClick={pickupClick}>
              <img src={pickup_icon} alt="Pickup Icon" />
              Retiro en punto
            </button>
            <span className="sub-title-button-col">*Retiras tu pedido en el lugar que más te acomode.</span>
          </div>
        </div>
    </SelectMenu>
  );
};

export default Menu;

const SelectMenu = styled.div`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Montserrat', sans-serif;
    }
    
    width: 100%;
    height: 100%;
    
    .container {
      width: 95%;
      margin: 0 auto;
    }
    .header img{
      width: 8rem;
      margin: 2rem;
    }

    .body{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 2rem;

    }

    .text-title{
      color: #33cccc;
      font-size: 1.5rem;
      font-weight:bold;

    }

    .text-subtitle{
      color: #8497A5;
      font-size: 1.5rem;
      font-weight: regular;
    }
    .footer{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }


    .footer button {
      width: 60%;
      padding: 1.1rem;
      border-radius: 3rem;
      border: none;
      background-color: white;
    }

    .btn {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-weight: regular;
      font-size: 1.1rem;
      color: #8497A5;
      background-color: white;
      cursor: pointer;
      box-shadow: rgba(99, 99, 99, 0.4) 0px 7px 29px 0px;
      
    }

    .btn img{
      width: 45px;
      height: 45px;
      margin-left: 2rem;
      margin-right: 2rem;
    }
    .btn-top {
      margin-top: 3rem;
      margin-bottom: 3rem;
    }


    .sub-title-button-col {
      color: #8497A5;
      font-size: 0.8rem;
      margin-top: 0.4rem;
      margin-bottom: 0.8rem;
    }

`