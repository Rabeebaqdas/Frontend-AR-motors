import React,{useState,useEffect} from 'react'
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import { Add, DeleteOutlined, Remove } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import {userRequest} from '../components/requestMethod'
import { useNavigate } from 'react-router'
import { deleteProduct, emptyProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';

const KEY = "pk_test_51JxoMHHrzVE2nXkkPNfR0IX37wJrtlu4GNT6vLp8I84pJMDrF3CYaKh6elmQgOHPNBd6aFLXAnl2Tuj9ISBJe0bl00jbdBqwn4";

const Container = styled.div``
const Wrapper = styled.div`
padding:20px;

`
const Title = styled.h1`
font-weight:300;
text-align:center;
`
const Top = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
padding:20px;
`
const TopBottom = styled.button`
padding:10px;
font-weight:600;
cursor:pointer;
border:${props => props.type == "filled" && "none"};
background-color:${props => props.type == "filled" ? "black" : "transparent"};
color:${props => props.type == "filled" && "white"}


`

const TopTexts = styled.div`

`
const TopText = styled.span`
text-decoration:underline;
margin:0px 10px;
cursor:pointer;
`

const Bottom = styled.div`
display:flex;
justify-content:space-between;

`


const Info = styled.div`
flex:3;

`


const Details = styled.div`
padding-left:20px;       
display:flex;
flex-direction:column;
justify-content:space-around;

`
const Product = styled.div`
display:flex;
justify-content:space-between;
margin:20px;
`
const ProductDetail = styled.div`
flex:2;
display:flex;

`
const Image = styled.img`

width:200px;
object-fit:cover;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
border:1px solid black;
width:20px;
height:20px;
border-radius:50%;
background-color:${props => props.color}
`
const ProductModel = styled.span``
const PriceDetail = styled.span`
flex:1;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
const HR = styled.hr`
background-color:#eee;
border:none;
height:1px;
`
const ProductAmountContainer = styled.div`
display:flex;
align-items:center;
margin-bottom:20px;
`
const ProductAmount = styled.div`
font-size:24px;
margin:5px;
`
const ProductPrice = styled.div`
font-size:30px;
font-weight:200;
`
const Summary = styled.div`
flex:1;
border:0.5px solid lightgrey;
border-radius:10px;
padding:20px;
height:55vh;
`

const SummaryTitle = styled.h1`
font-weight:200;
`    
const SummaryItemsPrice = styled.span``
const SummaryItems = styled.div`
margin:30px 0px;
display:flex;
justify-content:space-between;
font-weight:${props=>props.type == "total" && "500"};
font-size:${props=>props.type == "total" && "24px"};
`
const SummaryItemsText = styled.span``
const Button = styled.button`
width:100%;
padding:12px;
cursor:pointer;
background-color:black;
color:white;
font-weight:600;
border:none;
`
  export const  Comma = (value) => {

    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const Cart = () => {
    const navigate = useNavigate();
    const cart = useSelector(state=>state.cart);
    const [stripeToken,setstripeToken] = useState(null)
    const dispatch = useDispatch();
    const onToken = (token) => {
        setstripeToken(token);
        
    }

    useEffect(()=>{
        const makeRequest = async () => {
            try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart?.total*100,
        });
        
        navigate('/success',{data:res.data});
        dispatch(emptyProduct());
            }catch(err){
                console.log(err)
            }
        }
       stripeToken && makeRequest();
    },[stripeToken,cart?.total,navigate])
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>Your Cart</Title>
                <Top>
                    <NavLink to="/products/:catagory">
                    <TopBottom>CONTINUE SHOPPING</TopBottom>
                    </NavLink>
                    <TopTexts>
                        <TopText>Shopping Cart ({cart?.quantity})</TopText>
                        <TopText>Your Wishlist (0) </TopText>
                    </TopTexts>
                    <TopBottom type="filled">CHECKOUT NOW</TopBottom>
                </Top>
                <Bottom>
                    <Info>
                        {cart?.product?.map((item)=>(
                        <Product>
                            <ProductDetail>
                                <Image src={item?.img} />

                                <Details>
                                    <ProductName><b>Product:</b> {item?.title.toUpperCase()}</ProductName>
                                    <ProductId><b>ID:</b> {item?._id}</ProductId>
                                    <ProductColor color={item?.color?.map((c)=>(c))}/>
                                    <ProductModel><b>Model:</b> {item?.year?.map((c)=>c)}</ProductModel>
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Add />
                                    <ProductAmount>{item.count}</ProductAmount>
                                    <Remove />
                                </ProductAmountContainer>
                                <ProductPrice>$ {Comma(item.price*item.count)}</ProductPrice>
                            </PriceDetail>
                            <DeleteOutlined style={{cursor:"pointer"}} onClick={()=>dispatch(deleteProduct(item._id))}></DeleteOutlined>
                        </Product>
                        ))}
                
                        <HR />
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItems>
                            <SummaryItemsText>Subtotal</SummaryItemsText>
                            <SummaryItemsPrice>$ {Comma(cart?.total)}</SummaryItemsPrice>
                        </SummaryItems>
                        <SummaryItems>
                            <SummaryItemsText>Estimated Shipping</SummaryItemsText>
                            <SummaryItemsPrice>$ {Comma(cart?.quantity * 1000)}</SummaryItemsPrice>
                        </SummaryItems>
                        <SummaryItems>
                            <SummaryItemsText>Shipping Discount</SummaryItemsText>
                            <SummaryItemsPrice>$ -{Comma((cart?.quantity * 1000))}</SummaryItemsPrice>
                        </SummaryItems>
                        <SummaryItems type="total">
                            <SummaryItemsText>Total</SummaryItemsText>
                            <SummaryItemsPrice>$ {Comma(cart?.total)}</SummaryItemsPrice>
                        </SummaryItems>
                        <StripeCheckout
                        name="AR MOTORS"
                        image = "https://avatars.githubusercontent.com/u/1486366?v=4"
                        billingAddress
                        shippingAddress
                        description = {`Your total is $ ${Comma(cart?.total - (cart?.quantity * 1000+(cart?.quantity * 1000)*40/100))}`}
                        amount={(cart.total - (cart?.quantity * 1000+(cart?.quantity * 1000)*40/100))*100}
                       token={onToken}
                       stripeKey={KEY}
                        >
                        <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                        
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}
export default Cart;