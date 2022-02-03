import React, { useState } from "react";
import styled from "styled-components";
import {ArrowLeftOutlined,ArrowRightOutlined} from '@material-ui/icons';
import { sliderItems } from "./data";
import { NavLink } from "react-router-dom";

const Container = styled.div`
width:100%;
height:100vh;
display:flex;
position:relative;
overflow:hidden;
`

const Arrow = styled.div`
width:50px;
height:50px;
background-color:#fff7f7;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
position:absolute;
top:0;
bottom:0;
left:${props=>props.direction === "left" && "10px"};
right:${props=>props.direction === "right" && "10px"};
margin:auto;
cursor:pointer;
opacity:0.5;
z-index:2;
`

const Wrapper = styled.div`
height:100%;
display:flex;
transition: all 1.5s ease;
transform : translateX(${props=> props.slideIndex * -100}vw);

`

const Slide = styled.div`
background-color:#f5fafd;
width:100vw;
height:100vh;
display:flex;
align-items:center;
`

const ImgContainer= styled.div`
height:100%;
flex:1
`

const Image= styled.img`
height:55%;
padding-top:140px;
`
const InfoContainer = styled.div`
    flex:1;
    padding:50px;
`
const Title = styled.h1`
font-size:78px;
`
const Desc = styled.p`
margin:50px 0px;
font-size:20px;
font-weight:500;
letter-spacing:3px;
`
const Button = styled.button`
padding:10px;
font-size:20px;
background-color:transparent;
cursor:pointer;
`


const Slider = () => {
    const [slideIndex,setSlideIndex] = useState(0);
    const handleChange = (direction) => {
        if(direction == "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        }
        if(direction == "right"){
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }
return(
    <Container>
        <Arrow direction="left" onClick={()=>handleChange("left")}>
            <ArrowLeftOutlined /> 
        </Arrow>
        <Wrapper slideIndex = {slideIndex}> 
            {
                sliderItems.map((items)=>{
                    return(
                        <Slide key={items.id}>
                        <ImgContainer>
                     <Image src={items.image}/>
                        </ImgContainer>
                        <InfoContainer>
                        <Title> {items.title}</Title>
                            <Desc>{items.desc}</Desc>
                            
                           <NavLink to="/products/:catagory"> <Button>Shop Now</Button></NavLink>
                        </InfoContainer>
                        </Slide>
                    )
                })
}
        </Wrapper>
        <Arrow direction="right" onClick={()=>handleChange("right")}>
            <ArrowRightOutlined /> 
        </Arrow>
    </Container>
);
}

export default Slider;