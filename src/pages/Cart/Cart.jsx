import React, { useEffect, useState } from 'react';
import axios from "axios";
import Button from "../../components/atoms/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from '../../apiConfig.js';

import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [productCart, setProductCart] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/cart/${localStorage.getItem('customerID')}`).then(response => {
            if (response.data[0]) {
                localStorage.setItem('cartID', response.data[0].idCart);
                setCart(response.data);
            }
        });
    }, []);

    useEffect(() => {
        getProductsInCart();
    }, [cart]);

    function getProductsInCart() {
        const productRequests = cart.map(product => {
            return axios.get(`${API_BASE_URL}/product/${product.idProduct}`);
        });

        Promise.all(productRequests).then(productResponses => {
            const products = productResponses.map(response => response.data);
            setProductCart(products);
        });
    }

    const calculateTotal = () => {
        return productCart.reduce((acc, product) => {
            const cartItem = cart.find(item => item.idProduct === product.id);
            return cartItem ? acc + (product.price * cartItem.quantity) : acc;
        }, 0);
    };

    function deleteProduct(idProduct) {
        axios.delete(`${API_BASE_URL}/cart/${localStorage.getItem('cartID')}/${idProduct}`).then(() => {
            // axios.get(`http://localhost:3000/cart/${localStorage.getItem('customerID')}`).then(response => {
            //     setCart(response.data);
            // });
            window.location.reload();

        });
    }

    return (
        <div id={'cart'}>
            {productCart.length > 0 ? (
                <div className={'cart-content'}>
                    <h2 className={'text-left'}>Cart</h2>
                    <div className={'overflow-x-scroll lg:overflow-x-hidden'}>
                        <table className={'font-normal'}>
                            <thead className={'text-left font-normal'}>
                            <tr>
                                <th className={'col-span-2 font-normal'}>Product</th>
                                <th className={'font-normal'}>Price</th>
                                <th className={'font-normal'}>Quantity</th>
                                <th className={'font-normal'}>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productCart.map((product, index) => {
                                const cartItem = cart.find(item => item.idProduct === product.id);
                                return (
                                    <tr key={index} className={'cart-item mb-8'}>
                                        <td className={'flex'}>
                                            <div className={'flex gap-x-4'}>
                                                <img src={product.thumbnail} alt="" width={'100'} />
                                                <Link to={`/product/${product.id}`}>
                                                    <p className={'font-semibold'}>{product.name}</p>
                                                </Link>
                                            </div>
                                        </td>
                                        <td>
                                            <p className={'flex'}>{(product.price).toFixed(2)}$</p>
                                        </td>
                                        <td>
                                            <div className={'flex flex-col gap-y-4 items-start'}>
                                                <p className={'ml-4'}>{cartItem ? cartItem.quantity : "N/A"}</p>
                                                <button onClick={() => deleteProduct(product.id)} className={'text-xs underline'}>Remove</button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={'flex'}>
                                                {(product.price * cartItem.quantity).toFixed(2)}$
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                    <hr />
                    <div className={'text-left'}>
                        <div className={'flex justify-between'}>
                            <span>Total to pay:</span>
                            <span>{calculateTotal().toFixed(2)}$</span>
                        </div>
                    </div>
                    <hr />
                    <div className={'mt-12 mb-4'}>
                        <Button content={'Proceed to Checkout'} onClick={() => navigate('/validate-order')} className={'btn-proceed'} />
                    </div>
                </div>
            ) : (
                <div className={'empty-cart'}>
                    <p>Your cart is empty...</p>
                    <Link to={'/'}>
                        <span>continue shopping</span>
                    </Link>
                </div>
            )}
            <div className={'cart-banner'}>
                <p>Embrace the journey</p>
            </div>
        </div>
    );
};

export default Cart;
