import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import Button from "../../components/atoms/Button/Button";
import API_BASE_URL from '../../apiConfig.js';

import './ProductDetail.css'

const ProductDetail = () => {
    const {id} = useParams();
    const [productDetail, setProductDetail] = useState({});
    const navigate = useNavigate()

    function handleAddToCart(idProduct)
    {
        const isLogged = localStorage.getItem('customerID')
        if (!isLogged) {
            navigate('/connexion')
            return false
        }

        axios.post(`${API_BASE_URL}/add-to-cart`,
            {
                idCustomer: localStorage.getItem('customerID'),
                idProduct: idProduct,
                quantity: 1
            }
        ).then(() => {
            window.location.reload();
        })
    }

    useEffect(() => {
        axios.get(`${API_BASE_URL}/product/${id}`).then(response => {
            setProductDetail(response.data);
        })
    }, [id])
    return (
        <div id={'product-detail'} className={'grid grid-cols-1 md:grid-cols-[60%_40%] '}>
            <div className={'thumbnail'}>
                <img src={productDetail.image} alt=""/>
            </div>
            <div className={'content text-left'}>
                <div>
                    <h2>{productDetail.name}</h2>
                    <p>{productDetail.excerpt}</p>
                </div>
                <p>{productDetail.price?.toFixed(2)}$</p>
                {productDetail.stock > 0 ? (
                    <Button content={'Add to cart'} onClick={() => handleAddToCart(productDetail.id)} className={'btn-add'} />
                ) : ''}
                <div className={'grid grid-cols-2 lg:grid-cols-4 mt-8 gap-y-8'}>
                    <div className={'flex flex-col items-center text-center'}>
                        <svg className="cc-icon" aria-hidden="true" focusable="false" role="presentation"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={{width: "28px", height: "28px" }}>
                            <path
                                d="M8.86 4.38a2.78 2.78 0 013.72-.3c1.4 1.2 1.2 3.11.19 4.13L7.98 13.1c-.05.06-.1.06-.19 0L3.01 8.2a2.8 2.8 0 01.19-4.1c1.06-.9 2.7-.76 3.74.28l.96.98.96-.98zm-.96-.45l.24-.25a3.78 3.78 0 015.07-.38l.01.01v.01a3.82 3.82 0 01.26 5.59l-4.79 4.9a1.12 1.12 0 01-1.45.12l-.1-.06L2.3 8.91a3.8 3.8 0 01.26-5.57 3.79 3.79 0 015.1.33l.01.01.24.25z"
                                fillRule="evenodd"></path>
                        </svg>
                        <p>Homemade</p>
                    </div>
                    <div className={'flex flex-col items-center text-center'}>
                        <svg className="cc-icon" aria-hidden="true" focusable="false" role="presentation"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={{width: "28px", height: "28px" }}>
                            <circle stroke="currentColor" fill="none" cx="8.1081667" cy="5.6658235"
                                    r="4.3742652"></circle>
                            <polyline stroke="currentColor" fill="none" points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"
                                      transform="matrix(0.624895,0,0,0.624895,0.60942571,0.66666362)"></polyline>
                        </svg>
                        <p>Premium material</p>
                    </div>
                    <div className={'flex flex-col items-center text-center'}>
                        <img src={'https://www.belost.fr/cdn/shop/files/France_Be_Lost_56x.svg?v=1681154700'} alt="" style={{width: "28px", height: "28px" }}/>
                        <p>Delivery in 48/72 hours</p>
                    </div>
                    <div className={'flex flex-col items-center text-center'}>
                        <svg className="cc-icon" aria-hidden="true" focusable="false" role="presentation"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" style={{width: "28px", height: "28px" }}>
                            <path
                                d="M9 .5a.5.5 0 000 1h1a4.5 4.5 0 110 9H2.2l3.15-3.15a.5.5 0 10-.7-.7l-4 4a.5.5 0 000 .7l4 4a.5.5 0 00.7-.7L2.21 11.5H10a5.5 5.5 0 100-11H9z"></path>
                        </svg>
                        <p>Free returns</p>
                    </div>
                </div>

                <hr className={'my-8'}/>
                <p>{productDetail.description}</p>
            </div>
        </div>
    );
};

export default ProductDetail;