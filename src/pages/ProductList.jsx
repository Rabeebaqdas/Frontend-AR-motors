import React,{useState} from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { useLocation } from 'react-router';
const Container = styled.div`
`
const Title = styled.div`
margin:20px;
font-weight:1000;
font-size:3em;
text-align:center;
`
const FilterContainer = styled.div`

display:flex;
justify-content:space-between;
`
const Filter = styled.div`
margin:20px;
`

const FilterText = styled.span`
font-size:20px;
font-weight:600;
margin-right:20px;
`
const Select  = styled.select`
padding:10px;
`
const Option  = styled.option`
`

const  ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filter,setfilter] = useState([]);
  const [sort,setsort] = useState("");

    return (
      <Container>
      <Navbar />
      <Announcement />
      <Title>Cars</Title>
      <FilterContainer>
        <Filter><FilterText>Filter years:</FilterText>
        <Select onChange={(e)=>setfilter({year:e.target.value})}>
        <Option disabled selected>Year</Option>
        <Option>2021</Option>
        <Option>2020</Option>
        <Option>2019</Option>
        <Option>2018</Option>
        <Option>2017</Option>
        <Option>2016</Option>
        <Option>2015</Option>
        </Select>
        </Filter>
        <Filter><FilterText>Sort Cars:</FilterText>
        <Select onChange={(e)=>setsort(e.target.value)}>
        <Option value="newest">Newset</Option>
        <Option value="asc">Price (asc)</Option>
        <Option  value="desc">Price (desc)</Option>
        </Select>
         </Filter>
      </FilterContainer>
      <Products cat={cat} filter={filter} sort={sort} />
      <Newsletter />
      <Footer />
      </Container>
    );
  }
  
  export default ProductList;