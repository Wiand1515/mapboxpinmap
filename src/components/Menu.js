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
    <MENU>
      <div className="landing-container col">
        <div className="logo-container">
          <img alt="logo" src={logo} className="landing-logo" />
        </div>
        <span className="landing-msg">Elige como recibir tu pedido</span>
        <div className="row btn-container">
          <div className="btn-text-wrapper">
            <div className="btn-landing" onClick={deliveryClick}>
              <img alt="delivery-icon" src={delivery_icon} className="icon" />
              <span className="btn-text">Despacho a domicilio</span>
            </div>
            <div className="description">
              <span>Recibes tu pedido en la dirección que quieras</span>
            </div>
          </div>
          <div className="btn-text-wrapper">
            <div className="btn-landing" onClick={pickupClick}>
              <img alt="pickup-icon" src={pickup_icon} className="icon" />
              <span className="btn-text">Pick up</span>
            </div>
            <div className="description">
              <span>Retiras tu pedido en un punto Pinflag</span>
            </div>
          </div>
        </div>
      </div>
    </MENU>
  );
};

export default Menu;

const MENU = styled.div`

  .landing-container {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo-container {
    width: 50%;
    margin: 1em auto 0em auto;
  }

  .landing-logo {
    max-height: 2.5rem;
  }

  .btn-container {
    gap: 3rem;
    margin: 0 auto;
    padding: 1em;
    height: 100%;
    display: flex;
  }

  .btn-landing {
    background-color: white;
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    padding: 1em;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .btn-text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    flex: 1 1 1;
    width: 100%;
  }

  .icon {
    width: 3rem;
    padding: 0.2rem;
    height: 3rem;
    margin-bottom: 1em;
    filter: contrast(50%);
  }

  .landing-msg,
  .btn-text {
    font-weight: bold;
  }
`;
