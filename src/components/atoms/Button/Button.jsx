import React from 'react';

const Button = ({
    children,
    content = '',
    className = 'button',
    onClick
                }) => {
    return (
        <button className={className} onClick={onClick} >
            {children}
            {content}
        </button>
    );
};

export default Button;