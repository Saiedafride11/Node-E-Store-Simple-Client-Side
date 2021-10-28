import { useState } from 'react';
import { useEffect } from 'react';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect( () => {
        // fetch('./products.json')
        // fetch('http://localhost:5000/products')
        fetch('https://hidden-reef-85288.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data.products))
    }, [])
    // return necessary things
    return [products, setProducts]
};

export default useProducts;