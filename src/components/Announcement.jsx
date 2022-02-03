import styled from 'styled-components'
import React from 'react'

const Container = styled.div`
height:30px;
background-color:teal;
color:white;
display:flex;
align-items:center;
justify-content:center;
font-size:14px;
font-weight:500;
`

export const Announcement = () => {
    return (
       <Container>
           Super Deal! Get 100% Discount On Your First Order Shipping
       </Container>
    )
}

export default Announcement;