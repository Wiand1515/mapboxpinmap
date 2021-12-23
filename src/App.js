import axios from "axios";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import styled from "styled-components";
import Map from "./components/Map";
import Menu from "./components/Menu";
import { WAREHOUSE_URL } from "./constant";
import { checkAvailability, getConfig } from "./helper";

const App = () => {

  const [isPickup, setIsPickup] = useState(undefined);
  const [warehouse, setWarehouse] = useState(null);
  const [isAvailable, setIsAvailable] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const deliveryUrl = 'mapbox://styles/pinflag/ckwyxnhds0jtb14pi2g8ovrn8';
  const pickUpUrl = 'mapbox://styles/pinflag/ckvlc67tw288a14o2hja471r0';
  
  const handleClick = () => {
    setIsPickup(undefined);
  }

  useEffect(() => {
    if(!selectedWarehouse) {
      setIsAvailable(false);
      return;
    }
    axios.get(WAREHOUSE_URL(selectedWarehouse), getConfig()).then((res) => {
      setWarehouse(res.data);
      console.log(res.data);
      setIsAvailable(checkAvailability(res.data));
      console.log(res);
    }).catch( (err) => {
      console.log(err);
    })

  }, [selectedWarehouse,warehouse])

  return (
    <APP>
      {isPickup === undefined ?
        <Menu isPickup={setIsPickup} pickUp={isPickup}/> 
        :
        isPickup 
        ?
        <>
        <button onClick={handleClick}>ToogleMap</button>
        <Map 
        url={pickUpUrl} 
        isPickup={setIsPickup} 
        pickUp={isPickup}
        setter={setSelectedWarehouse}
        isAvailable={isAvailable}
        />
        </>
        :
        <>
        <button onClick={handleClick}>ToogleMap</button>
        <Map 
        url={deliveryUrl} 
        isPickup={setIsPickup} 
        pickUp={isPickup}
        setter={setSelectedWarehouse}
        isAvailable={isAvailable}
        />
        </>
      }
  
    </APP>
  );
}

export default App;

const APP = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
