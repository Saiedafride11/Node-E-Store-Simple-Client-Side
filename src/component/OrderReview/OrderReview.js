import React from 'react';
import { useHistory } from 'react-router';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import useCart from '../hooks/useCart';
import useProducts from '../hooks/useProducts';
import ReviewItem from '../ReviewItem/ReviewItem';

const OrderReview = () => {
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart();
    const history = useHistory();

    const handleRemove = key => {
        // console.log(key);
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key);
    }

    const handleProceedToShipping = () => {
        // setCart([]);
        // clearTheCart();
        // history.push('/placeorder');
        history.push('/shipping');
    }
    return (
        <div className="shop-container" style={{paddingTop: '30px'}}>
            <div className="product-container">
                {   cart?.length === 0 ?
                    <h2 style={{textAlign: 'center', color: '#06abeb', marginTop: '100px'}}>No Product Added</h2>
                    :
                    cart?.map(product => <ReviewItem product={product} handleRemove={handleRemove} key={product.key}></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                {/* <h1>{products.length}</h1>
                <h1>{cart.length}</h1> */}
                <Cart cart={cart}>
                    <button onClick={handleProceedToShipping} className="btn-regular">Proceed To Shipping</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;