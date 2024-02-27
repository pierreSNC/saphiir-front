import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import './App.css';

import Header from './components/organism/Header/Header';
import Footer from './components/organism/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import CategoryPage from './pages/Categories/CategoryPage';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import ValidateOrder from './pages/ValidateOrder/ValidateOrder';
import Account from './pages/Account/Account';
import OrderOver from "./pages/OrderOver/OrderOver";
import CreateAccount from "./pages/Login/CreateAccount";

import ScrollToTop from './ScrollToTop';

function AppWrapper() {
    const location = useLocation();
    const appStyle = location.pathname !== '/' ? { marginTop: '10vh' } : {};

    return (
        <div className="App" style={appStyle}>
            <Header />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="category/:id" element={<CategoryPage />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="expertise" element={<HomePage />} />
                <Route path="connexion" element={<LoginPage />} />
                <Route path="cart" element={<Cart />} />
                <Route path="validate-order" element={<ValidateOrder />} />
                <Route path="account" element={<Account />} />
                <Route path="order-over" element={<OrderOver />} />
                <Route path="create-account" element={<CreateAccount />} />
            </Routes>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppWrapper />
        </BrowserRouter>
    );
}

export default App;
