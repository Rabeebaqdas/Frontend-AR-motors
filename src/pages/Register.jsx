import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../redux/ApiCalls';

const Container = styled.div`
width:100vw;
height:100vh;
background:linear-gradient(rgba(255,255,255,0.2),
rgba(255,255,255,0.3)),
url("/images/register.jpg");
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
flex-wrap:wrap;
`

const Title = styled.h1`
font-size:24px;
font-weight:300;
text-align:center;
`

const Input = styled.input`
flex:1;
min-width:40%;
margin:20px 10px 0px 0px;
padding:10px;
`

const Aggrement = styled.span`
font-size:12px;
margin:20px 0px;
`

const Button = styled.button`
width:100%;
border:none;
padding:15px 20px;
background-color:teal;
color:white;
cursor:pointer;
&:disabled{
    color:"green";
    cursor:not-allowed;
}
`



export const Register = () => {
    const [fname,setfname] = useState('');
    const [lname,setlname] = useState('');
    const [username,setuname] = useState('');
    const [password,setpass] = useState('');
    const [email,setemail] = useState();
    const [cpass,setcpass] = useState('');
    const dispatch = useDispatch()
    const isAdmin = false

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        register(dispatch,{username,email,password,isAdmin});
        navigate('/login');

    }
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="first name" onChange={(e)=>setfname(e.target.value)}/>
                    <Input placeholder="last name" onChange={(e)=>setlname(e.target.value)} />
                    <Input placeholder="username" onChange={(e)=>setuname(e.target.value)} />
                    <Input type="email" placeholder="email" onChange={(e)=>setemail(e.target.value)}  />
                    <Input type="password" placeholder="password" onChange={(e)=>setpass(e.target.value)} />
                    <Input type="password" placeholder="confrim password" onChange={(e)=>setcpass(e.target.value)} />
                  <Aggrement>By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVATE POLICY</b>
                  </Aggrement>
                
                 {password == cpass ?  <Button onClick={handleClick}>CREATE</Button> : <Button disabled>CREATE</Button> }
           
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register;