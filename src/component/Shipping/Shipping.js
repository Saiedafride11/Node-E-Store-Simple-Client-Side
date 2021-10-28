import React from "react";
import { useForm } from "react-hook-form";
import { clearTheCart, getStoredCart } from "../../utilities/fakedb";
import useAuth from "../hooks/useAuth";
import './Shipping.css';

const Shipping = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {user} = useAuth();
    const onSubmit = data => {
        // console.log(data)
        const savedCart = getStoredCart();
        data.order = savedCart;

        // fetch('http://localhost:5000/orders', {
        fetch('https://hidden-reef-85288.herokuapp.com/orders', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result);
            if(result.insertedId){
                alert('Order successfully');
                clearTheCart();
                reset();
            }
        })
    };
  
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <form onSubmit={handleSubmit(onSubmit)} className="shipping-form">
                <input defaultValue={user.displayName} {...register("name")} />
                <input defaultValue={user.email} {...register("email", { required: true })} />
                {errors.email && <span className="error">This field is required</span>}
                <input placeholder="Address" defaultValue="" {...register("address")} />
                <input placeholder="City" defaultValue="" {...register("city")} />
                <input placeholder="Phone" defaultValue="" {...register("phone")} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Shipping;