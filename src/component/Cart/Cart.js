import React from 'react';

const Cart = (props) => {
    const {cart} = props;

    // let total = 0;
    // for(const product of cart){
    //     total = total + product.price;
    // }

    // let total = 0 ;
    // for (let i = 0; i < cart.length; i++) {
    //     const product = cart[i];
    //     total = total + product.price;  
    // }

    // const total = cart.reduce((previous, product) => previous + product.price, 0)


    let total = 0;
    let totalQuantity = 0;
    for(const product of cart){
        if(!product.quantity){
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }

    const shipping = total > 0 ? 15 : 0;
    const tax = (total + shipping) / 10;  // const tax = (total + shipping) * 0.10;
    const grandTotal = total + shipping + tax;

    return (
        <div>
            <h3>Order Summary</h3>
            <h5>Items Orders: {totalQuantity}</h5>
            <p>Total {total.toFixed(2)}</p>
            <p>Shipping {shipping}</p>
            <p>Tax {tax.toFixed(2)}</p>
            <p>GrandTotal {grandTotal.toFixed(2)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;