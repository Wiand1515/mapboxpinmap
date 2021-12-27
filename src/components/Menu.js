import React from "react";
import logo from "../assets/logo_pinflag.png";
import delivery_icon from "../assets/delivery-icon.svg";
import pickup_icon from "../assets/pickup-icon.svg";
import { SelectMenu } from "../styles/Menu.style";

const Menu = ({ isPickup }) => {
  const deliveryClick = () => {
    isPickup(false);
    console.log(isPickup);
  };

  const pickupClick = () => {
    isPickup(true);
    console.log(isPickup);
  };

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
            <span>Despacho a domicilio</span>
          </button>
          <button className="btn btn-bottom" onClick={pickupClick}>
            <img src={pickup_icon} alt="Pickup Icon" />
            Retiro en punto
          </button>
          <span className="sub-title-button-col">
            *Retiras tu pedido en el lugar que más te acomode.
          </span>
        </div>
      </div>
    </SelectMenu>
  );
};

export default Menu;
