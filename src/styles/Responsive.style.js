import styled from "styled-components";

const Col = styled.div`
  
  width: ${(props) => props.col};



  @media (max-width: 1024px) {
    
    width: ${(props) => props.colMedium};
    justify-self: center;
  align-self:center;
  }

  @media (max-width: 768px) {
   
    width: 100%;    
  }
`
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;

`
const Container = styled.div`
width: 90%;
margin: auto !important;

`
export {Col, Row, Container}