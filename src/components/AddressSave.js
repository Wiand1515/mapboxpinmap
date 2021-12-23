import React from "react";
import styled from "styled-components";

const AddressSave = () => {
  return (
    <AddressSuccess>
      <div className="container">
          <div className="header">
              Header
          </div>
          <div className="body">
              Body
          </div>
          <div className="footer">
              Footer
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
  .header img {
    width: 8rem;
    margin: 2rem;
  }

  .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;
  }
`
