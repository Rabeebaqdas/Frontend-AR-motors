import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
flex:1;
margin:3px;
height:70vh;
position:relative;
`

const Image = styled.img`
width:100%;
height:100%;
object-fit:cover;
`

const Info = styled.div`
position:absolute;
top:0;
bottom:0;
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;  
`
const Title = styled.h1`
color:white;
margin-bottom:20px;
font-weight:600;
font-size:2.5em;

`
const Button = styled.button`
border:none;
padding:10px;
background-color:white;
cursor:pointer;
font-weight:600;
`

const  CatagoryItems = ({items}) => {
    return (
      <Container>
        <NavLink to={`/products/${items.cat}`}>
            <Image src={items.image}/>
            <Info>
                <Title>{items.title}</Title>
                <Button>SHOP NOW</Button>
            </Info>
        </NavLink>
      </Container>
    );
  }
  
  export default CatagoryItems;