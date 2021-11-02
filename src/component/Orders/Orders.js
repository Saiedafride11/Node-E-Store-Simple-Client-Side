
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../hooks/useAuth';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const {user} = useAuth();
    const history = useHistory();
    useEffect( () => {
        // fetch(`http://localhost:5000/orders?email=${user.email}`, {
        fetch(`https://hidden-reef-85288.herokuapp.com/orders?email=${user.email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('idToken')}`
            }
        })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
            else if (res.status === 401) {
                history.push('/login');
            }

        })
        .then(data => {
            console.log('orders', data)
            setOrders(data)
        })
    },[])
    return (
        <div>
            <br/>
            <br/>
            <h2>You have placed: {orders.length} Orders</h2>
            <ul>
                {orders.map(order => <li
                    key={order._id}
                >{order.name} : {order.email}</li>)}
            </ul>
        </div>
    );
};

export default Orders;