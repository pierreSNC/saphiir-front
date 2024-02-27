import React, {useEffect, useState} from 'react';
import Button from "../../components/atoms/Button/Button";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './ValidateOrder.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import API_BASE_URL from '../../apiConfig.js';


const ValidateOrder = () => {

    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [customerInfos, setCustomerInfos] = useState(true);
    const [customerAddress, setCustomerAddress] = useState(true);
    const [customerCarrier, setCustomerCarrier] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState(true);

    const getProductInCart = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/cart/${localStorage.getItem('customerID')}`);
            return response.data.map(product => product.idProduct).join(', ');
        } catch (error) {
            console.error("Error fetching products in cart:", error);
        }
    };

    useEffect(() => {
        axios.get(`${API_BASE_URL}/customer/${localStorage.getItem('customerID')}`).then(response => {
            setCustomer(response.data);
        });
    }, []);

    const validateOrder = async () => {
        try {
            const arrayProduct = await getProductInCart();

            if (arrayProduct) {
                const response = await axios.post(`${API_BASE_URL}/order`, {
                    idCustomer: localStorage.getItem('customerID'),
                    idCart: localStorage.getItem('cartID'),
                    idProduct: arrayProduct
                });
                navigate('/order-over');

            }
        } catch (error) {
            console.error("Error validating order:", error);
        }
    };

    return (
        <div id={'validate-order'}>
            <h2>Validate your Order</h2>

            <div>
                <div onClick={() => setCustomerInfos(!customerInfos)} className={'customerInfos'}>
                    <p>Personal information</p>
                    {customerInfos ? (
                        <FontAwesomeIcon icon={faAngleUp} />
                    ) : (
                        <FontAwesomeIcon icon={faAngleDown} />
                    )}
                </div>
                <div className={'content__customerInfos'}>
                    {customerInfos ? (
                        <div>
                            {customer ? (
                                <div>
                                    <div className={'flex gap-x-2 mt-4'}>
                                        <p>{customer.lastname}</p>
                                        <p>{customer.firstname}</p>
                                    </div>
                                    <div className={'flex'}>
                                        <p>{customer.email}</p>
                                    </div>
                                    <div>
                                        <Link to={'/account'}>
                                            <button>update</button>
                                        </Link>
                                    </div>
                                </div>
                            ) : ''}
                        </div>
                    ) : ''}
                </div>
            </div>

            <div className={'mt-8'}>
                <div onClick={() => setCustomerAddress(!customerAddress)} className={'customerAddress'}>
                    <p>Delivery address</p>
                    {customerAddress ? (
                        <FontAwesomeIcon icon={faAngleUp} />
                    ) : (
                        <FontAwesomeIcon icon={faAngleDown} />
                    )}
                </div>
                {customerAddress ? (
                    <div className={'content__customerAddress'}>
                        <input type="text" placeholder={'address'} className={'w-full'}/>
                        <div className={'block md:flex gap-4'}>
                            <input type="text" placeholder={'zipcode'} className={'w-full md:w-1/2'}/>
                            <input type="text" placeholder={'city'} className={'w-full md:w-1/2'}/>
                        </div>
                    </div>
                ) : ''}
            </div>

            <div className="mt-8">
                <div onClick={() => setCustomerCarrier(!customerCarrier)} className={'customerCarrier'}>
                    <p>Carrier</p>
                    {customerCarrier ? (
                        <FontAwesomeIcon icon={faAngleUp} />
                    ) : (
                        <FontAwesomeIcon icon={faAngleDown} />
                    )}
                </div>
                {customerCarrier ? (
                    <div className={'content__customerCarrier'}>
                        <div>
                            <input type="checkbox" checked={true} readOnly/>
                        </div>
                        <div className={'flex items-center gap-x-4'}>
                            <img src="https://dirigeants-entreprise.com/content/uploads/Apps-Colissimo.jpg" alt="" width={'50'}/>
                            <p>24/48h</p>
                        </div>
                        <div>
                            <p className={'font-semibold'}>Free</p>
                        </div>
                    </div>
                ) : ''}
            </div>
            <div className="mt-8">
                <div onClick={() => setPaymentMethod(!paymentMethod)} className={'paymentMethod'}>
                    <p>Payment Method</p>
                    {paymentMethod ? (
                        <FontAwesomeIcon icon={faAngleUp} />
                    ) : (
                        <FontAwesomeIcon icon={faAngleDown} />
                    )}
                </div>
                {paymentMethod ? (
                    <div className={'content__paymentMethod w-full md:w-[65%]'}>
                        <div className={'flex justify-between bg-white h-[45px] items-center px-4 border border-gray-600'}>
                            <p>Credit card</p>
                            <div className={'flex gap-x-2'}>
                                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/0169695890db3db16bfe.svg" alt=""/>
                                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/37fc65d0d7ac30da3b0c.svg" alt="" className={'hidden sm:block'}/>
                                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/ae9ceec48b1dc489596c.svg" alt=""/>
                                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/f11b90c2972f3811f2d5.svg" alt=""/>
                                <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/bddb21e40274706727fb.svg" alt=""/>
                            </div>
                        </div>
                        <div className={'card__form'}>
                            <div>
                                <input type="text" placeholder={'card number'} className={'w-full'}/>
                            </div>
                            <div className={'block md:flex gap-x-4'}>
                                <input type="text" placeholder={'expiration date'} className={'w-full'}/>
                                <input type="text" placeholder={'security code'} className={'w-full'}/>
                            </div>
                            <div>
                                <input type="text" placeholder={'card\'s name'} className={'w-full'}/>
                            </div>
                        </div>
                    </div>
                ) : ''}
            </div>

            <Button content={'Validate Order'} className={'btn-validate'} onClick={validateOrder}/>
        </div>
    );
};

export default ValidateOrder;
