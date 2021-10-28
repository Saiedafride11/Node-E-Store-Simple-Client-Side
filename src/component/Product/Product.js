import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Rating from 'react-rating';

const Product = (props) => {
    const {name, img, seller, price, stock, star, features} = props.product;
    
    // for(const feature of features) {
    //     // const featureDetails = Object.entries(feature);
    //     const featureDetails = feature ? feature : 'No feature available';
    //     // console.log(featureDetails);
    // }


    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
               <h4 className="product-name">{name}</h4>
               <div style={{display: 'flex'}}>
                    <div style={{marginRight: '20px'}}>
                        <p><small>By: {seller}</small></p>
                        <p>Price: {price}</p>
                        <p><small>Only {stock} left in stock - order soon</small></p>
                    </div>
                    <div>
                        <p><Rating initialRating={star} emptySymbol="far fa-star icon-color" fullSymbol="fas fa-star icon-color" readonly></Rating></p>
                        {
                            features?.length === 0 ?
                            <p><strong>No Features Available</strong></p>
                            :
                            features?.map((item, index) => <li key={index}><strong>{item.description}</strong> : {item.value}</li>)
                        }
                    </div>
                </div>
                <button className="btn-regular" onClick={() => props.handleAddToCart(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;