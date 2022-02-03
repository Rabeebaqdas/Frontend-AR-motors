import React from 'react';
import styled from 'styled-components';
import { catagories } from './data';
import CatagoryItems from './CatagoryItems';

const Container = styled.div`
display:flex;
padding:20px;
justify-content:space-between;
`

const  Catagories = () => {
    return (
        <Container>
       
            {
                catagories.map((items)=>(
                    <CatagoryItems items={items} key={items.id} />

                ))
            }
        </Container>
    );
}

export default Catagories;