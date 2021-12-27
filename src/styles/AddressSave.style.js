import styled from "styled-components"

export const AddressSuccess = styled.div`
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