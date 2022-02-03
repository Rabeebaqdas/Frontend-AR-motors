import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../redux/ApiCalls';

const Container = styled.div`
width:100vw;
height:100vh;
background:linear-gradient(rgba(255,255,255,0.2),
rgba(255,255,255,0.2)),
url("/images/login.jpg");
display:flex;
justify-content:center;
align-items:center;
background-size:cover;
`

const Wrapper = styled.div`
width:40%;
padding:20px;
background-color:white;
`

const Form = styled.form`
display:flex;
flex-direction:column;
`

const Title = styled.h1`
font-size:24px;
font-weight:300;
text-align:center;
`

const Input = styled.input`
flex:1;
min-width:40%;
margin:10px 0px;;
padding:10px;
`

const Link = styled.a`
margin:10px 0px;
font-size:13px;
text-decoration:underline;
cursor:pointer;
color:black;
`

const Button = styled.button`
width:100%;
border:none;
padding:15px 20px;
background-color:teal;
color:white;
cursor:pointer;
margin-bottom:10px;
&:disabled{
    color:"green";
    cursor:not-allowed;
}
`

const Error =styled.span`
color:red;
cursor:"not-allowed";
`


export const Login = () => {
    const [username,setusername] = useState('')
    const [password,setpassword] = useState('')
   const dispatch = useDispatch();
   const {isFetching,error} = useSelector(state=>state.user)
   
const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch,{username,password});
    setusername('');
    setpassword('');    
}

    return (
        <Container>
            <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="username" value={username} onChange={(e)=>setusername(e.target.value)} required/>
                    <Input type="password" placeholder="password" value={password} required onChange={(e)=>setpassword(e.target.value)} />
                  <Button onClick={handleLogin} disabled={isFetching}>LOGIN</Button>
                  {error && <Error>Something went wrong</Error>}
                  <Link>DO NOT REMEMBER THE PASSWORD?</Link>
                  <NavLink to='/register'><Link>CREATE A NEW ACCOUNT</Link></NavLink>
                </Form>
            </Wrapper>
        </Container>
        </Container>
    )
}

export default Login;
