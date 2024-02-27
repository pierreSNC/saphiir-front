import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import API_BASE_URL from '../../apiConfig.js';

import './Categories.css'

import ProductCard from "../../components/molecules/ProductCard/ProductCard";

const CategoryPage = () => {
    const {id} = useParams();
    const [productsCategory, setProductsCategory] = useState([]);
    const [category, setCategory] = useState('');
    const imageUrl = process.env.PUBLIC_URL + '/assets/img/home-hero.jpg';


    function getProductCategory()
    {
        axios.get(`${API_BASE_URL}/products/category/${id}`).then((response) => {
            setProductsCategory(response.data);
        })
    }

    function getCategoryName()
    {
        axios.get(`${API_BASE_URL}/category/${id}`).then(response => {
            setCategory(response.data);
        });

    }

    useEffect(() => {
        getProductCategory();
        getCategoryName();

    }, [id])
    return (
        <div id={'category-page'}>
            <div className={'category-hero'} style={{ backgroundImage: `url(${imageUrl})` }} key={category.id}>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
            </div>


            <div className={'grid grid-cols-1 md:grid-cols-2 gap-12 p-[50px]'}>
                {productsCategory.length > 0 ? productsCategory.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                        <ProductCard
                            thumbnail={product.thumbnail}
                            title={product.name}
                            price={product.price}
                        />
                    </Link>
                )) : (
                    <div className={'col-span-2 h-[25vh] flex items-center justify-center'}>
                        <p>No products yet for this category</p>
                    </div>
                )}
            </div>



        </div>
    );
};

export default CategoryPage;