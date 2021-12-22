import { useState } from "react";
import styled from "styled-components";
import Map from "./components/Map";
import Menu from "./components/Menu";

const App = () => {

  const [isPickup, setIsPickup] = useState(undefined);
  const delivery = 'mapbox://styles/pinflag/ckwyxnhds0jtb14pi2g8ovrn8';
  const pickUp = 'mapbox://styles/pinflag/ckvlc67tw288a14o2hja471r0';
  
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
        <Map url={pickUp} isPickup={setIsPickup}/>
        </>
        :
        <>
        <button onClick={handleClick}>ToogleMap</button>
        <Map url={delivery} isPickup={setIsPickup}/>
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
