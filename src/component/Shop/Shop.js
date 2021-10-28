import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import logo from '../../images/logo.png';
import {addToDb} from '../../utilities/fakedb.js';
import {getStoredCart} from '../../utilities/fakedb.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import AddToCart from '../AddToCart/AddToCart';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    // Product to be render Ui
    const [displayProducts, setDisplayProducts] = useState([]);
    const size = 10;

    useEffect( () => {
        // console.log('API Called');
        // fetch('./products.json')
        // fetch(`http://localhost:5000/products?page=${page}&&size=${size}`)
        fetch(`https://hidden-reef-85288.herokuapp.com/products?page=${page}&&size=${size}`)
        .then(res => res.json())
        .then(data => {
            setProducts(data.products);
            setDisplayProducts(data.products);
            const count = data.count;
            const pageNumber = Math.ceil(count / size);
            setPageCount(pageNumber)
            // console.log('product received');
        })
    },[page])

    // useEffect( () => {
    //     // console.log('localStorage cart call')

    //     // const savedCart = getStoredCart();
    //     //     for(const key in savedCart) {
    //     //         const addedProduct = products.find(product => product.key === key);
    //     //         console.log(key, addedProduct)
    //     // }

    //     // if(products.length){
    //     //     const savedCart = getStoredCart();
    //     //     const storedCart = [];
    //     //     for(const key in savedCart) {
    //     //         const addedProduct = products.find(product => product.key === key);
    //     //         storedCart.push(addedProduct);
    //     //     }
    //     //     setCart(storedCart);
    //     // }

    //     if(products.length){
    //         const savedCart = getStoredCart();
    //         const storedCart = [];
    //         for(const key in savedCart) {
    //             // console.log(storedCart[key]);
    //             const addedProduct = products.find(product => product.key === key);
    //             if(addedProduct){
    //                 const quantity = savedCart[key];
    //                 addedProduct.quantity = quantity;
    //                 storedCart.push(addedProduct);
    //             }
    //         }
    //         setCart(storedCart);
    //     }
    // }, [products])

    const handleAddToCart = (product) => {
        // console.log(product);
        // const newCart = [...cart, product]
        // setCart(newCart);
        // addToDb(product.key);

        // const newCart = [...cart];
        // const existing = cart.find(c => c.key === product.key);
        // if(existing){
        //     product.quantity = product.quantity + 1;
        // }
        // else{
        //     product.quantity = 1;
        //     newCart.push(product);
        // }
        // setCart(newCart);
        // addToDb(product.key)

        // Janker vai solution two time add product
        const existing = cart.find(pd => pd.key === product.key);
        let newCart = [];
        if(existing){
            const rest = cart.filter(pd => pd.key !== product.key);
            existing.quantity = existing.quantity + 1;
            newCart = [...rest, product]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDb(product.key)
    }


    const handleSearch = event => {
        // console.log(event.target.value);
        const searchText = event.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchedProducts);
        // console.log(matchedProducts.length);
    }
    return (
        <div>
            <div className="search-container">
                <img className="logo" src={logo} alt="" />
                <input type="text" onChange={handleSearch} placeholder="Type here to search........." />
                <p><FontAwesomeIcon icon={faShoppingCart} /> <span><AddToCart cart={cart}></AddToCart></span></p>
            </div>
            <div className="shop-container">
                <div className="product-container">
                    {/* <h1>Product: {products.length}</h1> */}
                    {
                        // products?.map(product => <Product product={product} key={product.key} handleAddToCart={handleAddToCart}></Product>)
                        // displayProducts?.map(product => <Product product={product} key={product.key} handleAddToCart={handleAddToCart}></Product>)
                        
                        displayProducts?.length === 0 ?
                        <h2 style={{textAlign: 'center', color: '#06abeb', marginTop: '100px'}}>Loading...</h2>
                        :
                        displayProducts?.map(product => <Product product={product} key={product.key} handleAddToCart={handleAddToCart}></Product>)
                    }
                    <div className="pagination">
                        {
                            [...Array(pageCount).keys()].map(number => <button
                                className={number === page ? 'selected' : ''}
                                key={number}
                                onClick={() => setPage(number)}
                                >
                                {number + 1}</button>)
                        }
                    </div>
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="btn-regular">Review Your Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;