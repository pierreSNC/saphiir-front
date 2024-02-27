import React, {useEffect} from 'react';
import './OrderOver.css'
import {Link} from "react-router-dom";

const OrderOver = () => {

    useEffect(() => {
        const hasReloaded = localStorage.getItem("hasReloaded");

        if (hasReloaded !== "true") {
            localStorage.setItem("hasReloaded", "true");
            window.location.reload();
        } else {
            localStorage.setItem("hasReloaded", "false");
        }
    }, []);

    return (
        <div id={'order-over'}>
            <div className="content">
                <div className={'flex flex-col items-center gap-8'}>
                    <h2>Thanks for you order!</h2>
                    <div className={'flex gap-x-2'}>
                        <p>You can view all your orders in your</p>
                        <Link to={'/account'}>
                            <span className={'underline'}>account details.</span>
                        </Link>
                    </div>

                </div>
                <div className={'return-home'}>
                    <Link to={'/'}>
                        Go home
                    </Link>
                </div>
            </div>
            <div className={'order-footer-hero'}>
                Embrace the journey
            </div>
        </div>
    );
};

export default OrderOver;