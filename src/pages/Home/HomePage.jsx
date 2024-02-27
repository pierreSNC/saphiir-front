import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
import axios from "axios";

import API_BASE_URL from '../../apiConfig.js';

const HomePage = () => {
    const imageHero = process.env.PUBLIC_URL + '/assets/img/home-hero.jpg';
    const [categories, setCategories] = useState([]);

    useEffect(() => {


        axios.get(`${API_BASE_URL}/categories`).then(response => {
            setCategories(response.data);
        })
    }, [])
    return (
        <div id={'home-page'}>
            <div className="hero" style={{ backgroundImage: `url(${imageHero})` }}>
                <h1>embrace the journey</h1>
            </div>
            <div className={'grid grid-cols-1 lg:grid-cols-2'}>
                {categories ? categories.map((category, index) => (
                    <div key={category.id} className={`home-categories-wrapper ${index === 2 ? 'col-span-1 lg:col-span-2' : ''}`}>
                        <Link to={`/category/${category.id}`}>
                            <div className="home-categories" style={{ backgroundImage: `url(${category.thumbnail})` }}></div>
                            <div className="content-wrapper">{category.name}</div>
                        </Link>
                    </div>
                )) : ''}
            </div>
        </div>
    );
};

export default HomePage;