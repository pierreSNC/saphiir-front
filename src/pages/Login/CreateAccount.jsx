import React, { useState } from 'react';
import Input from "../../components/atoms/Input/Input";
import Button from "../../components/atoms/Button/Button"
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from '../../apiConfig.js';


const CreateAccount = () => {
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const createCustomer = () => {
        const apiUrl = `${API_BASE_URL}/customer`;

        const customerData = {
            lastname: lastname,
            firstname: firstname,
            email: email,
            password: password
        };

        axios.post(apiUrl, customerData)
            .then(response => {
                localStorage.setItem('customerID', response.data.data.id)
                navigate('/')
            })
            .catch(error => {
                console.error('There was an error creating the customer:', error);
            });
    };

    return (
        <div id={'login'} className={'!h-[100vh]'}>
            <h3>Create your account</h3>
            <div className={'form'}>
                <Input placeholderContent={'Lastname'} id={'lastname'} defaultClass={'w-3/4 md:w-1/2'} onChange={(e) => setLastname(e.target.value)} />
                <Input placeholderContent={'Firstname'} id={'firstname'} defaultClass={'w-3/4 md:w-1/2'} onChange={(e) => setFirstname(e.target.value)} />
                <Input placeholderContent={'Email'} id={'email'} defaultClass={'w-3/4 md:w-1/2'} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholderContent={'Password'} type={'password'} id={'password'} defaultClass={'w-3/4 md:w-1/2'} onChange={(e) => setPassword(e.target.value)} />
                <Button content={'create'} onClick={createCustomer} className={'w-1/2 md:w-1/4'} />
            </div>

            <Link to={"/"}>
                <span>return to the store</span>
            </Link>
        </div>
    );
};

export default CreateAccount;
