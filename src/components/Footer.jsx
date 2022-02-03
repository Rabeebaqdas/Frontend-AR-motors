import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import React from "react";
import styled from 'styled-components'

const Container = styled.div`
display:flex;
`
const Left = styled.div`
display:flex;
flex-direction:column;
padding:20px;
flex:1;
`
const Logo = styled.img`
width:300px;
height:100px;
object-fit:contain;
`
const Desc = styled.p`
margin:20px 0px;
`
const SocialContainer = styled.div`
display:flex;
`
const SocialIcon = styled.div`
width:40px;
height:40px;
border-radius:50%;
cursor:pointer;
color:white;
background-color:#${props=>props.color};
display:flex;
align-items:center;
justify-content:center;
margin-right:20px;
`
const Center = styled.div`
flex:1;
padding:20px;

`
const Title = styled.h3`
margin-bottom:30px;
`
const List = styled.ul`
margin:0;
padding:0;
list-style:none;
display:flex;
flex-wrap:wrap;
`
const ListItems = styled.li`
width:50%;
margin-bottom:10px;
`

const Right = styled.div`
flex:1;
padding:20px;
`

const ContactItem = styled.div`
margin-bottom:20px;
display:flex;
align-items:center;
`
const Payment = styled.img`
width:250px;
cursor:pointer;
`


const  Footer = () => {
    return (
      <Container>
       <Left>
           <Logo src="/images/logo.png" />
                      <Desc>Setting up a website, even for the car industry, is way simpler than you may think.
                You do not have to complicate and spend enormous amounts of money on hiring someone or a team to do it for you.
                 </Desc>
                 <SocialContainer>
                     <SocialIcon color="3B5999">
                         <Facebook />
                     </SocialIcon>
                     
                     <SocialIcon color="E4405F">
                         <Instagram/>
                     </SocialIcon>
                     
                     <SocialIcon color="55ACEE">
                         <Twitter />
                     </SocialIcon>

                     <SocialIcon color="E60023">
                         <Pinterest />
                     </SocialIcon>
                 </SocialContainer>
       </Left>
       <Center>
           <Title>Useful Links</Title>
           <List>
               <ListItems>Home</ListItems>
               <ListItems>Cart</ListItems>
               <ListItems>Products</ListItems>
               <ListItems>Order</ListItems>
               <ListItems>Catagories</ListItems>
               <ListItems>Accessories</ListItems>
               <ListItems>My Account</ListItems>
               <ListItems>Order Tracking</ListItems>
               <ListItems>Wishlist</ListItems>
               <ListItems>Terms</ListItems>
           </List>
       </Center>
       <Right>
           <Title>Contact</Title>
           <ContactItem><Room style={{marginRight:"10px"}}/>Area 36/f House # 194 Landhi # 05 Karachi</ContactItem>
           <ContactItem><Phone style={{marginRight:"10px"}}/>0311-2354067</ContactItem>
           <ContactItem><MailOutline style={{marginRight:"10px"}}/>rabeebaqdas@gmail.com</ContactItem>
           <Payment src="/images/payment.png" />
           </Right>  
      </Container>
    );
  }
  
  export default Footer;