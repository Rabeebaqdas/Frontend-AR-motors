import {createSlice} from '@reduxjs/toolkit';
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        quantity:0,
        product:[],
        total:0
    },
    reducers:{
        addProduct:(state,action) => {
            state.quantity += 1;
            state.product.push(action.payload);
            state.total += action.payload.price*action.payload.count;
           
        },
        deleteProduct:(state,action)=>{
           state.product.filter((pro)=>{
               if(pro._id == action.payload){
                   state.total -= pro.price * pro.count;
               }
           })
            state.quantity -= 1;
            const lastest = state.product.filter((item)=>item._id !== action.payload)
            state.product = lastest;
        },
        emptyProduct : (state) => {
            state.product = [];
            state.quantity = null;
            state.total = 0;
        }
    }
})

export const {addProduct,deleteProduct,emptyProduct} = cartSlice.actions;
export default cartSlice.reducer;