import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import './Account.css';

import API_BASE_URL from '../../apiConfig.js';


const AccountOrders = () => {
    const [orders, setOrders] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [updateCustomerValue, setUpdateCustomerValue] = useState({ lastname: '', firstname: '', email: '' });
    const [visibleDetail, setVisibleDetail] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/customer/${localStorage.getItem('customerID')}`).then(response => {
            setCustomer(response.data);
            setUpdateCustomerValue({
                lastname: response.data.lastname,
                firstname: response.data.firstname,
                email: response.data.email,
            });
        });
    }, []);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/orders/${localStorage.getItem('customerID')}`)
            .then(response => {
                const fetchedOrders = response.data.order;
                const ordersWithProducts = fetchedOrders.map(order => ({
                    ...order,
                    products: []
                }));

                Promise.all(fetchedOrders.flatMap(order =>
                    order.idProduct.split(', ').map(productId =>
                        axios.get(`http://localhost:3000/product/${productId}`)
                            .then(response => ({ orderId: order.id, product: response.data }))
                    )
                )).then(productResponses => {
                    const ordersWithProductsFilled = ordersWithProducts.map(order => ({
                        ...order,
                        products: productResponses.filter(pr => pr.orderId === order.id).map(pr => pr.product)
                    }));
                    setOrders(ordersWithProductsFilled);
                });
            });
    }, []);

    const logout = () => {
        localStorage.removeItem('customerID');
        navigate('/');
    };

    const updateCustomer = () => {
        const url = `${API_BASE_URL}/customer/${localStorage.getItem('customerID')}`;
        axios.patch(url, updateCustomerValue)
            .then(response => {
                console.log(response.data);
                setCustomer(updateCustomerValue);
            })
            .catch(error => {
                console.error("There was an error updating the customer information", error);
            });
    };

    const handleChange = (e, field) => {
        setUpdateCustomerValue({
            ...updateCustomerValue,
            [field]: e.target.value,
        });
    };

    const toggleDetails = (orderId) => {
        setVisibleDetail(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));
    };

    return (
        <div id={'account'}>
            <div className={'account-info'}>
                <h2 className={'text-left'}>Your profile</h2>
                {customer ? (
                    <div className={'form mx-auto w-1/2'}>
                        <div className={'form-group-1 flex flex-col md:flex-row gap-0 md:gap-4 text-left'}>
                            <div className={'flex flex-col gap-2'}>
                                <label htmlFor="">Lastname:</label>
                                <input type="text" value={updateCustomerValue.lastname} onChange={(e) => handleChange(e, 'lastname')}/>
                            </div>
                            <div className={'flex flex-col gap-2'}>
                                <label htmlFor="">Firstname:</label>
                                <input type="text" value={updateCustomerValue.firstname} onChange={(e) => handleChange(e, 'firstname')}/>
                            </div>
                        </div>
                        <div className={'flex flex-col text-left gap-2'}>
                            <label htmlFor="">Email:</label>
                            <input type="text" value={updateCustomerValue.email} onChange={(e) => handleChange(e, 'email')}/>
                        </div>
                        <button className={'update w-[200px] md:w-[50%]'} onClick={updateCustomer}>Update</button>
                    </div>
                ) : <p>Loading profile...</p>}
                <button className={'logout w-[125px] md:w-[15%]'} onClick={logout}>Logout</button>
            </div>
            <div>
                <h2 className={'text-left'}>Your orders</h2>
                {orders.length > 0 ? (
                    <div className="overflow-x-scroll lg:overflow-x-hidden">
                        {orders.length > 0 ? orders.map((order) => (
                            <div key={order.id} className="order-container my-8">
                                <table className="order-summary">
                                    <thead onClick={() => toggleDetails(order.id)} style={{ cursor: 'pointer' }}>
                                    <tr>
                                        <th>Order #{order.id}</th>
                                        <th>{new Date(order.createdAt).toLocaleDateString()}</th>
                                        <th>{order.status}</th>
                                        <th>
                                            {visibleDetail[order.id] ? (
                                                <FontAwesomeIcon icon={faAngleUp} />
                                            ) : (
                                                <FontAwesomeIcon icon={faAngleDown} />
                                            )}
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                                <div style={{ maxHeight: visibleDetail[order.id] ? '1000px' : '0', overflow: 'hidden', transition: 'max-height 0.5s ease-in-out' }}>
                                    <table className="order-details">
                                        <tbody>
                                        {order.products.length > 0 ? order.products.map((product) => (
                                            <tr key={product.id}>
                                                <td><img src={product.thumbnail} alt="" width="100" className={'m-4'}/></td>
                                                <td className={'text-left'}>
                                                    <Link to={`/product/${product.id}`}>
                                                        <span className={'font-semibold'}>{product.name}</span>
                                                    </Link>
                                                </td>
                                                <td className={'opacity-0'}>1</td>
                                                <td className={'text-center'}>${product.price.toFixed(2)}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4">No products in this order</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )) : <p>No orders found.</p>}
                    </div>
                ) : (
                    <div className={'h-[25vh] flex justify-center items-center'}>
                        No order for this moment
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountOrders;
