import React from 'react';

const AddToCart = (props) => {
    const {cart} = props;
    
    let total = 0;
    let totalQuantity = 0;
    for(const product of cart){
        if(!product.quantity){
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }

    return (
            <>
                {totalQuantity}
            </>
    );
};

export default AddToCart;