import { useState } from "react";
import styled from "styled-components";
import Map from "./components/Map";
import Menu from "./components/Menu";

const App = () => {

  const [isPickup, setIsPickup] = useState(undefined);
  const deliveryUrl = 'mapbox://styles/pinflag/ckwyxnhds0jtb14pi2g8ovrn8';
  const pickUpUrl = 'mapbox://styles/pinflag/ckvlc67tw288a14o2hja471r0';
  
  const handleClick = () => {
    setIsPickup(undefined);
  }

  return (
    <APP>
      {isPickup === undefined ?
        <Menu isPickup={setIsPickup}/> 
        :
        isPickup 
        ?
        <>
        <button onClick={handleClick}>ToogleMap</button>
        <Map url={pickUpUrl} isPickup={setIsPickup} pickUp={isPickup}/>
        </>
        :
        <>
        <button onClick={handleClick}>ToogleMap</button>
        <Map url={deliveryUrl} isPickup={setIsPickup} pickUp={isPickup}/>
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
