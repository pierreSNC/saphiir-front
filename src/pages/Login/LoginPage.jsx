import React, {useEffect} from 'react';
import Input from "../../components/atoms/Input/Input";
import Button from "../../components/atoms/Button/Button";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import './Login.css'
import API_BASE_URL from '../../apiConfig.js';



const LoginPage = () => {
    const navigate = useNavigate();

    function handleLogin()
    {
        const email = document.getElementById('email');
        const password = document.getElementById('password');


        axios.post(`${API_BASE_URL}/login`, {
            email: email.value,
            password: password.value
        }).then(response => {
            console.log(response.data.id)
            localStorage.setItem('customerID', response.data.id)
            navigate('/')
        }).catch(error => {
            console.log(error)
        });

    }

    useEffect(() => {

    }, []);

    return (
        <div id="login">
            <h3>Connection</h3>
            <div className={'form'}>
                <Input placeholderContent={'Email'} id={'email'} defaultClass={'w-3/4 md:w-1/2'} />
                <Input placeholderContent={'Password'} type={'password'} id={'password'} defaultClass={'w-3/4 md:w-1/2'} />
                <Button content={'login'} onClick={() => handleLogin()} className={'w-1/2 md:w-1/4'} />
            </div>
            <div className={'flex flex-col gap-4'}>
                <Link to={'/create-account'}>
                    <span>create an account</span>
                </Link>
                <Link to={"/"}>
                    <span>return to the store</span>
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;