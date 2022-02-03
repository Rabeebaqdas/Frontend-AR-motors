import { Badge } from '@material-ui/core';
import { Search,  ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'
import { logout } from '../redux/userRedux';

const Container = styled.div`
  height: 60px;

`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
 
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;

`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  height:20px;
  padding:5px;
`;

const Input = styled.input`
  border: none;
  height:100%;

`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;    

const Logo = styled.img`
width:170px;
object-fit:contain;

`

const Right = styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:flex-end;
`

const MenuItems = styled.div`
font-size:14px;
cursor:pointer;
margin-left:25px;
`


export const Navbar = () => {
  const cart = useSelector(state=>state.cart.quantity);
  const user = useSelector(state=>state.user.currentUser);
  const  dispatch = useDispatch()

 const signout = () => {
  dispatch(logout());
 }
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input/>
                        <Search style={{color:"grey", fontSize:25 , marginLeft:"5px" , cursor:"pointer"}}/>
                    </SearchContainer>
                    </Left>
                <Center>
                        <Logo src="/images/logo.png" />
                    </Center> 
                <Right>
                {
             user ? 
           
              <NavLink to="/success"  style={{ textDecoration: 'none', color:"black",display:"none"}}><MenuItems></MenuItems></NavLink>
            :
            <NavLink to="/login"  style={{ textDecoration: 'none', color:"black"}}><MenuItems>REGISTER</MenuItems></NavLink>
            }
             {
             user ? 
           
              <NavLink to="/login"  style={{ textDecoration: 'none', color:"black"}}><MenuItems onClick={signout}>LOGOUT</MenuItems></NavLink>
            :
            <NavLink to="/login"  style={{ textDecoration: 'none', color:"black"}}><MenuItems>SIGN IN</MenuItems></NavLink>
            }
                  {user
                    ?
                  <NavLink to="/cart" style={{color:"black"}}>
                    <MenuItems>
                    <Badge badgeContent={cart} color="Primary">
                    <ShoppingCartOutlined />
                    </Badge>
                    </MenuItems>
                    </NavLink>
                  :
                  <MenuItems>
                  <ShoppingCartOutlined />
                  </MenuItems>
                  }
                </Right>
            </Wrapper>
        </Container>


    )
}

export default Navbar;
