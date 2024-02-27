import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Header.css';

import API_BASE_URL from '../../../apiConfig.js';


const Header = () => {
    const [categories, setCategories] = useState();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const customerID = localStorage.getItem('customerID');
    const customerLogged = !!customerID;

    const [cartQty, setCartQty] = useState([]);

    const location = useLocation();
    const headerClass = location.pathname === '/' ? 'header-transparent' : '';


    useEffect(() => {
        axios.get(`${API_BASE_URL}/categories`).then((response) => {
            setCategories(response.data);
        });

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const scrolled = window.scrollY;
        if (scrolled >= window.innerHeight * 0.5) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    const toggleMenu = () => setShowMenu(!showMenu);

    useEffect(() => {
        if (showMenu) {
            setShowMenu(false);
        }
    }, [location]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/cart/${localStorage.getItem('customerID')}`)
            .then(response => {
                const data = response.data;

                if (Array.isArray(data) && data.length) {
                    const totalQuantity = data.reduce((total, currentItem) => total + Number(currentItem.quantity), 0);
                    setCartQty(totalQuantity);
                } else {
                    setCartQty([]);
                }
            });
    }, []);


    return (
        <header className={`${headerClass} ${isScrolled ? 'scrolled' : ''}`}>
            <nav>
                <ul>
                    <div className={`item ${!showMenu ? '' : 'nav-open'}`}>
                            <li id="menu-toggle" className="menu-toggle" onClick={() => toggleMenu()}>
                                <span className="menu-toggle-bar menu-toggle-bar--top"></span>
                                <span className="menu-toggle-bar menu-toggle-bar--middle"></span>
                                <span className="menu-toggle-bar menu-toggle-bar--bottom"></span>
                            </li>
                    </div>

                    <div className={'item'}>
                        <li className={'title'}>
                            <Link to="/">Saphiir.</Link>
                        </li>
                    </div>

                    <div className={`item ${!showMenu ? '' : 'showMenu'}`}>
                        <li className={'li-home'}>
                            <Link to="/">home</Link>
                        </li>
                        <div>
                            <li
                                onMouseEnter={() => setShowCategories(true)}
                                onMouseLeave={() => setShowCategories(false)}
                                className={'toggleCategories'}
                            >
                                bijoux
                                <i className="fa-solid fa-angle-right"></i>
                                <div className={`categories-container ${showCategories ? 'show' : ''}`}>
                                    {categories &&
                                    categories.map((category) => (
                                        <p key={category.id} className="category-link">
                                            <Link to={`/category/${category.id}`}>{category.name}</Link>
                                        </p>
                                    ))}
                                </div>
                            </li>
                        </div>

                        <li className={'li-expertise'}>
                            <Link to="/">expertise</Link>
                        </li>
                        <li className={'li-history'}>
                            <Link to="/">history</Link>
                        </li>
                        <li className={'li-contact'}>
                            <Link to="/">faq & contact</Link>
                        </li>
                    </div>

                    <div className={'item'}>
                        {customerLogged ? (
                            <li>
                                <Link to="/account"><i className="fa-regular fa-user"></i></Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/connexion">
                                    <i className="fa-regular fa-user"></i>
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link to="/cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span className={'pl-2'}>({cartQty > 0 ? cartQty : '0' })</span>
                            </Link>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
