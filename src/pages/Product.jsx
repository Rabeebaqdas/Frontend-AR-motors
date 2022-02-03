import { Add, Remove } from '@material-ui/icons';
import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { addProduct } from '../redux/cartRedux';
import {Comma} from './Cart'
const Container = styled.div`
`

const Wrapper = styled.div`
padding:50px;
display:flex;
`
const ImageContainer = styled.div`
flex:1;
`
const Image = styled.img`
width:100%;
height:50vh;
object-fit:contain;
`
const InfoContainer = styled.div`
flex:1;
padding:0px 50px;
`
const Title = styled.h1`
font-weight:200;
`
const Desc = styled.p`
margin:20px 0px;
`
const Price = styled.span`
font-weight:100;
font-size:40px;
`
const FilterContainer = styled.div`
width:50%;
margin:30px 0px;
display:flex;
justify-content:space-between;

`
const Filter = styled.div`
display:flex;
align-items:center;
`

const FilterTitle = styled.span`
font-size:20px;
font-weight:200;
`
const FilterColour = styled.div`
width:20px;
height:20px;
border-radius:50%;
border:1px solid;
background-color:${props => props.color};
margin:0px 5px;
cursor:pointer;
`

const FilterYear = styled.select`
margin-left:10px;
padding:5px;
`

const FilterYearOption = styled.option``


const AddContainer = styled.div`
width:50%;
display:flex;
align-items:center;
justify-content:space-between;
`
const AmountContainer = styled.div`
display:flex;
align-items:center;
font-weight:700;

`
const Amount = styled.span`
width:30px;
height:30px;
border-radius:10px;
border:1px solid teal;
display:flex;
align-items:center;
justify-content:center;
margin: 0px 5px;
`
const Button = styled.button`
padding:15px;
border:2px solid teal;
background-color:white;
cursor:pointer;
font-weight:500;

&:hover{
    background-color:#f8f4f4;
}
`

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
const [product,setproduct] = useState([]);
const [count,setcount] = useState(1)
const user = useSelector((state)=>state.user.currentUser)
const dispatch = useDispatch()
useEffect(()=>{
    const fetchData = async () =>{
        const res = await fetch(`http://localhost:5000/api/products/find/${id}`);
        const data = await res.json();
        setproduct(data);
       window.scroll(0,0)
    }
    fetchData();
},[]) 

const handleCount = (type) => {
    if(type == "add"){
        setcount(count+1)
    }else{
        setcount(count-1)
    }
}

const handleCart = () => {
dispatch(
    addProduct({...product,count})
)
}
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImageContainer>
                    <Image src={product?.img} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product?.title?.toUpperCase()}</Title>
                    <Desc>{product?.desc}</Desc>
                    <Price>${" "}{Comma(product?.price)}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Colour</FilterTitle>
                            {
                                product?.color?.map((c)=>(<FilterColour color={c} key={c}/>))
                            }
                            
                        </Filter>
                        <Filter>
                            <FilterTitle>Year</FilterTitle>
                            <FilterYear>
                                {
                                product?.year?.map((y)=>(<FilterYearOption key={y}>{y}</FilterYearOption>))
                            }
                            </FilterYear>
                        </Filter>
                    </FilterContainer>
                   { user ? <AddContainer>
                        {product?.inStock ? <AmountContainer>
                            {count<=1 ?  <Remove disabled style={{cursor:"pointer"}} />
                        :

                             <Remove onClick={()=>handleCount("sub")} style={{cursor:"pointer"}} />
                        }
                            <Amount>{count}</Amount>
                            <Add onClick={()=>handleCount("add")} style={{cursor:"pointer"}} />
                        </AmountContainer> : ""}
                        { product?.inStock ? <Button onClick={handleCart}>ADD TO CART</Button> : <Button>ADD TO WISHLIST</Button>}
                    </AddContainer> : " "}
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product;