import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
padding:20px;
display:flex;
flex-wrap:wrap;
justify-content:space-between;
`

const  Products = ({ sort, filter, cat }) => {
    const [products, setproducts] = useState([]);
    const [filterproducts, setfilterproducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {    
            const res = await fetch(cat ? `http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products");
            const data = await res.json();
            setproducts(data);
        }
        fetchData();
    }, [cat])

    useEffect(()=>{
        cat && setfilterproducts(
            products.filter(item=> Object.entries(filter).every(([key,value])=>
            item[key].includes(value)
            ))
            
        )
            window.scroll(0,0);
    },[products,cat,filter])

    useEffect(()=>{
        if(sort=="newest"){
            setfilterproducts(prev=>[...prev].sort((a,b)=>a.createdAt - b.createdAt))
        }else if(sort=="asc"){
            setfilterproducts(prev=>[...prev].sort((a,b)=>a.price - b.price))
        }else{
            setfilterproducts(prev=>
                [...prev].sort((a,b)=>b.price - a.price))
        }

    },[sort])

    return (
        <Container>
       
            {cat ?
                filterproducts.map((items)=>(
                    <Product items={items} key={items.id}/>

                ))
                :
                products?.slice(0,8).map((items)=>(
                    <Product items={items} key={items.id}/>

                ))
            }
        </Container>
    );
}

export default Products;